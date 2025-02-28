// ✅ Reusable API Response Interface
export interface ApiResponse<T> {
    status: "success" | "error";
    data: T | null;
    message: string | null;
}

// ✅ Reusable Post Interface
export interface Post {
    id: number;
    title: string;
    text: string;
}
