import { styled } from "solid-styled-components";
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { CreateQuestionMap, Coordinate } from "../components/Map";
import { Button, PrimaryButton, ButtonRow } from "../components/Button";
import { TextInput } from "../components/Input";

export const CreateNewQuestionView = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = createSignal("");
  const [polygon, setPolygon] = createSignal<Coordinate[]>([]);

  const createQuestion = async () => {
    const response = fetch("http://localhost:8082/questions", {
      method: "POST",
      body: JSON.stringify({
        type: "where",
        subject: subject(),
        // TODO I would prefer not to stringify here, but I haven't figured how to handle arbitrary json in go
        answer: JSON.stringify(polygon()),
      }),
    });
    response
      .then(() => alert("The new question is saved"))
      .catch(() => alert("Server error happened"));
  };
  return (
    <div>
      <h1>Create new question</h1>
      <FullWidthInput
        type="text"
        placeholder="Name of the place"
        value={subject()}
        onInput={(event) => setSubject(event.target.value)}
      />
      <h2>The answer</h2>
      <CreateQuestionMap setPolygon={setPolygon} />
      <ButtonRow>
        <Button onClick={() => navigate("/")}>Back</Button>
        <PrimaryButton disabled={!polygon()} onClick={createQuestion}>
          Create
        </PrimaryButton>
      </ButtonRow>
    </div>
  );
};

const FullWidthInput = styled(TextInput)(`
  width: 100%;
`);
