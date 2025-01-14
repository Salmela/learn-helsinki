import { styled } from "solid-styled-components";

export const Button = styled("button")(`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: color-mix(in hsl, var(--primary-color), var(--dark-color) 95%);
  cursor: pointer;
  transition: border-color, background-color 0.25s;
  border-color: var(--dark-color);

  &:hover:not(:disabled) {
    background: color-mix(in hsl, var(--primary-color), var(--dark-color) 90%);
    border-color: color-mix(in hsl, var(--primary-color), var(--dark-color) 50%);
  }
  &:disabled {
    cursor: initial;
    border-color: color-mix(in hsl, var(--primary-color), var(--dark-color) 80%) !important;
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`);

export const PrimaryButton = styled(Button)(`
  &:not(:disabled) {
    background-color: color-mix(in hsl, var(--primary-color), var(--dark-color) 10%);
    color: var(--dark-color);
    border: none;
    &:hover {
      background: var(--primary-color);
    }
  }
`);

export const ButtonRow = styled("div")(`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`);
