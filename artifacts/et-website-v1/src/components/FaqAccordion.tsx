import { useState } from "react";

const GOLD = "#B4975A";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  category?: string;
  defaultOpenIdx?: number | null;
  variant?: "dark" | "light";
}

export function FaqAccordion({ items, defaultOpenIdx = null, variant = "dark" }: FaqAccordionProps) {
  const isLight = variant === "light";
  const baseText = isLight ? "#121212" : "white";
  const idleBorder = isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)";
  const idleIcon = isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
  const dividerCls = isLight ? "border-b border-black/10" : "border-b border-white/10";
  const answerCls = isLight ? "text-black/70 text-base leading-relaxed" : "text-white/70 text-base leading-relaxed";
  const [openSet, setOpenSet] = useState<Set<number>>(
    defaultOpenIdx !== null ? new Set([defaultOpenIdx]) : new Set()
  );

  const toggle = (idx: number) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const topBorderCls = isLight ? "border-t border-black/10" : "border-t border-white/10";

  return (
    <div className={topBorderCls}>
      {items.map((item, idx) => {
        const isOpen = openSet.has(idx);
        const panelId = `faq-panel-${idx}`;
        const btnId = `faq-btn-${idx}`;
        return (
          <div key={idx} className={dividerCls}>
            <button
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full text-left py-6 flex items-start justify-between gap-4 group"
              onClick={() => toggle(idx)}
            >
              <span
                className="font-sans font-semibold text-base md:text-lg leading-snug transition-colors"
                style={{ color: isOpen ? GOLD : baseText }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all mt-0.5"
                style={{
                  borderColor: isOpen ? GOLD : idleBorder,
                  backgroundColor: isOpen ? GOLD : "transparent",
                  color: isOpen ? "#121212" : idleIcon,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  className="transition-transform"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <path d="M6 8L1 3H11L6 8Z" />
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-6 pr-12"
            >
              <p className={answerCls} dangerouslySetInnerHTML={{ __html: item.answer }}>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
