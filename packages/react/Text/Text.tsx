import { Text as TextCSS } from "../../styles";
import React, { forwardRef } from "react";

import { m } from "framer-motion";
import { styled } from "../../web";

const StyledText = styled(m.p, TextCSS);

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
