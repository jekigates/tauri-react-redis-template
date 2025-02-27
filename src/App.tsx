import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiResponse<T> {
    status: "success" | "error";
    data: T | null;
    message: string | null;
}

interface Post {
    id: number;
    title: string;
    text: string;
}

function App() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        setGreetMsg(await invoke("greet", { name }));
    }

    async function get_all_posts() {
        try {
            const response = await invoke<ApiResponse<Post[]>>("get_all_posts");

            console.log(response);
            if (response.status === "error") {
                console.error("Error:", response.message);
            } else {
                console.log("Fetched posts:", response.data);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    async function checkRedisConnection() {
        try {
            const response: ApiResponse<string> = await invoke(
                "check_redis_connection"
            );

            if (response.status === "error") {
                console.error("Redis Error:", response.message);
            } else {
                console.log("✅ Redis Status:", response.data);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    return (
        <main>
            <h1>Welcome to Tauri + React</h1>

            <p>Click on the Tauri, Vite, and React logos to learn more.</p>
            <Button variant="destructive" onClick={get_all_posts}>
                Get All Users
            </Button>

            <form
                className="row"
                onSubmit={(e) => {
                    e.preventDefault();
                    greet();
                }}
            >
                <Input
                    id="greet-input"
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a name..."
                />
                <Button type="submit">Greet</Button>
            </form>
            <p>{greetMsg}</p>

            <Button variant="outline" onClick={checkRedisConnection}>
                Check Redis Connection
            </Button>
        </main>
    );
}

export default App;
