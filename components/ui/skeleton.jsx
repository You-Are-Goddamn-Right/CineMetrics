import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("yanimate-pulse yrounded-md ybg-primary/10", className)}
      {...props} />)
  );
}

export { Skeleton }
