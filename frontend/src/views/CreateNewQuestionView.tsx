import { useNavigate } from "@solidjs/router";
import { CreateQuestionMap } from "../components/Map";

export const CreateNewQuestionView = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Create new question</h1>
      <input type="text" placeholder="Question text" />
      <CreateQuestionMap />
      <div class="card">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => alert("Correct or not correct? Who knows?")}>
          Create
        </button>
      </div>
    </>
  );
};
