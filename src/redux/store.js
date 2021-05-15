import { createStore } from "redux";

import { App } from "./reducers";

let store = createStore(App);

export default store;
