import { create } from "zustand";

import { removeTokenFromStorage } from "@/lib/get-token-from-storage";

type AuthStore = {
  token: string | null;
  setToken: (token: string | null, storageType: string) => void;
  clearToken: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: localStorage.getItem("token"),
  setToken: (token, storageType) => {
    if (storageType === "local") {
      localStorage.setItem("token", token || "");
    } else {
      sessionStorage.setItem("token", token || "");
    }
    set({ token });
  },
  clearToken: () => {
    removeTokenFromStorage();
    set({ token: null });
  },
}));
