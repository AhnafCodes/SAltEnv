import { define, html, ref, render } from "../../web_modules/heresy.js";
import { addState } from "../utils/webcomponent-state.js";

const getNextAllowedColors = {
  red: {
    red: false,
    green: true,
    yellow: true
  },
  yellow: {
    red: true,
    green: true,
    yellow: false
  },
  green: {
    red: true,
    green: false,
    yellow: true
  }
};

class ControlledPlayground extends HTMLDivElement {
  constructor() {
    super();
    this.refs = {};
    this.refs.controls = ref();
  }

  // the only mandatory static field
  static get tagName() {
    return "div";
  }

  oninit() {
    if (this.setState == undefined) {
      //this part can go in set props if you are deducing state from props
      const initialState = {
        controlsState: { red: true, yellow: true, green: false },
        play: "green"
      };
      addState(initialState, this);
    }
    this.addEventListener("click", e => {
      const target = e.target;
      if (
        target &&
        target.parentElement &&
        target.parentElement.isSameNode(this.refs.controls.current)
      ) {
        changeColor(target.className);
      }
    });
    const changeColor = color => {
      const controlsState = getNextAllowedColors[color];
      this.setState({
        controlsState: controlsState,
        play: color
      });
    };
  }

  set props(props) {
    this._props = props || {};
  }

  get props() {
    return this._props;
  }

  renderControls() {
    const controlsState = this.getState().controlsState;
    return Object.keys(controlsState).map(controlState =>
      controlsState[controlState]
        ? html`
            <button class=${controlState}>${controlState}</button>
          `
        : html``
    );
  }
  render() {
    this.html`<div class="controls" ref=${this.refs.controls}>
                      ${this.renderControls()}
                  </div>
                  <div class="playground" style="background:${
                    this.getState().play
                  }; height:100px; width:100px">

                  </div>`;
  }
}

define(ControlledPlayground);

render(
  document.getElementById("test"),
  html`
    <ControlledPlayground />
  `
);
