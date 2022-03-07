import { Text as TextCSS } from "../../styles";
import { styled } from "../../web";
import React, { forwardRef } from "react";

const StyledText = styled("p", TextCSS);

type TextProps = React.ComponentProps<typeof StyledText>;

const Text = forwardRef<React.ElementRef<typeof StyledText>, TextProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <StyledText ref={forwardedRef} {...props}>
        {children}
      </StyledText>
    );
  }
);
export default Text;
