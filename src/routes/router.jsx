import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplicationFormPage from "../pages/ApplicationFormPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage></LandingPage>,
    }, {
        path: "login",
        element: <LoginPage></LoginPage>
    },
    {
        path: "register",
        element: <RegisterPage></RegisterPage>
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "",
                element: <DashboardPage></DashboardPage>
            },
            {
                path: "applications/new",
                element: <ApplicationFormPage></ApplicationFormPage>
            },
            
        ],
    }
    
]);

export default router;