import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import TestDashboard from "./pages/TestDashboard";

function App() {
    return (
        <Router>
            <Routes>
                {/* Rotas públicas para todas as páginas */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register-test" element={<RegisterTest />} />
                <Route path="/create-test" element={<CreateTest />} />
                <Route path="/list-tests" element={<ListTests />} />
                <Route path="/submit-response" element={<SubmitTestResponse />} />
                <Route path="/analyze-test" element={<AnalyzeTest />} />
                <Route path="/test/result" element={<ResultTest />} />
                <Route path="/test-dashboard" element={<TestDashboard />} />

                {/* Rota curinga para página 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
