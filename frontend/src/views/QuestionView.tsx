import { styled } from "solid-styled-components";
import { createSignal, createResource } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { QuestionMap } from "../components/Map";
import { Coordinate } from "../types";
import { Button, PrimaryButton, ButtonRow } from "../components/Button";
import { isPointInPolygon } from "../isPointInPolygon";

const fetchQuestion = async () => {
  const response = await fetch(`http://localhost:8082/questions`);
  return response.json();
};

export const QuestionView = () => {
  const navigate = useNavigate();
  const [state, setState] = createSignal<"select" | "answer">("select");
  const [response, setResponse] = createSignal<Coordinate | null>(null);
  const [questionIndex, setQuestionIndex] = createSignal(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = createSignal<boolean | null>(
    null,
  );
  const [questions] = createResource("some-id", fetchQuestion);

  const currentQuestion = () => questions()[questionIndex()];
  const answerPolygon = () =>
    isAnswerCorrect() === false ? JSON.parse(currentQuestion().answer) : null;
  const checkAnswer = () => {
    setIsAnswerCorrect(
      isPointInPolygon(response(), JSON.parse(currentQuestion().answer)),
    );
    setState("answer");
  };
  const nextQuestion = () => {
    const lastQuestion = questionIndex() === questions().length - 1;
    if (lastQuestion) {
      navigate("/congrats");
    }
    setResponse(null);
    setIsAnswerCorrect(null);
    setQuestionIndex((value) => value + 1);
    setState("select");
  };

  return (
    <Wrapper>
      <h1>
        <Show when={questions.loading}>
          &nbsp;{/* This exists to prevent page movement*/}
        </Show>
        <Show when={questions.error}>Something went wrong :’(</Show>
        <Show when={!questions.loading && currentQuestion()}>
          Where is {currentQuestion().subject}?
        </Show>
      </h1>
      <Result correct={isAnswerCorrect()}>
        <QuestionMap
          state={state}
          setLocation={setResponse}
          answerPolygon={answerPolygon}
        />
        <ButtonRow>
          <Button onClick={() => navigate("/")}>Give up</Button>
          <Show when={isAnswerCorrect() === null}>
            <PrimaryButton disabled={!response()} onClick={checkAnswer}>
              Check
            </PrimaryButton>
          </Show>
          <Show when={isAnswerCorrect() !== null}>
            <PrimaryButton onClick={nextQuestion}>Next</PrimaryButton>
          </Show>
        </ButtonRow>
        <Show when={isAnswerCorrect() !== null} fallback={<p>&nbsp;</p>}>
          <p>{isAnswerCorrect() ? "That was correct" : "That was incorrect"}</p>
        </Show>
      </Result>
    </Wrapper>
  );
};

const Result = styled("div")`
  margin: -8px;
  padding: 8px;
  background-color: ${(props) =>
    props.correct
      ? "#366846"
      : props.correct == false
        ? "#762A27"
        : "transparent"};
  border-radius: 8px;
`;

const Wrapper = styled("div")(`
  width: 600px;
  min-height: 700px;
`);
