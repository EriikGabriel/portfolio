import IconButton from "@packages/react/Button/IconButton";
import Heading from "@packages/react/Heading/Heading";
import Text from "@packages/react/Text/Text";
import { Edit, Eye, FileText } from "react-feather";
import { Container } from "./styles";

export const ResumeOverview: React.FC = () => {
  return (
    <Container>
      <Heading size="sm">Currículo</Heading>

      <div>
        <div>
          <FileText size={30} />
          <Text>curriculo.pdf</Text>
        </div>
        <div>
          <IconButton variant="tertiary">
            <Eye />
          </IconButton>
          <IconButton variant="tertiary">
            <Edit />
          </IconButton>
        </div>
      </div>
    </Container>
  );
};
