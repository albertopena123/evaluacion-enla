"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

interface NextLoginProps {
    children: React.ReactNode
    mode?: "modal" | "redirect"
    asChild?: boolean
    continua?: boolean
    onError?: (error: Error) => void
}

const NextLogin = ({
    children,
    mode = "redirect",
    asChild = false,
    continua = false,
    onError
}: NextLoginProps) => {
    const router = useRouter()

    const handleLogin = async () => {
        try {
            if (mode === "redirect") {
                await router.push(continua ? "/login?continua=true" : "/login")
            }
        } catch (error) {
            console.error("Error during navigation:", error)
            onError?.(error as Error)
        }
    }

    if (asChild) {
        return React.cloneElement(children as React.ReactElement, {
            onClick: handleLogin
        })
    }

    return (
        <span 
            onClick={handleLogin}
        >
            {children}
        </span>
    )
}

export default NextLogin