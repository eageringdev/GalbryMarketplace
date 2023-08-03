import { ADD_METADATA_TO_CACHE } from "../types";

export const addMetadataToCacheAction = (dispatch, data) => {
  dispatch({
    type: ADD_METADATA_TO_CACHE,
    payload: data,
  });
};
