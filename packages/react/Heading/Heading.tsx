import { Heading as HeadingCSS } from "../../styles";
import { styled } from "../../web";
import React, { forwardRef } from "react";

const StyledHeading = styled("h1", HeadingCSS);

type HeadingProps = React.ComponentProps<typeof StyledHeading>;

const Heading = forwardRef<
  React.ElementRef<typeof StyledHeading>,
  HeadingProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <StyledHeading ref={forwardedRef} {...props}>
      {children}
    </StyledHeading>
  );
});
export default Heading;
