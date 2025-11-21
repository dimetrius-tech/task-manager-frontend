"use client";

import React, {useRef, useState} from "react";
import { userAPI } from '@/lib/userAPI';
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

export const AvatarUploader: React.FC = () => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const {user, refreshUser} = useAuth();
    const [loading, setLoading] = useState(false);

    const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setLoading(true);

        try {
            await userAPI.uploadAvatar(file);
            await refreshUser();
        } catch(err) {
            toast(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center flex-col gap-4">
            <div>
                <Avatar className='w-24 h-24'>
                    <AvatarImage src={user?.avatarUrl} className="w-24 h-24 object-cover rounded-full" alt="@shadcn" />
                    <AvatarFallback className="w-24 h-24">
                        {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>
            </div>

            <div>
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                />

                <Button
                    disabled={loading}
                    onClick={() => fileRef.current?.click()}
                >
                    {loading ? "Uploading..." : "Upload Avatar"}
                </Button>
            </div>
        </div>
    );
}