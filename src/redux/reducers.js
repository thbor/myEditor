import initalState from "./state";
import {
  SET_UI,
  SET_FULL_SCREEN,
} from "./constans";

export const App = (state = initalState, action) => {
  switch (action.type) {
    case SET_UI:
      return {
        ...state,
        UI:  action.UI ,
      };
    case SET_FULL_SCREEN:
      return {
        ...state,
        fullScreen:  action.fullScreen ,
      };
    default:
      return {
        ...state,
      };
  }
};
