import Title from "./Title";
import Wrapper from "./Wrapper";
import Container from "./Container";

const Navigation = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Wrapper>
      <Container>
        <Title />
        {children}
      </Container>
    </Wrapper >
  );
};

export default Navigation;
