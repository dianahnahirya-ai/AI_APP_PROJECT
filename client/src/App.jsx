import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import ParentLayout from './components/layout/ParentLayout';

// Parent Pages
import ParentLookup from './pages/parent/ParentLookup';
import ParentResults from './pages/parent/ParentResults';

// Auth
import AdminLogin from './pages/auth/AdminLogin';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminClasses from './pages/admin/AdminClasses';
import AdminSubjects from './pages/admin/AdminSubjects';
import AdminResults from './pages/admin/AdminResults';
import AdminSettings from './pages/admin/AdminSettings';

// Super Admin Pages
import SuperOverview from './pages/super/SuperOverview';
import SuperSchools from './pages/super/SuperSchools';

// Protected Route Component
const ProtectedRoute = ({ children, requireSuper }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/admin/login" />;
  if (requireSuper && user.role !== 'SUPER_ADMIN') return <Navigate to="/admin/dashboard" />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Parent Facing Routes */}
        <Route element={<ParentLayout />}>
          <Route path="/" element={<ParentLookup />} />
          <Route path="/results" element={<ParentResults />} />
        </Route>

        {/* Auth Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* School Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="classes" element={<AdminClasses />} />
          <Route path="subjects" element={<AdminSubjects />} />
          <Route path="results" element={<AdminResults />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Super Admin Routes */}
        <Route path="/super" element={
          <ProtectedRoute requireSuper={true}>
            <AdminLayout isSuperAdmin={true} />
          </ProtectedRoute>
        }>
          <Route path="overview" element={<SuperOverview />} />
          <Route path="schools" element={<SuperSchools />} />
          <Route index element={<Navigate to="/super/overview" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
