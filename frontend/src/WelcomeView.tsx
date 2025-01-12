import { useNavigate } from "@solidjs/router";
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'

export const WelcomeView = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Learn Helsinki</h1>
      <div class="card">
        <button onClick={() => navigate("/question")}>
          Are you ready
        </button>
        <button onClick={() => navigate("/new_question")}>
          Create new question
        </button>
      </div>
    </>
  )
}
