import { ADD_METADATA_TO_CACHE } from "../types";

const initialState = {
  metadata: [],
};

const limit = 100;

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_METADATA_TO_CACHE: {
      const foundIndex = state.metadata.findIndex(
        (e) => e.tokenId.toString() === action.payload.tokenId.toString()
      );
      if (foundIndex >= 0) {
        return state;
      }
      const data = [].concat(state.metadata);
      data.push(action.payload);
      return {
        metadata: data.slice(-limit),
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
