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

export const ToastActionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;
 
export type ToastActionType = typeof ToastActionTypes[keyof typeof ToastActionTypes];

export type ToastAction =
  | {
    type: typeof ToastActionTypes.ADD_TOAST
    toast: ToasterToast
  }
  | {
    type: typeof ToastActionTypes.UPDATE_TOAST
    toast: Partial<ToasterToast>
  }
  | {
    type: typeof ToastActionTypes.DISMISS_TOAST
    toastId?: ToasterToast["id"]
  }
  | {
    type: typeof ToastActionTypes.REMOVE_TOAST
    toastId?: ToasterToast["id"]
  }

export type Toast = Omit<ToasterToast, "id"> 
