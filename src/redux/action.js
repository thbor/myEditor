import {
  SET_UI,
  SET_FULL_SCREEN,
  SET_SAVE_JSON,
} from "./constans";

/**
 * @description 设置ui
 * @param {string} UI 模板
 */
export const setUI = (UI) => {
  return {
    type: SET_UI,
    UI,
  };
};

export const setFullScreen=(fullScreen)=>{
 return {
    type: SET_FULL_SCREEN,
    fullScreen,
  };
}

export const setSaveJson=(json)=>{
  return {
     type: SET_SAVE_JSON,
     json,
   };
 }

