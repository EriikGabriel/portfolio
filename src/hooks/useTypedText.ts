import { useEffect, useState } from "react";

export enum TypeStage {
  Idle,
  Typing,
  Holding,
  Deleting,
}

type useTypedTextProps = {
  texts: string[];
  startTyping?: boolean;
  typingInterval?: number;
  idleInterval?: number;
  holdingMs?: number;
  deletingInterval?: number;
};

export const useTypedText = ({
  texts,
  startTyping = true,
  typingInterval = 150,
  idleInterval = 1000,
  holdingMs = 1000,
  deletingInterval = 50,
}: useTypedTextProps): {
  typedText: string;
  selectedTexts: string;
  stage: TypeStage;
  hideCursor: boolean;
} => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [stage, setStage] = useState(TypeStage.Idle);
  const [typedText, setTypedText] = useState("");
  const [hideCursorWhenFinish, setHideCursorWhenFinish] = useState(false);

  useEffect(() => {
    if (startTyping) {
      switch (stage) {
        case TypeStage.Idle: {
          const timeout = setTimeout(
            () => setStage(TypeStage.Typing),
            idleInterval
          );
          return () => clearTimeout(timeout);
        }
        case TypeStage.Typing: {
          const nextTypedText = texts[selectedIndex].slice(
            0,
            typedText.length + 1
          );

          if (nextTypedText === typedText) {
            setStage(TypeStage.Holding);
            return;
          }

          const timeout = setTimeout(
            () => setTypedText(nextTypedText),
            typingInterval
          );

          return () => clearTimeout(timeout);
        }

        case TypeStage.Deleting: {
          if (!typedText) {
            const nextIndex = selectedIndex + 1;
            setSelectedIndex(texts[nextIndex] ? nextIndex : 0);
            setStage(TypeStage.Typing);
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

        case TypeStage.Holding:
        default: {
          if (texts.length > 1) {
            const timeout = setTimeout(
              () => setStage(TypeStage.Deleting),
              holdingMs
            );
            return () => clearTimeout(timeout);
          } else setHideCursorWhenFinish(true);
        }
      }
    }
  }, [texts, typedText, selectedIndex, stage]);

  return {
    typedText,
    stage,
    hideCursor: hideCursorWhenFinish,
    selectedTexts: texts[selectedIndex],
  };
};
