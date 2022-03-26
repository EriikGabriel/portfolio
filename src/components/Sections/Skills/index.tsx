import { useState } from "react";

import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";

import { TypeStage, useTypedText } from "src/hooks/useTypedText";
import { m } from "framer-motion";
import cn from "classnames";

import HtmlIcon from "../../../../public/assets/icons/html5.svg";
import CssIcon from "../../../../public/assets/icons/css3.svg";
import SassIcon from "../../../../public/assets/icons/sass.svg";
import JavascriptIcon from "../../../../public/assets/icons/javascript.svg";
import TypescriptIcon from "../../../../public/assets/icons/typescript.svg";
import NextIcon from "../../../../public/assets/icons/nextjs.svg";
import ReactIcon from "../../../../public/assets/icons/reactjs.svg";
import UnityIcon from "../../../../public/assets/icons/unity.svg";
import CSharpIcon from "../../../../public/assets/icons/csharp.svg";
import NodeIcon from "../../../../public/assets/icons/nodejs.svg";
import MysqlIcon from "../../../../public/assets/icons/mysql.svg";
import FigmaIcon from "../../../../public/assets/icons/figma.svg";
import GitIcon from "../../../../public/assets/icons/git.svg";
import GitHubIcon from "../../../../public/assets/icons/github.svg";
import PhpIcon from "../../../../public/assets/icons/php.svg";
import BootstrapIcon from "../../../../public/assets/icons/bootstrap.svg";

import { Container } from "./styles";

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
    <Container>
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
          <HtmlIcon />
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
