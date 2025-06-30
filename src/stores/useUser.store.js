// stores/userStore.js

import { create } from "zustand";

const initialState = {
  user: null,
  auth: null,
};

const actions = (set) => ({
  login: (userData) => {
    localStorage.setItem("Authorization", userData.token);
    set({ user: userData, auth: true });
  },
  logout: () => {
    localStorage.removeItem("Authorization");
    set({ user: null, auth: false });
  },
});

const getters = (_, get) => ({
  isLoggedIn: () => !!get().auth,
});

export const useUserStore = create((set, get) => ({
  ...initialState,
  ...actions(set, get),
  ...getters(set, get),
}));
