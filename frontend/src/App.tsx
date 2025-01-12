import { Router, Route } from "@solidjs/router";
import { WelcomeView } from './WelcomeView'
import { QuestionView } from './QuestionView'
import { CreateNewQuestionView } from './CreateNewQuestionView'

const App = () => {
  return (
    <Router>
      <Route path="/" component={WelcomeView} />
      <Route path="/question" component={QuestionView} />
      <Route path="/new_question" component={CreateNewQuestionView} />
    </Router>
  )
}

export default App
