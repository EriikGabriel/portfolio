import { ReactNode, useEffect } from "react";

import { Container } from "./styles";

interface GlitchEffectProps {
  children: ReactNode;
}

function GlitchEffect({ children }: GlitchEffectProps) {
  useEffect(() => {
    const stack = document.querySelector(".stack-span") as HTMLSpanElement;
    const spans = stack.childNodes;

    stack.style.setProperty("--stacks", "3");

    spans?.forEach((span, index) => {
      const children = span as HTMLSpanElement;
      children.style.setProperty("--index", `${index}`);
    });
  }, []);

  return (
    <Container className="stack-span">
      {children}
      {children}
      {children}
    </Container>
  );
}

export default GlitchEffect;
