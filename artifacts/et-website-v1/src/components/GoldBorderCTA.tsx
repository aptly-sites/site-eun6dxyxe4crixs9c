import { Link } from "wouter";
import type { ReactNode } from "react";

interface GoldBorderCTAProps {
  title: ReactNode;
  btnLabel: string;
  btnHref: string;
  /** Optional secondary line shown below the button in smaller text */
  subtitle?: ReactNode;
  variant?: "dark" | "light";
  buttonPosition?: "left" | "right";
  className?: string;
}

export function GoldBorderCTA({
  title,
  btnLabel,
  btnHref,
  subtitle,
  variant = "dark",
  buttonPosition = "right",
  className = "",
}: GoldBorderCTAProps) {
  const isDark = variant === "dark";
  const buttonOnLeft = buttonPosition === "left";
  return (
    <section
      className={`relative py-14 md:py-16 px-5 md:px-10 ${isDark ? "bg-primary" : "bg-white"} ${className}`}
    >
      <div
        className={`border-4 border-secondary px-6 py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-center justify-center md:justify-between gap-5 md:gap-10 ${buttonOnLeft ? "md:flex-row-reverse" : ""}`}
      >
        <h2
          className={`font-cowling font-normal text-2xl md:text-3xl leading-tight tracking-[0.04em] text-center m-0 ${buttonOnLeft ? "md:text-right" : "md:text-left"} ${isDark ? "text-white" : "text-black"}`}
        >
          {title}
        </h2>
        <div className={`relative z-10 shrink-0 flex flex-col items-center ${buttonOnLeft ? "md:items-start" : "md:items-end"} gap-2`}>
          <Link href={btnHref} className="block btn-solid-secondary uppercase whitespace-nowrap">
            {btnLabel}
          </Link>
          {subtitle && (
            <p
              className={`font-sans text-sm leading-snug m-0 text-center ${buttonOnLeft ? "md:text-left" : "md:text-right"} ${isDark ? "text-white/70" : "text-black/60"}`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
