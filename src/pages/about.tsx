import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";

function AboutPage() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center w-full space-y-8">
            <div>
                <img
                    className="ml-auto mr-auto rounded-full"
                    src="/images/cat.jpeg"
                    alt="Cat image"
                    width={256}
                    height={256}
                />
            </div>

            <p className="text-2xl">
                This tauri-react-redis-template was crafted with love{" "}
                <span>&#10084;</span> by{" "}
                <a
                    href="https://github.com/jekigates"
                    target="_blank"
                    rel="noreferrer"
                >
                    <b className="text-[#ff304f]">Jeki Gates (JK)</b>
                </a>
            </p>

            <div className="grid grid-cols-2 gap-6">
                <Link to="/" className={buttonVariants()}>
                    Back To Home Page
                </Link>

                <a
                    href="https://github.com/jekigates/tauri-react-redis-template.git"
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({
                        variant: "secondary",
                    })}
                >
                    Download Template
                </a>
            </div>
        </div>
    );
}

export default AboutPage;
