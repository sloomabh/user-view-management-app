import { createSlice } from "@reduxjs/toolkit";
import { users as initialUsers } from "../../db/dbn.json";
import { User } from "../../types/User";
import { nanoid } from "@reduxjs/toolkit";
import loadFromLocalStorage from "../../utils/localStorageUtils";

type userSlicerType = {
  data: User[];
  isLogged: boolean;
  LoggedUser: User | null;
};

const initialState: userSlicerType = {
  data: loadFromLocalStorage("users", initialUsers),
  isLogged: loadFromLocalStorage("isLogged", false),
  LoggedUser: loadFromLocalStorage("LoggedUser", null),
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { id, name, email, mobile, address } = action.payload;

      const newUser = {
        id,
        name,
        email,
        mobile,
        address,
      };
      state.data.push(newUser);

      // Save state to localStorage
      localStorage.setItem("users", JSON.stringify(state.data));
    },

    updateUser: (state, action) => {
      const { id, ...updatedUser } = action.payload;
      const userIndex = state.data.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.data[userIndex] = { ...state.data[userIndex], ...updatedUser };
      }
      localStorage.setItem("users", JSON.stringify(state.data));
    },

    deleteUser: (state, action) => {
      const userIdToDelete: string = action.payload;
      state.data = state.data.filter((user) => user.id !== userIdToDelete);
      localStorage.setItem("users", JSON.stringify(state.data));
    },

    signInUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.data.find((user) => user.email === email);
      if (user && user.password === password) {
        state.isLogged = true;
        state.LoggedUser = user;
        localStorage.setItem("isLogged", JSON.stringify(true));
        localStorage.setItem("LoggedUser", JSON.stringify(user));
      }
    },

    signOutUser: (state) => {
      state.isLogged = false;
      state.LoggedUser = null;
      localStorage.setItem("isLogged", JSON.stringify(false));
      localStorage.removeItem("LoggedUser");
    },
    signUpUser: (state, action) => {
      const { name, email, password } = action.payload;

      const newUser = {
        id: nanoid(),
        name,
        email,
        password,
      };
      state.data.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.data));
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  signInUser,
  signUpUser,
  signOutUser,
} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
