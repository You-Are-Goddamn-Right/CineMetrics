import * as React from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "yfixed ytop-0 yz-[100] yflex ymax-h-screen yw-full yflex-col-reverse yp-4 sm:ybottom-0 sm:yright-0 sm:ytop-auto sm:yflex-col md:ymax-w-[420px]",
      className
    )}
    {...props} />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "ygroup ypointer-events-auto yrelative yflex yw-full yitems-center yjustify-between yspace-x-2 yoverflow-hidden yrounded-md yborder yp-4 ypr-6 yshadow-lg ytransition-all data-[swipe=cancel]:ytranslate-x-0 data-[swipe=end]:ytranslate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:ytranslate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:ytransition-none data-[state=open]:yanimate-in data-[state=closed]:yanimate-out data-[swipe=end]:yanimate-out data-[state=closed]:yfade-out-80 data-[state=closed]:yslide-out-to-right-full data-[state=open]:yslide-in-from-top-full data-[state=open]:sm:yslide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "yborder ybg-background ytext-foreground",
        destructive:
          "ydestructive ygroup yborder-destructive ybg-destructive ytext-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    (<ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props} />)
  );
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "yinline-flex yh-8 yshrink-0 yitems-center yjustify-center yrounded-md yborder ybg-transparent ypx-3 ytext-sm yfont-medium ytransition-colors hover:ybg-secondary focus:youtline-none focus:yring-1 focus:yring-ring disabled:ypointer-events-none disabled:yopacity-50 group-[.destructive]:yborder-muted/40 group-[.destructive]:hover:yborder-destructive/30 group-[.destructive]:hover:ybg-destructive group-[.destructive]:hover:ytext-destructive-foreground group-[.destructive]:focus:yring-destructive",
      className
    )}
    {...props} />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "yabsolute yright-1 ytop-1 yrounded-md yp-1 ytext-foreground/50 yopacity-0 ytransition-opacity hover:ytext-foreground focus:yopacity-100 focus:youtline-none focus:yring-1 group-hover:yopacity-100 group-[.destructive]:ytext-red-300 group-[.destructive]:hover:ytext-red-50 group-[.destructive]:focus:yring-red-400 group-[.destructive]:focus:yring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}>
    <Cross2Icon className="yh-4 yw-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("ytext-sm yfont-semibold [&+div]:ytext-xs", className)}
    {...props} />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("ytext-sm yopacity-90", className)} {...props} />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction };
