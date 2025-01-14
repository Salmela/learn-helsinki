import { styled } from "solid-styled-components";

export const TextInput = styled("input")(`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #000;
  transition: border-color 0.25s;

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: var(--primary-color);
  }
`);
