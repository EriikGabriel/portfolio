import Button from "@packages/react/Button/Button";
import React from "react";

export const List: React.FC = () => {
  return (
    <>
      <ul>
        <li>
          <a href="#">Quem sou</a>
        </li>
        <li>
          <a href="#">Skills</a>
        </li>
        <li>
          <a href="#">Projetos</a>
        </li>
        <li>
          <a href="#">Conecte-se</a>
        </li>
      </ul>
      <Button outlined>Currículo</Button>
    </>
  );
};
