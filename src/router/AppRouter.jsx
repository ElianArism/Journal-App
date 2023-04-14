import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CheckingAuth } from "../UI/components/CheckingAuth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {/* Login */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      {/* Journal */}
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};
