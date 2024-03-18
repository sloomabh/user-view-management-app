import { createSlice } from "@reduxjs/toolkit";
import { roles as initialRols } from "../../db/dbn.json";
import { Role } from "../../types/Role";
import { nanoid } from "@reduxjs/toolkit";
import loadFromLocalStorage from "../../utils/localStorageUtils";

type roleSlicerType = {
  data?: Role[];
  loading?: boolean;
};

const initialState: roleSlicerType = {
  data: loadFromLocalStorage("roles", initialRols),
};

const rolesSlicer = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRole: (state, action) => {
      const { name, description } = action.payload;
      const newRole = {
        id: nanoid(),
        name,
        description,
      };
      state.data?.push(newRole);
      // Save state to localStorage
      localStorage.setItem("roles", JSON.stringify(state.data));
    },

    updateRole: (state, action) => {
      const { id, ...updatedRole } = action.payload;
      const roleIndex = state.data?.findIndex((role) => role.id === id);
      if (roleIndex !== -1) {
        state.data[roleIndex] = { ...state.data[roleIndex], ...updatedRole };
      }
      localStorage.setItem("roles", JSON.stringify(state.data));
    },

    deleteRole: (state, action) => {
      const roleIdToDelete: string = action.payload;
      state.data = state.data?.filter((role) => role.id !== roleIdToDelete);
      localStorage.setItem("roles", JSON.stringify(state.data));
    },
  },
});
export const { addRole, updateRole, deleteRole } = rolesSlicer.actions;
export const rolesReducer = rolesSlicer.reducer;
