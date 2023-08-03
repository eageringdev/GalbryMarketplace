import { configureStore } from "@reduxjs/toolkit";

// import reducer
import reducer from "./reducers";

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
