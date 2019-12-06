import { html, render } from "./web_modules/lighterhtml.js";
import { html as HTML, render as Render } from "./web_modules/heresy.js";
import { Greetings, GreetingsOld, renderListDOMNode  } from "./src/lighterHTML-example.js";
import { Greet  } from "./src/heresy-example.js";
import { test } from "./src/test.js";
import { React, ReactDOM } from "https://unpkg.com/es-react";
import htm from 'https://unpkg.com/htm?module';
		const reacthtml = htm.bind(React.createElement);



//this thing actually works
test()


//lighterHTML
const list1 = ["Hello", 1 ];

const list2 = ["egg", "<b>Bread</b>", "Coffee" ];

const list3 = ["Hello", '<b>Sam</b>'];

const list4 = ["Hello", html`<b>Sam</b>`];

document.querySelector('.app').append(renderListDOMNode(list1));
document.querySelector('.app').append(renderListDOMNode(list2));

document.querySelector('.app').append(renderListDOMNode(list3));
document.querySelector('.app').append(renderListDOMNode(list4));


const folks = ["John","Baba", "Jane"]

render(document.querySelector('.app'), Greetings(folks));
Render(document.querySelector('.app2'), HTML`<Greet props=${{name: "Abdul"}} />`)





//Some comparsions


console.group("React");
console.log("React component(instance) is object(function of its props and state):");
class HelloWorld extends React.Component {
    render() {
      return (
        reacthtml`<div>Hello World!</div>`
      )
    }
}
console.log(" React <HelloWorld /> :");
console.dir( reacthtml`<HelloWorld />`);
console.groupEnd();
console.group("lighterHTML");
console.log("But what does lighterHTML & Heresy's html`` give you ?");
console.log(" lighterHTML's html`` gives you:");
console.log(" const Greet = name => html`<p>Hello ${name}!</p>`; \n Greet(John)");
console.log( GreetingsOld(folks).firstChild);
console.log(" DocumentFragment!?, heard that before https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment")

console.log( " or a collection of them:")
console.dir(GreetingsOld(folks));
console.groupEnd();
console.group("Heresy");
//heresy
console.log("Hesery's html`` gives you:");
console.log(" html`<Greet props=${{name: 'Abdul'}} />`");
console.dir(HTML`<Greet props=${{name: "Abdul"}} />`);
console.groupEnd();


