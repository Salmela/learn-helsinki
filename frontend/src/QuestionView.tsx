import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import { Map } from './Map'
import './App.css'

export const QuestionView = () => {
  return (
    <>
      <h1>Where is Steissi?</h1>
      <Map />
      <div class="card">
        <button onClick={() => alert("Correct or not correct? Who knows?")}>
          Check
        </button>
      </div>
    </>
  )
}
