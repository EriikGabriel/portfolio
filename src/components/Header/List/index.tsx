import Button from "@packages/react/Button/Button";
import React from "react";

import { m } from "framer-motion";

const liVariants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: -20,
  },
};

export const List: React.FC = () => {
  return (
    <>
      <ul>
        <m.li
          variants={liVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.8,
          }}
        >
          <a href="#">Quem sou</a>
        </m.li>
        <m.li
          variants={liVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.9,
          }}
        >
          <a href="#">Skills</a>
        </m.li>
        <m.li
          variants={liVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 1,
          }}
        >
          <a href="#">Projetos</a>
        </m.li>
        <m.li
          variants={liVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 1.1,
          }}
        >
          <a href="#">Conecte-se</a>
        </m.li>
      </ul>
      <Button
        variants={liVariants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 1.2,
        }}
        outlined
      >
        Currículo
      </Button>
    </>
  );
};
