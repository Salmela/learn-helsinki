import { styled } from "solid-styled-components";
import { createSignal, createResource } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { QuestionMap, Coordinate } from "../components/Map";
import { Button, PrimaryButton, ButtonRow } from "../components/Button";

const pointInPolygon = (location: Coordinate | null, polygon: Coordinate[]) => {
  // Cast ray to the right from the location and check if it hits any polygon lines
  let intersections = 0;
  if (!location) return false;

  for (
    let previous = polygon.length - 1, next = 0;
    next < polygon.length;
    previous = next++
  ) {
    const start = polygon[previous];
    const end = polygon[next];
    // Check if [start,end] line is left or right side of checked location
    if (start.lat <= location.lat == location.lat < end.lat) {
      const lineIntersectionPoint =
        (location.lat - start.lat) / (end.lat - start.lat);
      const lineIntersectionLng =
        lineIntersectionPoint * (end.lng - start.lng) + start.lng;

      // Check that the intersection of ray and the edge is on the right
      if (location.lng < lineIntersectionLng) {
        intersections++;
      }
    }
  }

  return intersections % 2 == 1;
};

const fetchQuestion = async () => {
  const response = await fetch(`http://localhost:8082/questions`);
  return response.json();
};

export const QuestionView = () => {
  const navigate = useNavigate();
  const [response, setResponse] = createSignal<Coordinate | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = createSignal<boolean | null>(null);
  const [question, {refetch: refetchQuestion}] = createResource("some-id", fetchQuestion);

  const checkAnswer = () => {
    setIsAnswerCorrect(pointInPolygon(response(), JSON.parse(question().answer)));
  };
  const nextQuestion = () => {
    setResponse(null);
    setIsAnswerCorrect(null);
    refetchQuestion();
  };
  return (
    <Wrapper>
      <h1>
        <Show when={question.loading}>
          &nbsp;{/* This exists to prevent page movememnt*/}
        </Show>
        <Show when={question.error}>
          Internal error
        </Show>
        <Show when={!question.loading && question()}>
          Where is {question().subject}?
        </Show>
      </h1>
      <Result correct={isAnswerCorrect()}>
        <QuestionMap setLocation={setResponse} />
        <ButtonRow>
          <Button onClick={() => navigate("/")}>Give up</Button>
          <Show when={isAnswerCorrect() === null}>
            <PrimaryButton
              disabled={!response()}
              onClick={checkAnswer}
            >
              Check
            </PrimaryButton>
          </Show>
          <Show when={isAnswerCorrect() !== null}>
            <PrimaryButton onClick={nextQuestion}>
              Next
            </PrimaryButton>
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
  background-color: ${(props) => props.correct ? "#366846" : props.correct == false ? "#762A27" : 'transparent'};
  border-radius: 8px;
`;

const Wrapper = styled("div")(`
  width: 600px;
`);
