export const addState  = (State, self) => ((State={}, self) => {
    self.setState = (newState, callback, shouldRender=true) => {
        State = { ...State, ...newState };
        return shouldRender && ((render, callback) => {
            render && render();
            callback && callback();
        })(() => self.render(),callback);
    };
    self.getState = () => ({ ...State});
})(State, self);