import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slicers/user";
import { rolesReducer } from "./slicers/role";
import { userRoleReducer } from "./slicers/userRole";

const rootReducer = combineReducers({
  users: usersReducer,
  roles: rolesReducer,
  userRoles: userRoleReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
