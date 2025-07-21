import React from "react";

// Toast-related types
export interface State {
  toasts: ToasterToast[]
}

export interface ToasterToast extends ToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

export type ToastActionElement = React.ReactElement<{
  altText: string
  onClick: () => void
}>

export type ToastProps = {
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionType = {
  ADD_TOAST: "ADD_TOAST"
  UPDATE_TOAST: "UPDATE_TOAST"
  DISMISS_TOAST: "DISMISS_TOAST"
  REMOVE_TOAST: "REMOVE_TOAST"
}

export type ToastAction =
  | {
    type: ToastActionType["ADD_TOAST"]
    toast: ToasterToast
  }
  | {
    type: ToastActionType["UPDATE_TOAST"]
    toast: Partial<ToasterToast>
  }
  | {
    type: ToastActionType["DISMISS_TOAST"]
    toastId?: ToasterToast["id"]
  }
  | {
    type: ToastActionType["REMOVE_TOAST"]
    toastId?: ToasterToast["id"]
  } 