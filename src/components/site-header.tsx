/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { MenuIcon, Ratio } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function SiteHeader() {
    return (
        <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 absolute top-0 left-0 z-10 bg-background">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link to="/" className="mr-6 hidden lg:flex">
                        <Ratio className="h-6 w-6" />
                        <span className="sr-only">JK</span>
                    </Link>
                    <div className="grid gap-2 py-6">
                        <Link
                            to="/"
                            className="flex w-full items-center py-2 text-lg font-semibold"
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="flex w-full items-center py-2 text-lg font-semibold"
                        >
                            About
                        </Link>
                        <ModeToggle />
                    </div>
                </SheetContent>
            </Sheet>
            <Link to="/" className="mr-6 hidden lg:flex">
                <Ratio className="h-6 w-6" />
                <span className="sr-only">JK</span>
            </Link>
            <nav className="ml-auto hidden lg:flex gap-6">
                <Link
                    to="/"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                >
                    About
                </Link>
                <ModeToggle />
            </nav>
        </header>
    );
}
