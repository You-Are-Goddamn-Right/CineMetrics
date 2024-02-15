import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "yinline-flex yitems-center yjustify-center ywhitespace-nowrap yrounded-md ytext-sm yfont-medium ytransition-colors focus-visible:youtline-none focus-visible:yring-1 focus-visible:yring-ring disabled:ypointer-events-none disabled:yopacity-50",
  {
    variants: {
      variant: {
        default:
          "ybg-primary ytext-primary-foreground yshadow hover:ybg-primary/90",
        destructive:
          "ybg-destructive ytext-destructive-foreground yshadow-sm hover:ybg-destructive/90",
        outline:
          "yborder yborder-input ybg-background yshadow-sm hover:ybg-accent hover:ytext-accent-foreground",
        secondary:
          "ybg-secondary ytext-secondary-foreground yshadow-sm hover:ybg-secondary/80",
        ghost: "hover:ybg-accent hover:ytext-accent-foreground",
        link: "ytext-primary yunderline-offset-4 hover:yunderline",
      },
      size: {
        default: "yh-9 ypx-4 ypy-2",
        sm: "yh-8 yrounded-md ypx-3 ytext-xs",
        lg: "yh-10 yrounded-md ypx-8",
        icon: "yh-9 yw-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
