import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Importar PropTypes
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import RegisterTest from "./pages/RegisterTest";
import ResultTest from "./pages/ResultTest";
import CreateTest from "./pages/CreateTest";
import ListTests from "./pages/ListTests";
import SubmitTestResponse from "./pages/SubmitTestResponse";
import AnalyzeTest from "./pages/AnalyzeTest";

// Componente para proteger rotas
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
};

// Validação das props do PrivateRoute
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

// Componente para proteger rotas com base no perfil
const PrivateRouteWithRole = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const perfil = localStorage.getItem("perfil");

    if (!token) return <Navigate to="/" />;
    if (!allowedRoles.includes(perfil)) return <Navigate to="/dashboard" />;

    return children;
};

// Validação das props do PrivateRouteWithRole
PrivateRouteWithRole.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Rota pública */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Rotas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/register-test"
                    element={
                        <PrivateRouteWithRole allowedRoles={["analista"]}>
                            <RegisterTest />
                        </PrivateRouteWithRole>
                    }
                />
                <Route
                    path="/create-test"
                    element={
                        <PrivateRouteWithRole allowedRoles={["analista"]}>
                            <CreateTest />
                        </PrivateRouteWithRole>
                    }
                />
                <Route
                    path="/list-tests"
                    element={
                        <PrivateRouteWithRole allowedRoles={["produtor", "analista"]}>
                            <ListTests />
                        </PrivateRouteWithRole>
                    }
                />
                <Route
                    path="/submit-response"
                    element={
                        <PrivateRouteWithRole allowedRoles={["julgador"]}>
                            <SubmitTestResponse />
                        </PrivateRouteWithRole>
                    }
                />
                <Route
                    path="/analyze-test"
                    element={
                        <PrivateRouteWithRole allowedRoles={["analista"]}>
                            <AnalyzeTest />
                        </PrivateRouteWithRole>
                    }
                />
                <Route
                    path="/test/result"
                    element={
                        <PrivateRouteWithRole allowedRoles={["analista", "produtor"]}>
                            <ResultTest />
                        </PrivateRouteWithRole>
                    }
                />

                {/* Rota curinga */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
