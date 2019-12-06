import {define, html, ref, render} from "../../web_modules/heresy.js";
import classnames from "../../web_modules/classnames-es.js";

const nextAllowedExpressionElements = {
    group: {and: true, or: true, group: false, not: false, value: false},
    or: {and: false, or: false, group: true, not: true, value: true},
    and: {and: false, or: false, group: true, not: true, value: true},
    not: {and: false, or: false, group: true, not: false, value: true},
    value:{and: true, or: true, group: false, not: true, value: false}
};

const getFragment = value  => {
    return  html`<span class=${value}>${value}</span>`;
}
const getValueFragment =  value  => {
    return  html`<div class="letter">  ( <span class=${value}>${value}</span> )</div>`;
}
const controls = {
    and: html`<button class="and">[.AND.]</button>`,
    or: html`<button class="or">.]OR[.</button>`,
    group: html`<button class="group">[]</button>`,
    not: html`<button class="not">NOT</button>`
};


class FilterComposer extends HTMLDivElement {
    constructor() {
        super();
        this.refs = {};
        this.refs.controls = ref()
        this.refs.playground = ref()
    }

    // the only mandatory static field
    static get tagName() {
        return 'div';
    }

    oninit() {
        this.addEventListener('click', (e) => {
            const target = e.target;
            if (target.parentElement && target.parentElement.isSameNode(this.refs.controls.current)) {
                addElement(target.className)
            }
        })
        this.addEventListener("dragover", this.ondragover, true);
        this.addEventListener("drop", this.ondrop, true);
        const addElement = (elementTypeName) => {
            const { and, or, group, not, value } = nextAllowedExpressionElements[elementTypeName];
            this.setState({
                expressionState: [...this.getState().expressionState, elementTypeName],
                controlsState: { and, or, group, not },
                isValueAllowedExpression: value
            });
        }
    }
    ondragover(ev) {
        console.log("dragOver:");
        console.log(ev);
        ev.preventDefault();


        // Set the dropEffect to move

    }
    ondrop(ev) {
        ev.preventDefault();
        console.log(ev);
        let target = ev.target;
        const isTargetFilterComposer = target.classList.contains('filter-composer');
        if(!isTargetFilterComposer) {
            target = target.closest('.filter-composer');
            if(target == null) {
                return
            }
        }
        const targetState = target.getState();
        if(ev.dataTransfer && targetState.isValueAllowedExpression) {

             target.setState({
                expressionState: [...targetState.expressionState, ev.dataTransfer.getData('text')],
                controlsState: { and: true, or:true, group:false, not:false },
                isValueAllowedExpression: false
            });
            ev.stopPropagation();
        }
    }
    set props(props) {
        this._props = props || {};
        this.props.isOdd = this.props.isOdd || false;
        let State = {
            controlsState: { and: false, or: false, group: true, not: true },
            expressionState: [],
            isValueAllowedExpression: true
        };
        this.setState = (newState, callback) => {
            State = { ...State, ...newState };

            return (() => {
                if (callback) {
                    this.render();
                    callback()
                } else {
                    this.render();
                }
            })() };
        this.getState = () =>{
        return({ ...State })
        };

    }

    get props() {
        return this._props;
    }

    renderExpression() {
        const expressionState = this.getState().expressionState;
        return expressionState.map(expressionElement => {
            const addOfType = {
                "and": getFragment("and"),
                "or": getFragment("or"),
                "group": html`<FilterComposer props=${{ isOdd: !this.props.isOdd }} />`,
                "not": getFragment("not")
            };
            return addOfType[expressionElement] || getValueFragment(expressionElement);
        });
    }

    renderControls() {
        const controlsState = this.getState().controlsState;
        const controlsList = [];
        Object.keys(controlsState).forEach(controlState => controlsState[controlState] && controlsList.push(controls[controlState]));
        return controlsList;
    }

    render() {
        const { classNames="" } = this.props;
        this.setAttribute('class', classnames([classNames, "filter-composer",{ odd : this.props.isOdd }]));

        this.html`<div class="controls" ref=${this.refs.controls}>
                      ${this.renderControls()} 
                  </div>
                  <div class="playground" ref=${this.refs.playground} >
                      ${this.renderExpression()}
                  </div>`;

    }
}

define(FilterComposer);
export default FilterComposer;