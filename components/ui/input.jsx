import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "yflex yh-9 yw-full yrounded-md yborder yborder-input ybg-transparent ypx-3 ypy-1 ytext-sm yshadow-sm ytransition-colors file:yborder-0 file:ybg-transparent file:ytext-sm file:yfont-medium placeholder:ytext-muted-foreground focus-visible:youtline-none focus-visible:yring-1 focus-visible:yring-ring disabled:ycursor-not-allowed disabled:yopacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
