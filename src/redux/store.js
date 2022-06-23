import { legacy_createStore as createStore, applyMiddleware } from "redux";

//引入支持异步acton
import thunk from "redux-thunk";
//引入开发者工具
import { composeWithDevTools } from "redux-devtools-extension";
import Reducer from "./reducer";
// 这里为reduces文件这里还没说往下看;
export default createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
