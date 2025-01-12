import { useNavigate } from "@solidjs/router";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import { QuestionMap } from "./Map";
import "./App.css";

export const QuestionView = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Where is Steissi?</h1>
      <QuestionMap />
      <div class="card">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => alert("Correct or not correct? Who knows?")}>
          Check
        </button>
      </div>
    </>
  );
};
