
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";
import PrivateRoute from "./routes/PrivateRoute";
import NavBar from "./components/NavBar";
import { useAuth } from "./context/AuthContext";
function App() {
    const {user} =useAuth();
    return (
        <>
            {user && <NavBar />}
        <Routes>
            {/* Always redirect home to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />

            <Route
                path="/add-task"
                element={
                    <PrivateRoute>
                        <AddTask />
                    </PrivateRoute>
                }
            />
            <Route
                path="/tasks/:id"
                element={
                    <PrivateRoute>
                        <TaskDetail />
                    </PrivateRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
            </>
    );
}

export default App;