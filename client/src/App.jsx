import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import ItemDetailsPage from './pages/ItemDetailsPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UpdatePage from './pages/UpdatePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/update" element={<UpdatePage />} />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}