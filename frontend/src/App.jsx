import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PetsPage from "./pages/pets/PetsPage";
import AddPetPage from "./pages/pets/AddPetPage";
import AdoptionsPage from "./pages/adoptions/AdoptionsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditPetPage from "./pages/pets/EditPetPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pets"
        element={
          <ProtectedRoute>
            <PetsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pets/add"
        element={
          <ProtectedRoute>
            <AddPetPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/adoptions"
        element={
          <ProtectedRoute>
            <AdoptionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pets/edit/:id"
        element={
          <ProtectedRoute>
            <EditPetPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;