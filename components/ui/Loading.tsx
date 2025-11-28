"use client";

import React from "react";

interface LoadingProps {
    message?: string;
    size?: number;
}

export default function Loading({ message = "Loading...", size = 24 }: LoadingProps) {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <svg
                className="animate-spin text-blue-500"
                style={{ width: size, height: size }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
            </svg>
            <p className="mt-2 text-gray-500">{message}</p>
            <small>(I deploy my backend to a free host, so it may take up to 60 seconds for hosting to restart the project)</small>
        </div>
    );
}