import { html, render } from "../../web_modules/heresy.js";
import FilterComposer from "../widgets/filter-composer.js";
const LetterSpan = (letter) =>
  html` <li class="drag-item" draggable="true">${letter}</li> `;
const alphabetContainer = document.getElementById("alphabhets");

function dragstart_handler(ev) {
  console.log("dragstater:");
  console.log(ev);
  ev.dataTransfer.setData("text", ev.target.innerText);
  ev.dataTransfer.effectAllowed = "move";
}
render(
  alphabetContainer,
  html`
    ${[
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ].map(LetterSpan)}
  `
);
alphabetContainer.addEventListener("dragstart", dragstart_handler);

const renderExpression = () =>
  render(
    document.getElementById("expression"),
    html`${JSON.stringify(
      document.getElementById("expression-builder").getExpression(),
      2,
      2
    )}`
  );
render(
  document.getElementById("playground"),
  html`
    <FilterComposer
      id="expression-builder"
      props=${{ showExpression: true, stateChangeCallback: renderExpression }}
    />
  `
);
