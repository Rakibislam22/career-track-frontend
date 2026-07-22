import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import DashboardLayout from "../layouts/DashboardLayout";
import ApplicationFormPage from "../pages/ApplicationFormPage";
import ApplicationsPage from "../pages/ApplicationsPage";
import ApplicationDetailsPage from "../pages/ApplicationDetailsPage";
import PrivateRoute from "./PrivateRoute";


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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: "",
                element: <DashboardPage></DashboardPage>
            },
            {
                path: "application/new",
                element: <ApplicationFormPage></ApplicationFormPage>
            },
            {
                path: "applications",
                element: <ApplicationsPage></ApplicationsPage>
            },
            {
                path: "application/:id",
                element: <ApplicationDetailsPage></ApplicationDetailsPage>
            },
            {
                path: "application/:id/edit",
                element: <ApplicationFormPage></ApplicationFormPage>
            }

        ],
    }

]);

export default router;