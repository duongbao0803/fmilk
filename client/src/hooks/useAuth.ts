import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthState } from "@/interfaces/interface";

const useAuth = create<AuthState>((set) => ({
  isAuthenticated: !!Cookies.get("accessToken"),
  login: () => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    sessionStorage.removeItem("keys");
    set({ isAuthenticated: false });
  },
}));

export default useAuth;
