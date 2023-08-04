import { useReducer } from "react";

export const initialState = {
  formData: {},
};

export const reducer = (state:any, action:any) => {
  switch (action.type) {
    case "SUBMIT_FORM":
      return {
        ...state,
        formData: action.formData,
      };
    default:
      return state;
  }
};