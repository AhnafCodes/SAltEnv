import { define } from "../web_modules/heresy.js";
export const Greet = {
  name: "Greet",
  extends: "div", // will extends li constructor
  render() {
    this.html`Hi  ${this.props.name}`;
  },
};
define(Greet);
