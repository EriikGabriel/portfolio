import {
  Button as ButtonCSS,
  ButtonLabel as ButtonLabelCSS,
  Spinner as SpinnerCSS,
} from "../../styles";
import { styled } from "../../web";
import React, { forwardRef } from "react";

const StyledButton = styled("button", ButtonCSS);
const ButtonLabel = styled("span", ButtonLabelCSS);
const Spinner = styled("span", SpinnerCSS);

type ButtonProps = React.ComponentProps<typeof StyledButton> & {
  leftIcon?: React.ReactElement;
  loading?: boolean;
};

const Button = forwardRef<React.ElementRef<typeof StyledButton>, ButtonProps>(
  (
    { children, leftIcon, loading, outlined, disabled, ...props },
    forwardedRef
  ) => {
    return (
      <StyledButton
        disabled={disabled}
        ref={forwardedRef}
        outlined={outlined}
        {...props}
      >
        <ButtonLabel>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {leftIcon}
              <span>{children}</span>
            </>
          )}
        </ButtonLabel>
      </StyledButton>
    );
  }
);
export default Button;
