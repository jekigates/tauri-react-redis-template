"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { Post } from "@/types";

const formSchema = z.object({
    title: z.string().min(2).max(50),
    text: z.string().min(2).max(100),
});

interface PostFormProps {
    createPost: (title: string, text: string) => Promise<void>;
    updatePost: (id: number, title: string, text: string) => Promise<void>;
    editingPost: Post | null;
    setEditingPost: (post: Post | null) => void;
}

export function PostForm({
    createPost,
    updatePost,
    editingPost,
    setEditingPost,
}: PostFormProps) {
    const [isUpdate, setIsUpdate] = useState(false);

    const defaultValues = {
        title: "",
        text: "",
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    useEffect(() => {
        if (editingPost) {
            setIsUpdate(true);
            form.reset({
                title: editingPost.title,
                text: editingPost.text,
            });
        } else {
            setIsUpdate(false);
            form.reset(defaultValues);
        }
    }, [editingPost, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isUpdate && editingPost) {
            updatePost(editingPost.id, values.title, values.text);
            setEditingPost(null);
        } else {
            createPost(values.title, values.text);
        }

        form.reset();
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">
                    {isUpdate ? "Edit Post" : "Create New Post"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter post title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Text</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Type your text here."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-4">
                            <Button type="submit">
                                {isUpdate ? "Update" : "Save"}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setEditingPost(null);
                                    form.reset(defaultValues);
                                    setIsUpdate(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
