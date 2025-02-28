import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import { PostForm } from "@/components/post-form";
import { Post, ApiResponse } from "@/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    async function fetchPosts() {
        try {
            const response = await invoke<ApiResponse<Post[]>>("get_all_posts");
            setPosts(response.data || []);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    async function createPost(title: string, text: string) {
        try {
            const response = await invoke<ApiResponse<Post>>("create_post", {
                payload: { title, text },
            });

            if (response.status === "error") {
                console.error("Error creating post:", response.message);
            } else {
                setPosts((prevPosts) => [...prevPosts, response.data!]);

                setEditingPost(null);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    async function updatePost(id: number, title: string, text: string) {
        try {
            const response = await invoke<ApiResponse<Post>>("update_post", {
                payload: { id, title, text },
            });

            if (response.status === "error") {
                console.error("Error updating post:", response.message);
            } else {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === id ? response.data! : post
                    )
                );

                setEditingPost(null);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    async function deletePost(id: number) {
        try {
            const response = await invoke<ApiResponse<null>>("delete_post", {
                payload: { id },
            });

            if (response.status === "error") {
                console.error("Error deleting post:", response.message);
            } else {
                console.log("Post deleted:", id);

                setPosts((prevPosts) =>
                    prevPosts.filter((post) => post.id !== id)
                );

                setEditingPost(null);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-xl flex-col gap-6">
                <PostForm
                    createPost={createPost}
                    updatePost={updatePost}
                    editingPost={editingPost}
                    setEditingPost={setEditingPost}
                />

                <Table>
                    <TableCaption>A list of your recent posts.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Text</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">
                                    {post.id}
                                </TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.text}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => setEditingPost(post)}
                                        >
                                            Edit
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive">
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you absolutely sure?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete your
                                                        account and remove your
                                                        data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            deletePost(post.id)
                                                        }
                                                    >
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default HomePage;
