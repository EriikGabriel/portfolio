import {
  IconButton as IconButtonCSS,
  ButtonLabel as ButtonLabelCSS,
  Spinner as SpinnerCSS,
} from "@packages/styles";
import { styled } from "@packages/web";
import React, { forwardRef } from "react";

const StyledIconButton = styled("button", IconButtonCSS);
const ButtonLabel = styled("span", ButtonLabelCSS);
const Spinner = styled("span", SpinnerCSS);

type ButtonProps = React.ComponentProps<typeof StyledIconButton> & {
  children: React.ReactElement;
  loading?: boolean;
};

const IconButton = forwardRef<
  React.ElementRef<typeof StyledIconButton>,
  ButtonProps
>(({ children, loading, outlined, disabled, ...props }, forwardedRef) => {
  return (
    <StyledIconButton
      disabled={disabled}
      ref={forwardedRef}
      outlined={outlined}
      {...props}
    >
      <ButtonLabel>{loading ? <Spinner /> : children}</ButtonLabel>
    </StyledIconButton>
  );
});
export default IconButton;
