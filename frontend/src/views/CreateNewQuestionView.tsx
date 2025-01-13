import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { CreateQuestionMap, Coordinate } from "../components/Map";

export const CreateNewQuestionView = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = createSignal("");
  const [polygon, setPolygon] = createSignal<Coordinate[]>([]);

  const createQuestion = async () => {
    console.log(polygon);
    await fetch("http://localhost:8082/questions", {
      method: "POST",
      body: JSON.stringify({
        type: "where",
        subject: subject(),
        answer: polygon(),
      }),
    });
    alert("Correct or not correct? Who knows?");
  };
  return (
    <>
      <h1>Create new question</h1>
      <input
        type="text"
        placeholder="Question text"
        value={subject()}
        onInput={(event) => setSubject(event.target.value)}
      />
      <CreateQuestionMap setPolygon={setPolygon} />
      <input
        type="text"
        value={JSON.stringify(polygon().map((point) => [point.lat, point.lng]))}
      />
      <div class="card">
        <button onClick={() => navigate("/")}>Back</button>
        <button disabled={!polygon()} onClick={createQuestion}>
          Create
        </button>
      </div>
    </>
  );
};
