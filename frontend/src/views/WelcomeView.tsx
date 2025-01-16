import { styled } from "solid-styled-components";
import { useNavigate } from "@solidjs/router";
import HelsinkiHeroImage from "../assets/helsinki.svg";
import { PrimaryButton, Button } from "../components/Button";

export const WelcomeView = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <SkylineImage src={HelsinkiHeroImage} />
      <Header>Learn Helsinki</Header>
      <Paragraph>This little game helps you learn about places around Helsinki and makes you indistinguishable from a long-time dweller of the capital city in no time.</Paragraph>
      <CenteredButtonRow>
        <PrimaryButton onClick={() => navigate("/question")}>
          Let's go!
        </PrimaryButton>
        <Button onClick={() => navigate("/new_question")}>
          Contribute questions
        </Button>
      </CenteredButtonRow>
      <LicenseParagraph>Content on this site is licensed under a <a href="https://creativecommons.org/public-domain/cc0/">Public Domain license (CC0)</a>.</LicenseParagraph>
    </Wrapper>
  );
};

const SkylineImage = styled("img")(`
  width: 350px;
`);

const Wrapper = styled("div")(`
  text-align: center;
  width: 350px;
  min-height: 700px;
`);

const Header = styled("h1")(`
  margin-top: 0;
  margin-bottom: 0;
`);

const Paragraph = styled("p")(`
  margin: 24px 0;
  text-align: left;
`);

const CenteredButtonRow = styled("div")(`
  margin: 24px 0;
  display: flex;
  justify-content: center;
  gap: 16px;
`);

const LicenseParagraph = styled("p")(`
  opacity: 0.7;
`);
