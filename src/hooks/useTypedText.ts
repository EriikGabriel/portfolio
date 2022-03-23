import { useEffect, useState } from "react";

enum Stage {
  Typing,
  Holding,
  Deleting,
}

type useTypedTextProps = {
  texts: string[];
  typingInterval?: number;
  pauseMs?: number;
  deletingInterval?: number;
};

export const useTypedText = ({
  texts,
  typingInterval = 150,
  pauseMs = 1000,
  deletingInterval = 50,
}: useTypedTextProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [stage, setStage] = useState(Stage.Typing);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    switch (stage) {
      case Stage.Typing: {
        const nextTypedText = texts[selectedIndex].slice(
          0,
          typedText.length + 1
        );

        if (nextTypedText === typedText) {
          setStage(Stage.Holding);
          return;
        }

        const timeout = setTimeout(
          () => setTypedText(nextTypedText),
          typingInterval
        );

        return () => clearTimeout(timeout);
      }

      case Stage.Deleting: {
        if (!typedText) {
          const nextIndex = selectedIndex + 1;
          setSelectedIndex(texts[nextIndex] ? nextIndex : 0);
          setStage(Stage.Typing);
          return;
        }

        const nextRemaining = texts[selectedIndex].slice(
          0,
          typedText.length - 1
        );

        const timeout = setTimeout(
          () => setTypedText(nextRemaining),
          deletingInterval
        );

        return () => clearTimeout(timeout);
      }

      case Stage.Holding:
      default:
        const timeout = setTimeout(() => setStage(Stage.Deleting), pauseMs);
        return () => clearTimeout(timeout);
    }
    // if (stage === Stage.Holding) return;
  }, [texts, typedText, selectedIndex, stage]);

  return typedText;
};
