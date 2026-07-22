import { createBrowserRouter } from "react-router";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";


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
    
]);

export default router;