"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Search,
  Heart,
  MessageSquare,
  User,
  Menu,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  TrendingUp,
  Bookmark,
  History,
  CreditCard,
  Shield,
} from "lucide-react"

const navigationItems = [
  { href: "/", icon: Home, label: "Home", badge: null },
  { href: "/marketplace", icon: Search, label: "Browse", badge: null },
  { href: "/favorites", icon: Heart, label: "Favorites", badge: 3 },
  { href: "/messages", icon: MessageSquare, label: "Messages", badge: 2 },
  { href: "/profile", icon: User, label: "Profile", badge: null },
]

const menuItems = [
  { href: "/sell", icon: Plus, label: "List Project", color: "text-green-400" },
  { href: "/dashboard", icon: TrendingUp, label: "Dashboard" },
  { href: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { href: "/history", icon: History, label: "Purchase History" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/help", icon: HelpCircle, label: "Help & Support" },
  { href: "/security", icon: Shield, label: "Security" },
]

export function MobileNavigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications] = useState(5) // Mock notification count

  // Mock user data - in real app this would come from auth context
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  }

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RF</span>
            </div>
            <span className="text-lg font-bold gradient-text">ReviveForge</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative w-10 h-10 p-0">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {notifications > 9 ? "9+" : notifications}
                </Badge>
              )}
            </Button>

            {/* Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass border-white/10 p-0">
                <div className="flex flex-col h-full">
                  {/* User Profile Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white truncate">{user.name}</h3>
                          {user.verified && <Shield className="w-4 h-4 text-green-400" />}
                        </div>
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-2">
                      {menuItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start hover:bg-white/10 ${
                              pathname === item.href ? "bg-white/10 text-purple-400" : ""
                            } ${item.color || ""}`}
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Footer Actions */}
                  <div className="p-4 border-t border-white/10">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-sm border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <Button
                  variant="ghost"
                  className={`w-full h-12 flex flex-col items-center justify-center space-y-1 relative ${
                    isActive ? "text-purple-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {item.badge > 9 ? "9+" : item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
