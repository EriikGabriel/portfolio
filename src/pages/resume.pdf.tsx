import { Container } from "../styles/resume";

const Resume: React.FC = () => {
  return (
    <Container
      src="lib/web/viewer.html?file=../../tmp/uploads/currículo.pdf"
      title="Currículo"
    ></Container>
  );
};

export default Resume;
