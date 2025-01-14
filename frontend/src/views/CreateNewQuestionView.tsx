import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { CreateQuestionMap, Coordinate } from "../components/Map";

export const CreateNewQuestionView = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = createSignal("");
  const [polygon, setPolygon] = createSignal<Coordinate[]>([]);

  const createQuestion = async () => {
    console.log(polygon);
    const response = fetch("http://localhost:8082/questions", {
      method: "POST",
      body: JSON.stringify({
        type: "where",
        subject: subject(),
        // TODO I would prefer not to stringify here, but I haven't figured how to handle arbitrary json in go
        answer: JSON.stringify(polygon()),
      }),
    });
    response.then(() => alert("The new question is saved")).catch(() => alert("Server error happened"));
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
