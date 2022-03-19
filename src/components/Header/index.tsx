import LogoSvg from "../../assets/logo.svg";

import React, { useEffect, useState } from "react";

import { Container, Menu, Overlay } from "./styles";

import { MenuToggle } from "./MenuToggle";
import { List } from "./List";
import { AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const [lastYPos, setLastYPos] = useState(0);

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
    if (lastYPos == 0) header.classList.remove("transparentHeader");

    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, [lastYPos]);

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const header = document.querySelector("header") as HTMLHeadingElement;

    isOpen ? (body.style.overflow = "hidden") : (body.style.overflow = "auto");

    if (isOpen || lastYPos == 0) header.classList.remove("transparentHeader");
    else if (shouldShowHeader) header.classList.add("transparentHeader");
  }, [isOpen]);

  return (
    <Container
      animate={{ y: shouldShowHeader ? 0 : -80 }}
      transition={{ duration: 0.2 }}
    >
      <nav>
        <div>
          <LogoSvg className="logo" />
        </div>
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
      </nav>
    </Container>
  );
};
