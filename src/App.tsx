import { Routes, Route, Navigate } from "react-router-dom";

import { getTokenFromStorage } from "@/lib/get-token-from-storage";
import CreateCase from "@/pages/create-case/CreateCase";
import MainScreen from "@/pages/mainscreen/MainScreen";
import SignIn from "@/pages/sign-in/SignIn";
import SignUp from "@/pages/sign-up/SignUp";
import { useAuthRedirect } from "@/shared/hooks/UseAuthRedirect";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getTokenFromStorage();
  useAuthRedirect();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const token = getTokenFromStorage();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <SignIn />
          </GuestRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        }
      />
      <Route
        index
        element={
          <ProtectedRoute>
            <MainScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="createCase"
        element={
          <ProtectedRoute>
            <CreateCase />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
