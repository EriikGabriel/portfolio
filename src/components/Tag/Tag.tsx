import { Tag as TagCSS } from "@packages/styles";
import { styled } from "@packages/web";
import React, { forwardRef } from "react";

const StyledTag = styled("span", TagCSS);

type TagProps = React.ComponentProps<typeof StyledTag>;

const Tag = forwardRef<React.ElementRef<typeof StyledTag>, TagProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <StyledTag ref={forwardedRef} {...props}>
        <span>{children}</span>
      </StyledTag>
    );
  }
);
export default Tag;
