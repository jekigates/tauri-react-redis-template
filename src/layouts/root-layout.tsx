import SiteHeader from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router";

function RootLayout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SiteHeader />
            <div className="relative flex min-h-svh flex-col bg-background">
                <Outlet />
            </div>
        </ThemeProvider>
    );
}

export default RootLayout;
