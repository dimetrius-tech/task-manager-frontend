"use client";

import {useState} from 'react';
import {login} from '@/lib/auth';
import Cookies from 'js-cookie'
import {useRouter} from 'next/navigation';
import { useAuth } from "@/app/context/AuthContext";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { refreshUser } = useAuth();

    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            Cookies.set('token', data.token);
            await refreshUser();
            router.push("/dashboard");
        } catch(err: any) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="******"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button className="w-full" onClick={handleLogin}>
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}