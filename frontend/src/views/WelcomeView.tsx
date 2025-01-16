import { styled } from "solid-styled-components";
import { useNavigate } from "@solidjs/router";
import solidLogo from "../assets/solid.svg";
import viteLogo from "/vite.svg";
import { PrimaryButton, Button, ButtonRow } from "../components/Button";

export const WelcomeView = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Learn Helsinki</h1>
      <Paragraph>This is little game to learn places in Helsinki. It was inspired by Duolingo</Paragraph>
      <ButtonRow>
        <PrimaryButton onClick={() => navigate("/question")}>
          Let's go!
        </PrimaryButton>
        <Button onClick={() => navigate("/new_question")}>
          Contribute questions
        </Button>
      </ButtonRow>
      <LicenseParagraph>Content on this site is licensed under a <a href="https://creativecommons.org/public-domain/cc0/">Public Domain license (CC0)</a>.</LicenseParagraph>
    </Wrapper>
  );
};

const Wrapper = styled("div")(`
  text-align: center;
  width: 350px;
`);

const Paragraph = styled("p")(`
  text-align: left;
`);

const LicenseParagraph = styled("p")(`
  opacity: 0.7;
`);
