import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "./layouts/root-layout";
import WelcomePage from "./pages";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<WelcomePage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
