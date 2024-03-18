import { createSlice } from "@reduxjs/toolkit";
import { user_role as initialUsersRoles } from "../../db/dbn.json";

import loadFromLocalStorage from "../../utils/localStorageUtils";
import { UserRole } from "../../types/UserRole";

type userRoleSlicerType = {
  data: UserRole[];
};

const initialState: userRoleSlicerType = {
  data: loadFromLocalStorage("user_role", initialUsersRoles),
};
const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    deleteUserRoles: (state, action) => {
      state.data = state.data.filter(
        (userRole) => userRole.userId !== action.payload
      );
      localStorage.setItem("user_role", JSON.stringify(state.data));
    },
    deleteRoleUser: (state, action) => {
      state.data = state.data.filter(
        (roleUser) => roleUser.userId !== action.payload
      );
      localStorage.setItem("user_role", JSON.stringify(state.data));
    },
    addUserRoles: (state, action) => {
      const { userId, roleId } = action.payload;
      state.data.push({ userId, roleId });
      localStorage.setItem("user_role", JSON.stringify(state.data));
    },
    updateUserRoles(state, action) {
      const { userId, roleId } = action.payload;
      // Find the index of the userRole in the data array
      const index = state.data.findIndex((ur) => ur.userId === userId);
      // If the userRole exists, update its roleId
      if (index !== -1) {
        state.data[index].roleId = roleId;
      } else {
        // If not, add a new userRole
        state.data.push({ userId, roleId });
      }
      localStorage.setItem("user_role", JSON.stringify(state.data));
    },
  },
});

export const {
  deleteUserRoles,
  deleteRoleUser,
  addUserRoles,
  updateUserRoles,
} = userRoleSlice.actions;
export const userRoleReducer = userRoleSlice.reducer;
