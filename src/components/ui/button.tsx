import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 btn-press",
  {
    variants: {
      variant: {
        default:
          "bg-deep-burgundy text-antique-gold shadow-md hover:shadow-lg hover:shadow-burgundy/30 hover:-translate-y-0.5 active:translate-y-0 hover:border-antique-gold/40 border border-transparent",
        destructive:
          "bg-error text-white shadow-sm hover:bg-error/90 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-deep-burgundy/60 bg-transparent text-deep-burgundy shadow-sm hover:bg-deep-burgundy/5 hover:border-deep-burgundy hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-antique-gold text-deep-burgundy shadow-sm font-semibold hover:bg-antique-gold/90 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "hover:bg-surface-container-high hover:text-deep-burgundy hover:-translate-y-0.5 active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline hover:text-deep-burgundy",
        warm: "bg-secondary text-white shadow-sm hover:bg-secondary/90 hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base font-semibold",
        xl: "h-14 rounded-lg px-10 text-base font-bold tracking-wide",
        icon: "h-9 w-9",
        "icon-lg": "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
