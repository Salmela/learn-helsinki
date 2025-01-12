import { useNavigate } from "@solidjs/router";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import { CreateQuestionMap } from "./Map";
import "./App.css";

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
