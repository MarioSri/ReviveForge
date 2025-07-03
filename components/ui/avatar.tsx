"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export function AvatarDropdown() {
  const router = useRouter();
  return (
    <div className="relative group">
      <button className="rounded-full bg-gray-800 w-9 h-9 flex items-center justify-center">
        <span role="img" aria-label="User">👤</span>
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-auto z-50">
        <a href="/profile" className="block px-4 py-2 hover:bg-gray-800">Profile</a>
        <a href="/admin" className="block px-4 py-2 hover:bg-gray-800">Admin</a>
        <button onClick={() => { /* TODO: logout logic */ router.push('/login'); }} className="block w-full text-left px-4 py-2 hover:bg-gray-800">Logout</button>
      </div>
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback }
