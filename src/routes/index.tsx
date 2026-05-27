import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus, Search, MessageSquare, PanelLeft, ChevronDown, Settings, Sparkles,
  ArrowUp, Paperclip, SlidersHorizontal, X, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Claude" },
      { name: "description", content: "Claude chat interface demo with Glass reasoning panel." },
    ],
  }),
  component: ClaudeApp,
});

const PAST_CHATS = [
  "Resume bullet rewrite — fintech PM",
  "Q3 OKR draft review",
  "Explaining stablecoin mechanics",
  "Cold email to design candidate",
  "Refactor checkout flow logic",
  "Weekend trip itinerary, Lisbon",
  "Synthesizing user interviews",
];

function ClaudeStar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2 13.6 8.6 20 10.2 13.6 11.8 12 18.4 10.4 11.8 4 10.2 10.4 8.6Z" />
      <path d="M18 14 18.8 17 22 17.8 18.8 18.6 18 21.6 17.2 18.6 14 17.8 17.2 17Z" opacity=".55" />
    </svg>
  );
}

function ClaudeApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stakes, setStakes] = useState<"high" | "low">("high");
  const [glassOpen, setGlassOpen] = useState(false);
  const [expandedNode, setExpandedNode] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const setStakesAndAdjust = (s: "high" | "low") => {
    setStakes(s);
    if (s === "low") setGlassOpen(false);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`shrink-0 border-r border-border bg-[var(--sidebar-bg)] transition-all duration-300 overflow-hidden ${
          sidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <div className="flex h-full w-64 flex-col">
          <div className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-md text-coral">
                <ClaudeStar className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Claude</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded p-1 text-muted-foreground hover:bg-accent"
              aria-label="Collapse sidebar"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="px-2">
            <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm hover:bg-accent">
              <Plus className="h-4 w-4 text-coral" />
              <span className="font-medium">New chat</span>
            </button>
            <button className="mt-0.5 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-accent">
              <Search className="h-4 w-4" />
              <span>Search chats</span>
            </button>
            <button className="mt-0.5 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:bg-accent">
              <MessageSquare className="h-4 w-4" />
              <span>Projects</span>
            </button>
          </div>

          <div className="mt-4 px-3 text-[11px] uppercase tracking-wider text-muted-foreground">Recents</div>
          <nav className="mt-1 flex-1 overflow-y-auto px-2">
            {PAST_CHATS.map((t, i) => (
              <button
                key={t}
                className={`block w-full truncate rounded-lg px-2.5 py-1.5 text-left text-sm hover:bg-accent ${
                  i === 0 ? "bg-accent/70 font-medium" : "text-foreground/80"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>

          <div className="border-t border-border p-2">
            <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-coral text-[12px] font-semibold text-primary-foreground">
                M
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm leading-tight">Maya Chen</div>
                <div className="text-[11px] text-muted-foreground">Pro plan</div>
              </div>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded p-1 text-muted-foreground hover:bg-accent"
                aria-label="Open sidebar"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}
            <button className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium hover:bg-accent">
              Claude Opus 4.7 <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
          <button className="rounded-full bg-coral px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
            Share
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[720px] px-5 py-10">
            {/* User message */}
            <div className="mb-8 flex justify-end">
              <div className="max-w-[85%] rounded-2xl bg-[var(--bubble)] px-4 py-3 text-[15px] leading-relaxed">
                I'm applying for a Product Manager role at a fintech startup. Here's my draft resume
                bullet — make it stronger: <em>"Worked on a payments feature that improved user retention."</em>
              </div>
            </div>

            {/* Claude response */}
            <div className="flex gap-3">
              <div className="mt-1 shrink-0 text-coral">
                <ClaudeStar className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                {/* Stakes strip */}
                <div className="mb-4 rounded-lg border border-border/70 bg-background/60 px-3 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[12px] text-muted-foreground">
                      Detected: <span className="text-foreground/70">High-stakes task</span>
                    </div>
                    <div className="flex items-center gap-0.5 rounded-full bg-muted p-0.5 text-[11px]">
                      <button
                        onClick={() => setStakesAndAdjust("high")}
                        className={`rounded-full px-2.5 py-0.5 transition-colors ${
                          stakes === "high"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground"
                        }`}
                      >
                        High
                      </button>
                      <button
                        onClick={() => setStakesAndAdjust("low")}
                        className={`rounded-full px-2.5 py-0.5 transition-colors ${
                          stakes === "low"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground"
                        }`}
                      >
                        Low
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground/80">
                    Most users treat resume edits as high-stakes.
                  </div>
                </div>

                <p className="text-[15px] leading-[1.7]">
                  Here's a stronger version:{" "}
                  <span className="font-medium">
                    "Led the 0-to-1 launch of a one-tap payments feature that drove a 23% increase in
                    90-day user retention, contributing an estimated $1.2M in annual recurring revenue."
                  </span>{" "}
                  This reframes a vague contribution into a quantified, outcome-driven achievement
                  that signals ownership and business impact — exactly what fintech PM interviewers
                  screen for.
                </p>

                {/* Glass hook */}
                {stakes === "high" && !glassOpen && (
                  <button
                    onClick={() => setGlassOpen(true)}
                    className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-coral hover:underline underline-offset-4"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    This rewrite added 3 specifics that weren't in your original. See what Glass
                    found <span className="ml-0.5">→</span>
                  </button>
                )}

                {/* Glass panel */}
                {glassOpen && (
                  <GlassPanel
                    expandedNode={expandedNode}
                    setExpandedNode={setExpandedNode}
                    onClose={() => setGlassOpen(false)}
                    toast={toast}
                    onChoice={(label) => {
                      showToast(`Noted — Glass will remember this on your next high-stakes task.`);
                      void label;
                    }}
                    onFix={() => showToast("Flagged — Glass will treat this as a correction.")}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Composer */}
        <div className="px-5 pb-6">
          <div className="mx-auto w-full max-w-[720px]">
            <div className="rounded-3xl border border-border bg-card shadow-sm">
              <div className="px-4 pt-3 pb-2">
                <textarea
                  rows={1}
                  placeholder="Reply to Claude…"
                  className="w-full resize-none bg-transparent text-[15px] leading-6 outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="flex items-center gap-1">
                  <button className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-accent">
                    <Plus className="h-4 w-4" />
                  </button>
                  <button className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] text-muted-foreground hover:bg-accent">
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Tools
                  </button>
                  <button className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-accent">
                    <Paperclip className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11.5px] text-muted-foreground">Claude Opus 4.7</span>
                  <button className="grid h-8 w-8 place-items-center rounded-full bg-coral text-primary-foreground hover:opacity-90">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 text-center text-[11px] text-muted-foreground">
              Claude can make mistakes. Please double-check responses.
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

