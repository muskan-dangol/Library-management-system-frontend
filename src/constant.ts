import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const apiBaseUrl = "http://localhost:3000/api";

const isAuthenticated = !!localStorage.getItem("userToken");

export const useRedirectIfAuthenticated = (redirectTo = "/") => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);
};

export const useRedirectIfNotAuthenticated = (redirectTo = "/login") => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);
};
