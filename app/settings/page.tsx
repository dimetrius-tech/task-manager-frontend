"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { userAPI } from "@/lib/userAPI";
import { AvatarUploader } from "@/components/users/AvatarUploader";

export default function SettingsPage() {
    const {user, refreshUser} = useAuth();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const updateProfile = async () => {
        const res = await userAPI.updateProfile(name, email);
        toast.success(res.data.message);
        await refreshUser();
    }

    const changePassword = async () => {
        const res = await userAPI.changePassword(oldPassword, newPassword);
        toast.success(res.data.message);
        await refreshUser();
        setOldPassword("");
        setNewPassword("");
    }

    return (
        <div className="max-w-3xl mx-auto py-10 space-y-10">
            <h1 className="text-3xl font-bold">Settings</h1>

            {/* Profile Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <AvatarUploader />
                    
                    <div className="grid gap-3">
                        <Label>Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <Button className="mt-2 w-fit" onClick={updateProfile}>
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3">
                        <Label>Current Password</Label>
                        <Input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>New Password</Label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <Button variant="default" className="w-fit" onClick={changePassword}>
                        Update Password
                    </Button>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-300">
                <CardHeader>
                    <CardTitle className="text-red-600">
                        Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Deleting your account is permanent. All your tasks will be removed.
                    </p>
                    <Button variant="destructive">
                        Delete Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}