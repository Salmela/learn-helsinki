import { Router, Route } from "@solidjs/router";
import { WelcomeView } from './WelcomeView'
import { QuestionView } from './QuestionView'

const App = () => {
  return (
    <Router>
      <Route path="/" component={WelcomeView} />
      <Route path="/question" component={QuestionView} />
    </Router>
  )
}

export default App
