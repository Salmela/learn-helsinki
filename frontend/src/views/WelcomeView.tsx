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
      <ButtonRow>
        <PrimaryButton onClick={() => navigate("/question")}>
          Let's go!
        </PrimaryButton>
        <Button onClick={() => navigate("/new_question")}>
          Create new question
        </Button>
      </ButtonRow>
    </Wrapper>
  );
};

const Wrapper = styled("div")(`
  text-align: center;
`);
