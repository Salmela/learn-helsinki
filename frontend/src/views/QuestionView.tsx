import { useNavigate } from "@solidjs/router";
import { QuestionMap } from "../components/Map";

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
