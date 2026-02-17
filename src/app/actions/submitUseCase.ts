"use server";

import { google } from "googleapis";

interface SubmitResult {
  success: boolean;
  error?: string;
}

// --- Security: Rate limiting (in-memory, resets per serverless cold start) ---
const submitTimestamps: number[] = [];
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(): boolean {
  const now = Date.now();
  // Remove expired entries
  while (submitTimestamps.length > 0 && now - submitTimestamps[0] > RATE_WINDOW) {
    submitTimestamps.shift();
  }
  if (submitTimestamps.length >= RATE_LIMIT) return true;
  submitTimestamps.push(now);
  return false;
}

// --- Security: URL validation ---
const BLOCKED_EXTENSIONS =
  /\.(exe|msi|bat|cmd|scr|ps1|vbs|wsf|dll|sys|bin|iso|img|js|zip|rar|7z|tar|gz)$/i;
const BLOCKED_PROTOCOLS = /^(javascript|data|file|ftp|blob):/i;

function validateUrl(url: string): string | null {
  if (!url) return null; // optional field
  if (url.length > 500) return "URL is too long (max 500 characters).";
  if (BLOCKED_PROTOCOLS.test(url)) return "Only https:// URLs are allowed.";
  if (!url.startsWith("https://") && !url.startsWith("http://"))
    return "URL must start with https://";
  try {
    const parsed = new URL(url);
    if (BLOCKED_EXTENSIONS.test(parsed.pathname))
      return "URLs pointing to downloadable files are not allowed.";
  } catch {
    return "Invalid URL format.";
  }
  return null;
}

// --- Security: Sanitize text for Google Sheets formula injection ---
function sanitizeForSheet(value: string): string {
  if (/^[=+\-@\t\r]/.test(value)) {
    return "'" + value;
  }
  return value;
}

// --- Security: Strip HTML tags ---
function stripHtml(text: string): string {
  return text.replace(/<[^>]*>/g, "");
}

export async function submitUseCase(
  _prevState: SubmitResult | null,
  formData: FormData
): Promise<SubmitResult> {
  // Honeypot check
  if (formData.get("website")) {
    return { success: false, error: "Spam detected." };
  }

  // Rate limiting
  if (isRateLimited()) {
    return {
      success: false,
      error: "Too many submissions. Please try again later.",
    };
  }

  // Extract and sanitize fields (strip HTML from all text inputs)
  const title = stripHtml((formData.get("title") as string)?.trim() ?? "");
  const description = stripHtml(
    (formData.get("description") as string)?.trim() ?? ""
  );
  const submitterName = stripHtml(
    (formData.get("submitterName") as string)?.trim() ?? ""
  );
  const contact = stripHtml(
    (formData.get("submitterContact") as string)?.trim() ?? ""
  );
  const sourceUrl = (formData.get("sourceUrl") as string)?.trim() ?? "";
  const category = (formData.get("category") as string) ?? "";
  const difficulty = (formData.get("difficulty") as string) ?? "";
  const estimatedCost = stripHtml(
    (formData.get("estimatedCost") as string)?.trim() ?? ""
  );
  const skills = stripHtml(
    (formData.get("skills") as string)?.trim() ?? ""
  );
  const monetizable = formData.get("monetizable") === "on" ? "Yes" : "No";
  const allowAttribution =
    formData.get("allowAttribution") === "on" ? "Yes" : "No";

  // Server-side validation
  if (title.length < 10 || title.length > 100) {
    return {
      success: false,
      error: "Title must be between 10 and 100 characters.",
    };
  }
  if (description.length < 50 || description.length > 500) {
    return {
      success: false,
      error: "Description must be between 50 and 500 characters.",
    };
  }
  if (submitterName.length < 2) {
    return { success: false, error: "Please provide your name." };
  }
  if (contact.length < 3) {
    return {
      success: false,
      error: "Please provide a valid contact (X handle or email).",
    };
  }
  if (allowAttribution !== "Yes") {
    return {
      success: false,
      error: "You must allow attribution to submit a use case.",
    };
  }

  // URL validation
  const urlError = validateUrl(sourceUrl);
  if (urlError) {
    return { success: false, error: urlError };
  }

  // Validate category and difficulty against known values
  const validCategories = [
    "", "productivity", "development", "content-creation", "money-making",
    "smart-home", "research", "finance", "health", "communication",
    "creative", "crypto", "freelancer", "wild",
  ];
  const validDifficulties = ["", "beginner", "intermediate", "advanced"];
  const safeCategory = validCategories.includes(category) ? category : "";
  const safeDifficulty = validDifficulties.includes(difficulty)
    ? difficulty
    : "";

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Sanitize all text values for Google Sheets formula injection
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,                        // A: Timestamp
      sanitizeForSheet(title),          // B: Title
      sanitizeForSheet(description),    // C: Description
      sanitizeForSheet(submitterName),  // D: Submitter Name
      sanitizeForSheet(contact),        // E: Contact
      sourceUrl,                        // F: URL (validated)
      safeCategory,                     // G: Category (allowlist)
      safeDifficulty,                   // H: Difficulty (allowlist)
      sanitizeForSheet(estimatedCost),  // I: Monthly Cost
      sanitizeForSheet(skills),         // J: Skills
      monetizable,                      // K: Monetizable
      allowAttribution,                 // L: Attribution
      "pending",                        // M: Status
      "community_submission",           // N: source_type
      timestamp,                        // O: date_found
      "",                               // P: validation_notes (internal)
      "",                               // Q: research_confidence (internal)
      "",                               // R: kimi_query (internal)
      "",                               // S: raw_json (internal)
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Tabellenblatt1!A:S",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    return { success: true };
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
}
