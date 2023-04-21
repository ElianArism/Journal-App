import { Navigate, Route, Routes } from "react-router-dom";
import { CheckingAuth } from "../UI/components/CheckingAuth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCkeckAuth } from "../hooks/useCkeckAuth";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter = () => {
  const { status } = useCkeckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {/* Login */}

      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
