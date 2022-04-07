import React, { useContext, useEffect, useState } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

import { Container, Menu, Overlay } from "./styles";

import { MenuToggle } from "./MenuToggle";
import { List } from "./List";
import { LoaderContext } from "src/contexts/LoaderContext";

export const Header: React.FC = () => {
  const { changeLoadingState, isLoading } = useContext(LoaderContext);

  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const [lastYPos, setLastYPos] = useState(0);

  const variantsSvg = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 0.5,
    },
  };

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const header = document.querySelector("header") as HTMLHeadingElement;

    const LOADER_DURATION_MILLISECONDS = 4 * 1000; // Padrão: min 4s

    body.style.overflow = "hidden";

    const timeout = setTimeout(() => {
      changeLoadingState();
      body.style.overflow = "visible";
      header.classList.add("header");
    }, LOADER_DURATION_MILLISECONDS);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      setShouldShowHeader(isScrollingUp);
      setLastYPos(yPos);
    }

    window.addEventListener("scroll", handleScroll, false);

    const header = document.querySelector("header") as HTMLHeadingElement;

    if (shouldShowHeader && !isOpen) header.classList.add("transparentHeader");
    else header.style.transition = "0s";

    if (lastYPos == 0) header.classList.remove("transparentHeader");

    return () => window.removeEventListener("scroll", handleScroll, false);
  }, [lastYPos]);

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const header = document.querySelector("header") as HTMLHeadingElement;

    if (!isLoading) {
      isOpen
        ? (body.style.overflow = "hidden")
        : (body.style.overflow = "visible");
    }

    if (isOpen || lastYPos == 0) header.classList.remove("transparentHeader");
    else if (shouldShowHeader) header.classList.add("transparentHeader");
  }, [isOpen]);

  return (
    <LazyMotion features={domAnimation}>
      <Container
        animate={{ y: shouldShowHeader ? 0 : -80 }}
        transition={{ duration: 0.2 }}
      >
        <m.div>
          <m.svg
            className="logo"
            viewBox="0 0 239 203"
            fill="none"
            initial="hidden"
            animate="visible"
          >
            <m.path
              variants={variantsSvg}
              transition={{
                duration: 3,
                delay: 0.5,
                ease: "easeInOut",
              }}
              d="M161.155 87.6801H116.947V65.0721H157.267V40.7361H116.947V25.0401H151.651V0.560059H90.307V112.16H161.155V87.6801ZM94.627 4.88006H147.331V20.7201H112.627V45.0561H152.947V60.7521H112.627V92.0001H156.835V107.84H94.627V4.88006Z"
            />
            <m.path
              variants={variantsSvg}
              transition={{
                duration: 3,
                delay: 0.5,
                ease: "easeInOut",
              }}
              d="M159.804 202.448C181.404 202.448 199.116 184.88 199.116 163.28V89.1199H174.348V91.8559C170.028 89.2639 163.98 87.5359 158.796 87.5359C153.756 87.5359 148.716 88.5439 144.108 90.7039C139.644 92.7199 135.612 95.5999 132.012 99.3439C124.812 106.832 120.924 116.912 120.924 127.712C120.924 138.224 124.812 148.304 131.868 155.792C139.068 163.424 148.572 167.744 158.796 167.744C162.396 167.744 166.284 167.024 169.74 165.728C171.036 165.152 172.764 164.432 174.348 163.424V164.576C174.348 171.92 168.012 177.824 159.804 177.824C154.62 177.824 149.868 175.088 147.276 170.624L145.98 168.608L125.82 183.152L127.116 184.88C130.572 190.208 135.468 194.528 140.94 197.552C146.7 200.72 153.18 202.448 159.804 202.448ZM144.828 174.8C148.428 179.408 153.9 182.144 159.804 182.144C170.316 182.144 178.668 174.368 178.668 164.576V152.336C173.34 161.84 165.276 163.424 158.796 163.424C140.22 163.424 125.244 147.296 125.244 127.712C125.244 118.064 128.844 108.992 135.18 102.224C141.516 95.4559 150.012 91.8559 158.796 91.8559C163.836 91.8559 173.34 93.8719 178.668 101.792V93.4399H194.796V163.28C194.796 182.432 179.1 198.128 159.804 198.128C153.9 198.128 148.14 196.688 143.1 193.808C138.78 191.36 134.892 188.048 131.868 184.16L144.828 174.8ZM160.812 147.44C171.612 147.44 179.532 139.088 179.532 127.712C179.532 122.096 177.66 117.2 174.204 113.6C170.748 109.856 165.996 107.984 160.812 107.984C155.628 107.984 150.876 109.856 147.276 113.456C143.676 117.2 141.66 122.24 141.66 127.712C141.66 133.184 143.676 138.224 147.276 141.824C150.876 145.424 155.628 147.44 160.812 147.44ZM160.812 112.304C164.844 112.304 168.444 113.744 171.036 116.48C173.772 119.36 175.212 123.248 175.212 127.712C175.212 132.032 173.772 136.064 171.036 138.8C168.444 141.536 164.844 143.12 160.812 143.12C156.78 143.12 153.036 141.536 150.3 138.8C147.564 135.92 145.98 132.032 145.98 127.712C145.98 123.392 147.564 119.36 150.3 116.624C153.036 113.744 156.78 112.304 160.812 112.304Z"
            />
            <m.path
              variants={variantsSvg}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              d="M34.5714 43.536L26.5074 51.5999L34.5714 59.664L21.4674 72.912L13.4034 64.8479L0.155396 51.5999L13.4034 38.352L21.4674 30.2879L34.5714 43.536ZM29.0994 59.664L23.7714 54.3359L21.0354 51.5999L23.7714 48.8639L29.0994 43.536L21.4674 35.7599L5.6274 51.5999L21.4674 67.44L29.0994 59.664ZM76.0882 1.19995H95.672L62.4082 102H42.8242L76.0882 1.19995ZM59.6722 98.112L90.344 5.08795H78.8242L48.1522 98.112H59.6722ZM217.688 30.2879L238.856 51.5999L217.688 72.912L204.44 59.664L212.504 51.5999L204.44 43.536L217.688 30.2879ZM217.688 67.44L233.384 51.5999L217.688 35.7599L209.912 43.536L215.24 48.8639L217.976 51.5999L215.24 54.3359L209.912 59.664L217.688 67.44Z"
            />
          </m.svg>
        </m.div>
        <nav>
          {!isLoading && (
            <>
              <div>
                <List />
              </div>
              <div>
                <MenuToggle isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
                <AnimatePresence>
                  {isOpen && (
                    <>
                      <Menu
                        exit={{ x: "100%" }}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="false"
                        tabIndex={1}
                      >
                        <nav>
                          <List />
                        </nav>
                      </Menu>
                      <Overlay />
                    </>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </nav>
      </Container>
    </LazyMotion>
  );
};
