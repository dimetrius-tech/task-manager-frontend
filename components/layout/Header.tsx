"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth} from "@/app/context/AuthContext";

import { Button } from "../ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Menu} from "lucide-react";

export default function Header() {
    const {user, logout} = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex items-center justify-between py-4 px-10">

                {/* Logo */}
                <Link href="/" className="text-xl font-semibold">
                    TaskManager
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 items-center">

                    {/* User Avatar Dropdown */}
                    <div className="flex items-center gap-3">
                        {user && (
                            <>
                                <Link href="/dashboard" className="text-sm hover:text-primary">
                                    Dashboard
                                </Link>

                                <Link href="/tasks" className="text-sm hover:text-primary">
                                    Tasks
                                </Link>

                                <Link href="/settings" className="text-sm hover:text-primary">
                                    Settings
                                </Link>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.avatarUrl} alt="@shadcn" />
                                    <AvatarFallback>
                                        {user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>

                                <Button size="sm" variant="outline" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link href="/login" className="text-sm hover:text-primary">
                                    Login
                                </Link>

                                <Link href="/register" className="text-sm hover:text-primary">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Trigger */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </SheetTrigger>

                    <SheetContent side="left" className="p-6">
                        <nav className="flex flex-col gap-4 mt-6">
                            <Link href="/dashboard" onClick={() => setOpen(false)}>
                                Dashboard
                            </Link>

                            <Link href="/tasks" onClick={() => setOpen(false)}>
                                Tasks
                            </Link>

                            <Link href="/settings" onClick={() => setOpen(false)}>
                                Settings
                            </Link>

                            <Button variant="outline" onClick={logout} className="mt-4">
                                Logout
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}