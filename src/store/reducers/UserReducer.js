import { SET_CURRENT_USER_INFO } from "../types";

const initialState = {
  currentUser: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_INFO: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
