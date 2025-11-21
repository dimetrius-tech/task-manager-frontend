"use client";

import {useState} from "react";
import {login, registerUser} from "@/lib/auth";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({name: '', email: '', password: ''});
    const { refreshUser } = useAuth();

    const handleSubmit = async () =>{
        try {
            await registerUser(form.name, form.email, form.password);
            const loginData = await login(form.email, form.password);
            Cookies.set("token", loginData.token);

            await refreshUser();
            router.push("/dashboard");
        } catch(err: any) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <Label>Name</Label>
                        <Input
                            placeholder="John Doe"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="john@mail.com"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            placeholder="******"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                </CardContent>

                <CardFooter>
                    <Button className="w-full" onClick={handleSubmit}>
                        Register
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}