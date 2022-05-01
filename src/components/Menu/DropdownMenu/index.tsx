import { FormEvent, ReactNode, useEffect, useState } from "react";
import { LogOut } from "react-feather";

import Button from "@packages/react/Button/Button";

import {
  DropdownMenuArrow,
  DropdownMenuContainer,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../styles";

import { AdminDataType } from "src/pages/admin";

type DropdownMenuProps = {
  children: ReactNode;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminDataType>();

  useEffect(() => {
    const data = localStorage.getItem("@portfolio:adminData");
    if (data) {
      const adminData = JSON.parse(data);
      setAdmin(adminData);
    }
  }, []);

  function handleLogOut() {
    localStorage.removeItem("@portfolio:adminData");
    location.reload();
  }

  return (
    <DropdownMenuContainer>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5}>
        <DropdownMenuLabel>
          <strong>{admin?.username}</strong> - <small>Admin</small>
          <br />
          <small>UID: {admin?._id}</small>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            type="button"
            variant="tertiary"
            leftIcon={<LogOut />}
            onClick={handleLogOut}
          >
            Sair do painel
          </Button>
        </DropdownMenuItem>
        <DropdownMenuArrow offset={12} />
      </DropdownMenuContent>
    </DropdownMenuContainer>
  );
};
