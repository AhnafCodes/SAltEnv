import { html } from "../web_modules/lighterhtml.js";

export const renderListDOMNode = (list) => html.node`
  <ul>
    ${list.map(
      (text) => html.node`
        <li>${text}</li>
      `
    )}
  </ul>
`;

// all it takes to have components with lighterhtml
const Greet = (name) =>
  html.node`
    <p>Hello ${name}!</p>
  `;
const GreetOld = (name) => html` <p>Hello ${name}!</p> `;
// for demo purpose, check in console keyed updates

export const Greetings = (names) =>
  html.node`
    ${names.map(Greet)}
  `;
export const GreetingsOld = (names) =>
  html.node`
    ${names.map(GreetOld)}
  `;
