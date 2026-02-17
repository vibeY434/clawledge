"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitUseCase } from "@/app/actions/submitUseCase";
import { CATEGORY_META } from "@/lib/constants";

const categories = Object.entries(CATEGORY_META).map(([value, meta]) => ({
  value,
  label: meta.label,
}));

export default function SubmitPage() {
  const [state, formAction, isPending] = useActionState(submitUseCase, null);
  const [titleLen, setTitleLen] = useState(0);
  const [descLen, setDescLen] = useState(0);

  if (state?.success) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-6">&#10003;</div>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-3">
          Submission Received!
        </h2>
        <p className="text-foreground-secondary mb-8 leading-relaxed">
          We&apos;ll review it within 48 hours.
          <br />
          You&apos;ll get credit &amp; a link when it goes live.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/use-cases"
            className="px-6 py-2.5 rounded-lg bg-surface border border-surface-border text-sm text-foreground-secondary hover:text-white transition-colors"
          >
            View All Use Cases
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-claw-500 to-orange-500 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-4">
        Submit a Use Case
      </h1>
      <p className="text-foreground-secondary mb-8 leading-relaxed">
        Got a cool OpenClaw or Clawdbot setup? Share it with the community and
        get featured on Clawledge.
      </p>

      {/* Dual CTA */}
      <div className="mb-10 p-6 rounded-xl bg-surface border border-surface-border">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-white font-medium mb-1">Quick way:</p>
            <p className="text-sm text-foreground-secondary">
              Tag{" "}
              <a
                href="https://x.com/clawledge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-claw-400 hover:text-claw-300"
              >
                @clawledge
              </a>{" "}
              on X and we&apos;ll pick it up
            </p>
          </div>
          <div className="text-foreground-secondary text-sm">or</div>
          <div className="flex-1 text-center sm:text-right">
            <p className="text-white font-medium mb-1">Detailed way:</p>
            <p className="text-sm text-foreground-secondary">
              Fill out the form below
            </p>
          </div>
        </div>
      </div>

      {/* Error State */}
      {state?.error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {state.error}
        </div>
      )}

      {/* Form */}
      <form action={formAction} className="space-y-6">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm text-foreground-secondary mb-1.5"
          >
            Title <span className="text-claw-400">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            minLength={10}
            maxLength={100}
            placeholder='e.g., "Auto-reply to Gmail based on priority"'
            onChange={(e) => setTitleLen(e.target.value.length)}
            className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50"
          />
          <p className="mt-1 text-xs text-foreground-secondary">
            {titleLen}/100
          </p>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm text-foreground-secondary mb-1.5"
          >
            Description <span className="text-claw-400">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            minLength={50}
            maxLength={500}
            rows={4}
            placeholder="Describe the use case: what does it do, how is it set up, what problem does it solve?"
            onChange={(e) => setDescLen(e.target.value.length)}
            className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50 resize-y"
          />
          <p className="mt-1 text-xs text-foreground-secondary">
            {descLen}/500
          </p>
        </div>

        {/* Two columns: Name + Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="submitterName"
              className="block text-sm text-foreground-secondary mb-1.5"
            >
              Your Name <span className="text-claw-400">*</span>
            </label>
            <input
              type="text"
              id="submitterName"
              name="submitterName"
              required
              minLength={2}
              placeholder="Your name or alias"
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50"
            />
          </div>
          <div>
            <label
              htmlFor="submitterContact"
              className="block text-sm text-foreground-secondary mb-1.5"
            >
              Contact <span className="text-claw-400">*</span>
            </label>
            <input
              type="text"
              id="submitterContact"
              name="submitterContact"
              required
              minLength={3}
              placeholder="X handle or email"
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50"
            />
          </div>
        </div>

        {/* Source URL */}
        <div>
          <label
            htmlFor="sourceUrl"
            className="block text-sm text-foreground-secondary mb-1.5"
          >
            Source URL{" "}
            <span className="text-foreground-secondary/50">(optional)</span>
          </label>
          <input
            type="url"
            id="sourceUrl"
            name="sourceUrl"
            placeholder="Link to your X post, GitHub, YouTube..."
            className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50"
          />
        </div>

        {/* Two columns: Category + Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm text-foreground-secondary mb-1.5"
            >
              Category{" "}
              <span className="text-foreground-secondary/50">(optional)</span>
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm text-foreground-secondary mb-1.5"
            >
              Difficulty{" "}
              <span className="text-foreground-secondary/50">(optional)</span>
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50"
            >
              <option value="">Select difficulty</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Two columns: Cost + Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="estimatedCost"
              className="block text-sm text-foreground-secondary mb-1.5"
            >
              Monthly Cost{" "}
              <span className="text-foreground-secondary/50">(optional)</span>
            </label>
            <input
              type="text"
              id="estimatedCost"
              name="estimatedCost"
              placeholder="e.g., Free, $5-10, $20+"
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50"
            />
          </div>
          <div>
            <label
              htmlFor="skills"
              className="block text-sm text-foreground-secondary mb-1.5"
            >
              Skills Used{" "}
              <span className="text-foreground-secondary/50">(optional)</span>
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              placeholder="e.g., Python, Gmail API, GitHub"
              className="w-full px-4 py-2.5 rounded-lg bg-surface border border-surface-border text-white text-sm placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-claw-500/50 focus:border-claw-500/50"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="monetizable"
              className="mt-0.5 h-4 w-4 rounded border-surface-border bg-surface text-claw-500 focus:ring-claw-500/50"
            />
            <span className="text-sm text-foreground-secondary group-hover:text-white transition-colors">
              This use case can generate revenue / is monetizable
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="allowAttribution"
              required
              className="mt-0.5 h-4 w-4 rounded border-surface-border bg-surface text-claw-500 focus:ring-claw-500/50"
            />
            <span className="text-sm text-foreground-secondary group-hover:text-white transition-colors">
              I allow Clawledge to feature this use case with attribution{" "}
              <span className="text-claw-400">*</span>
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-claw-500 to-orange-500 text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Submitting..." : "Submit Use Case"}
        </button>
      </form>
    </div>
  );
}
