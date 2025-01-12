import { Router, Route } from "@solidjs/router";
import { WelcomeView } from "./views/WelcomeView";
import { QuestionView } from "./views/QuestionView";
import { CreateNewQuestionView } from "./views/CreateNewQuestionView";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Route path="/" component={WelcomeView} />
      <Route path="/question" component={QuestionView} />
      <Route path="/new_question" component={CreateNewQuestionView} />
    </Router>
  );
};

export default App;
