import React from "react";

import { styled } from "@packages/web";
import { theme } from "@packages/web";
import IconButton from "@packages/react/Button/IconButton";

import { m } from "framer-motion";

type PathProps = React.ComponentProps<typeof m.path>;
type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

const Button = styled(IconButton, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1002,
});

const Path: React.FC<PathProps> = props => (
  <m.path fill="transparent" strokeLinecap="round" strokeWidth="3" {...props} />
);

const transition = { duration: 0.33 };

export const MenuToggle: React.FC<MenuToggleProps> = ({
  isOpen,
  toggle,
  ...props
}) => {
  return (
    <Button variant="tertiary" onClick={toggle} {...props}>
      <svg viewBox="-1 -1.5 23 23">
        <Path
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: {
              d: "M 2 2.5 L 20 2.5",
              stroke: `${theme.colors.primary_base}`,
            },
            open: {
              d: "M 3 16.5 L 17 2.5",
              stroke: `${theme.colors.primary_base}`,
            },
          }}
          transition={transition}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          stroke={`${theme.colors.primary_base}`}
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={transition}
        />
        <Path
          animate={isOpen ? "open" : "closed"}
          initial={false}
          variants={{
            closed: {
              d: "M 2 16.346 L 20 16.346",
              stroke: `${theme.colors.primary_base}`,
            },
            open: {
              d: "M 3 2.5 L 17 16.346",
              stroke: `${theme.colors.primary_base}`,
            },
          }}
          transition={transition}
        />
      </svg>
    </Button>
  );
};
