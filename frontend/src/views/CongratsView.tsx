import { styled } from "solid-styled-components";
import { useNavigate } from "@solidjs/router";
import HelsinkiHeroImage from "../assets/helsinki.svg";
import { PrimaryButton, ButtonRow } from "../components/Button";

export const CongratsView = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h1>Congratulations! 🎉</h1>
      <Paragraph>I have no clue how well you did, but probably well.</Paragraph>
      <ButtonRow>
        <div></div>
        <PrimaryButton onClick={() => navigate("/")}>Finnish</PrimaryButton>
      </ButtonRow>
    </Wrapper>
  );
};

const Wrapper = styled("div")(`
  width: 600px;
  min-height: 700px;
`);

const Paragraph = styled("p")(`
  height: 400px;
  margin: 0;
`);
