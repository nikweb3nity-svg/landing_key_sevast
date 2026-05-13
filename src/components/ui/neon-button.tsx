import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full border px-6 py-3 text-center text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-civic-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        solid:
          "border-civic-300/35 bg-civic-500/92 text-white shadow-[0_0_28px_rgba(37,99,235,0.34)] hover:border-civic-100/65 hover:bg-civic-400",
        call:
          "border-civic-100/70 bg-gradient-to-r from-civic-400 via-blue-500 to-civic-500 text-white shadow-[0_0_34px_rgba(37,99,235,0.56),0_10px_34px_rgba(15,23,42,0.28)] ring-1 ring-civic-200/30 hover:-translate-y-0.5 hover:border-white/80 hover:shadow-[0_0_46px_rgba(96,165,250,0.7),0_14px_40px_rgba(15,23,42,0.34)]",
        glass:
          "border-civic-200/25 bg-white/8 text-civic-50 backdrop-blur-xl hover:border-civic-100/50 hover:bg-white/12",
        subtle:
          "border-white/12 bg-graphite-950/72 text-white backdrop-blur-xl hover:border-civic-200/45 hover:bg-civic-950/82",
      },
      size: {
        sm: "min-h-11 px-4 py-2 text-sm",
        md: "min-h-12 px-6 py-3 text-base",
        lg: "min-h-14 px-7 py-4 text-base",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
      full: false,
    },
  },
);

function NeonGlow({ neon }: { neon?: boolean }) {
  if (!neon) {
    return null;
  }

  return (
    <>
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-civic-100 to-transparent opacity-60 transition duration-500 group-hover:inset-x-3 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-civic-300 to-transparent opacity-70 transition duration-500 group-hover:inset-x-4 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -inset-px rounded-full bg-civic-300/0 blur-xl transition duration-500 group-hover:bg-civic-300/16" />
      <span className="pointer-events-none absolute -left-10 top-0 h-full w-10 -skew-x-12 bg-white/28 blur-sm transition-transform duration-700 group-hover:translate-x-[240px]" />
    </>
  );
}

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  neon?: boolean;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, size, full, neon = true, children, ...props }, ref) => (
    <button ref={ref} className={cn(neonButtonVariants({ variant, size, full }), className)} {...props}>
      <NeonGlow neon={neon} />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  ),
);

NeonButton.displayName = "NeonButton";

export interface NeonButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof neonButtonVariants> {
  neon?: boolean;
}

export const NeonButtonLink = React.forwardRef<HTMLAnchorElement, NeonButtonLinkProps>(
  ({ className, variant, size, full, neon = true, children, ...props }, ref) => (
    <a ref={ref} className={cn(neonButtonVariants({ variant, size, full }), className)} {...props}>
      <NeonGlow neon={neon} />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </a>
  ),
);

NeonButtonLink.displayName = "NeonButtonLink";

export { neonButtonVariants };
