import { combineReducers } from "redux";

//import reducers
import WalletReducer from "./WalletReducer";
import UserReducer from "./UserReducer";
import MetadataCacheReducer from "./MetadataCacheReducer";

export default combineReducers({
  wallets: WalletReducer,
  users: UserReducer,
  cachedMetadata: MetadataCacheReducer,
});
