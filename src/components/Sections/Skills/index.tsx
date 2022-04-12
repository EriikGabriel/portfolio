import { useState } from "react";

import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import { TypeStage, useTypedText } from "src/hooks/useTypedText";
import { m } from "framer-motion";
import cn from "classnames";

import {
  HtmlIcon,
  CssIcon,
  SassIcon,
  JavascriptIcon,
  TypescriptIcon,
  NextIcon,
  ReactIcon,
  UnityIcon,
  CSharpIcon,
  NodeIcon,
  MysqlIcon,
  FigmaIcon,
  GitIcon,
  GitHubIcon,
  PhpIcon,
  BootstrapIcon,
} from "../../../exports/icons";

import { Container } from "./styles";
import Image from "next/image";

export const Skills: React.FC = () => {
  const [startTyping, setStartTyping] = useState(false);

  const sectionText = useTypedText({
    texts: ["Algumas das tecnologias que utilizo"],
    typingInterval: 100,
    startTyping,
  });

  const skillsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container id="skills">
      <m.div
        variants={skillsVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        onAnimationStart={() => setStartTyping(true)}
      >
        <div>
          <Heading>
            Minhas <span>skills</span>
          </Heading>
          <Text
            size="sm"
            className={cn({
              ["end-cursor"]:
                sectionText.stage !== TypeStage.Deleting &&
                !sectionText.hideCursor,
              ["blinking"]: sectionText.stage !== TypeStage.Holding,
            })}
            aria-label={sectionText.selectedTexts}
          >
            {sectionText.typedText}
          </Text>
        </div>
      </m.div>
      <div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div
            style={{
              position: "relative",
              width: 50,
              height: 50,
            }}
          >
            <Image src={"/html5.svg"} layout="fill" />
          </div>
          <Text size="xs">HTML5</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <CssIcon />
          <Text size="xs">CSS3</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <SassIcon />
          <Text size="xs">Sass</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <JavascriptIcon />
          <Text size="xs">Javascript</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <TypescriptIcon />
          <Text size="xs">Typescript</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <NextIcon />
          <Text size="xs">Next</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
        >
          <ReactIcon />
          <Text size="xs">React</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <UnityIcon />
          <Text size="xs">Unity</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.3 }}
        >
          <CSharpIcon />
          <Text size="xs">C#</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.4 }}
        >
          <NodeIcon />
          <Text size="xs">Node</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
        >
          <MysqlIcon />
          <Text size="xs">MySql</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.6 }}
        >
          <FigmaIcon />
          <Text size="xs">Figma</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.7 }}
        >
          <GitIcon />
          <Text size="xs">Git</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.8 }}
        >
          <GitHubIcon />
          <Text size="xs">Github</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 1.9 }}
        >
          <PhpIcon />
          <Text size="xs">PHP</Text>
        </m.div>
        <m.div
          variants={skillsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 2 }}
        >
          <BootstrapIcon />
          <Text size="xs">Bootstrap</Text>
        </m.div>
      </div>
    </Container>
  );
};
