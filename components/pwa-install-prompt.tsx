"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, X, Smartphone, Zap, Wifi, Bell } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if app is already installed or running in standalone mode
    const checkInstallStatus = () => {
      const isStandaloneMode = window.matchMedia("(display-mode: standalone)").matches
      const isIOSStandalone = (window.navigator as any).standalone === true
      const isInstalled = isStandaloneMode || isIOSStandalone

      setIsStandalone(isInstalled)
      setIsInstalled(isInstalled)
    }

    checkInstallStatus()

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Show prompt after a delay if not already installed
      if (!isInstalled) {
        setTimeout(() => {
          setShowPrompt(true)
        }, 5000) // Show after 5 seconds
      }
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("User accepted the install prompt")
      } else {
        console.log("User dismissed the install prompt")
      }
    } catch (error) {
      console.error("Error during installation:", error)
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem("pwa-prompt-dismissed", "true")
  }

  // Don't show if already installed, dismissed, or no prompt available
  if (isInstalled || !showPrompt || !deferredPrompt || sessionStorage.getItem("pwa-prompt-dismissed")) {
    return null
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <Card className="glass border-white/10 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">Install ReviveForge</CardTitle>
                <Badge className="bg-green-500/20 text-green-400 text-xs mt-1">
                  <Zap className="w-3 h-3 mr-1" />
                  Enhanced Experience
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="w-8 h-8 p-0 hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-gray-300 mb-4">
            Get the full app experience with offline access, push notifications, and faster loading.
          </CardDescription>

          {/* Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-300">
              <Wifi className="w-4 h-4 mr-2 text-blue-400" />
              Works offline
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <Bell className="w-4 h-4 mr-2 text-purple-400" />
              Push notifications
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              Faster performance
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="border-white/20 hover:bg-white/10 bg-transparent"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
