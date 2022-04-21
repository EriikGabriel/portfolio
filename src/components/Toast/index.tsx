import { Dispatch, ReactNode, SetStateAction } from "react";

import {
  ToastProvider,
  ToastWrapper,
  ToastViewport,
  ToastClose,
} from "./styles";

type ToastProps = {
  children: ReactNode;
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  duration?: number;
};

export const Toast: React.FC<ToastProps> = ({
  children,
  open,
  setOpen,
  duration,
}) => {
  return (
    <ToastProvider swipeDirection="right" duration={duration}>
      <ToastWrapper open={open} onOpenChange={setOpen}>
        {children}
      </ToastWrapper>
      <ToastViewport />
    </ToastProvider>
  );
};
