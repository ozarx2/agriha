import { createStore } from "redux";

const initialState = {
  acccessToken: "",
  refreshToken: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return {
        ...state,
        acccessToken: action.payload.accssToken,
        refreshToken: action.payload.rfrshToken,
      };
    default:
      return state;
  }
};

export default createStore(rootReducer);
