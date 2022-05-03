import Text from "@packages/react/Text/Text";
import { ReactNode } from "react";

import { Container } from "./styles";

type OverviewCardProps = {
  children: ReactNode;
  icon: ReactNode;
  quantity: number;
};

export const OverviewCard: React.FC<OverviewCardProps> = ({
  children,
  icon,
  quantity,
}) => {
  return (
    <Container>
      {icon}
      <div>
        <Text>{children}</Text>
        <Text>{quantity}</Text>
      </div>
    </Container>
  );
};
