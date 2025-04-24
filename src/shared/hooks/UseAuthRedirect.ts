import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/entites/Auth/store/AuthStore";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);
};