/* ---------- Glass Panel ---------- */

type NodeTag = "GROUNDED" | "ASSUMPTION" | "JUDGMENT";

const NODES: { title: string; tag: NodeTag; why: string }[] = [
  {
    title: "Your input: \"improved user retention\"",
    tag: "GROUNDED",
    why: "Taken directly from the words you wrote.",
  },
  {
    title: "Inferred the feature was one-tap payments and a 0-to-1 launch",
    tag: "ASSUMPTION",
    why: "You said \"a payments feature\" — Claude filled in specifics to make the bullet vivid.",
  },
  {
    title: "Assigned specific numbers: 23% retention, $1.2M ARR",
    tag: "ASSUMPTION",
    why: "No metrics were in your input. These were invented to fit a fintech PM signal.",
  },
  {
    title: "Conclusion: a quantified, ownership-signaling bullet",
    tag: "JUDGMENT",
    why: "Composed to match what fintech PM screeners typically reward.",
  },
];

function TagPill({ tag }: { tag: NodeTag }) {
  const map: Record<NodeTag, string> = {
    GROUNDED: "bg-[var(--grey-tag-bg)] text-[var(--grey-tag)]",
    ASSUMPTION: "bg-[var(--amber-tag-bg)] text-[var(--amber-tag)]",
    JUDGMENT: "bg-[var(--blue-tag-bg)] text-[var(--blue-tag)]",
  };
  return (
    <span
      className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tracking-wider ${map[tag]}`}
    >
      {tag}
    </span>
  );
}

function GlassPanel({
  expandedNode, setExpandedNode, onClose, onChoice, onFix, toast,
}: {
  expandedNode: number | null;
  setExpandedNode: (n: number | null) => void;
  onClose: () => void;
  onChoice: (label: string) => void;
  onFix: () => void;
  toast: string | null;
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card/70 animate-glass-expand">
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-coral" />
          <h3 className="text-[14px] font-semibold">Glass — the reasoning behind this output</h3>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[12px] text-muted-foreground hover:bg-accent"
        >
          Collapse <X className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-6 px-4 py-5">
        {/* Section A — Spine */}
        <section>
          <div className="mb-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            The Spine
          </div>
          <div className="flex flex-col items-stretch">
            {NODES.map((n, i) => {
              const isAssumption = n.tag === "ASSUMPTION";
              const isOpen = expandedNode === i;
              return (
                <div key={i} className="flex flex-col items-stretch">
                  <button
                    onClick={() => setExpandedNode(isOpen ? null : i)}
                    className={`group rounded-xl border px-3.5 py-3 text-left transition-colors ${
                      isAssumption
                        ? "border-[var(--amber-tag)]/35 bg-[var(--amber-tag-bg)]/40 hover:bg-[var(--amber-tag-bg)]/60"
                        : "border-border bg-background hover:bg-accent/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-[13.5px] leading-snug">{n.title}</div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <TagPill tag={n.tag} />
                        <ChevronRight
                          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>
                    {isOpen && (
                      <div className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                        {n.why}
                      </div>
                    )}
                  </button>
                  {i < NODES.length - 1 && (
                    <div className="flex flex-col items-center" aria-hidden>
                      <div className="h-6 w-[2px] bg-muted-foreground/60" />
                      <div className="-mt-[1px] h-0 w-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-muted-foreground/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section B — Load-bearing assumptions */}
        <section>
          <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Load-bearing assumptions
          </div>
          <div className="divide-y divide-border rounded-xl border border-border bg-background">
            {[
              "23% retention increase — invented, not from your input",
              "$1.2M ARR — invented, not from your input",
              "One-tap payments / 0-to-1 launch — inferred from \"a payments feature\"",
            ].map((row) => (
              <div key={row} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                <div className="text-[13px]">{row}</div>
                <button
                  onClick={onFix}
                  className="shrink-0 text-[11.5px] text-muted-foreground underline-offset-4 hover:text-coral hover:underline"
                >
                  This is wrong / fix it
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11.5px] text-muted-foreground/80">
            68% of users asked Claude for sources or pushed back on numbers after resume edits like this.
          </div>
        </section>

        {/* Pre-mortem close */}
        <section>
          <div className="rounded-xl border border-[var(--coral)]/40 bg-[var(--coral-soft)]/40 px-4 py-4">
            <div className="text-[13.5px] leading-snug">
              <span className="font-semibold">Before you use this bullet</span> — the numbers
              (23%, $1.2M) are the weakest part. They were invented to fit the role.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Use as-is", "I'll replace with my real numbers", "Remove the numbers"].map((b) => (
                <button
                  key={b}
                  onClick={() => onChoice(b)}
                  className="rounded-full border border-border bg-card px-3.5 py-1.5 text-[12.5px] font-medium hover:border-coral hover:text-coral"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
