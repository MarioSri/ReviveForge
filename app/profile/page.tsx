"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Edit,
  Save,
  X,
  Shield,
  Star,
  Lock,
  CreditCard,
} from "lucide-react"

const userProfile = {
  id: "user1",
  firstName: "Alex",
  lastName: "Chen",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Full-stack developer with 8+ years of experience building SaaS products. Passionate about clean code and user experience. Currently focusing on AI-powered applications.",
  avatar: "/placeholder.svg?height=120&width=120",
  verified: true,
  rating: 4.8,
  reviews: 23,
  joinedDate: "March 2022",
  role: "seller",
  website: "https://alexchen.dev",
  github: "https://github.com/alexchen",
  twitter: "https://twitter.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  stats: {
    projectsSold: 12,
    totalEarnings: 45600,
    avgRating: 4.8,
    totalViews: 15420,
    activeListings: 3,
    completedDeals: 9,
  },
  preferences: {
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    publicProfile: true,
    showEarnings: false,
  },
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userProfile)
  const [activeTab, setActiveTab] = useState("profile")

  const handleSave = () => {
    // Here you would save to your API
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(userProfile)
    setIsEditing(false)
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            My <span className="gradient-text">Profile</span>
          </h1>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-white/20 hover:bg-white/10 bg-transparent"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={formData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">
                        {formData.firstName[0]}
                        {formData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {formData.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-semibold">{formData.rating}</span>
                    <span className="text-gray-400">({formData.reviews} reviews)</span>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 capitalize">{formData.role}</Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2" />
                    {formData.email}
                  </div>
                  {formData.phone && (
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 mr-2" />
                      {formData.phone}
                    </div>
                  )}
                  {formData.location && (
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      {formData.location}
                    </div>
                  )}
                  <div className="flex items-center text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    Member since {formData.joinedDate}
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-white font-semibold mb-3">Social Links</h3>
                  <div className="space-y-2">
                    {formData.website && (
                      <a href={formData.website} className="flex items-center text-gray-300 hover:text-white">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </a>
                    )}
                    {formData.github && (
                      <a href={formData.github} className="flex items-center text-gray-300 hover:text-white">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    )}
                    {formData.twitter && (
                      <a href={formData.twitter} className="flex items-center text-gray-300 hover:text-white">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </a>
                    )}
                    {formData.linkedin && (
                      <a href={formData.linkedin} className="flex items-center text-gray-300 hover:text-white">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="glass border-white/10 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Performance Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">{formData.stats.projectsSold}</div>
                    <div className="text-xs text-gray-400">Projects Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      ${formData.stats.totalEarnings.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Total Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{formData.stats.avgRating}</div>
                    <div className="text-xs text-gray-400">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{formData.stats.totalViews.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Total Views</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-white">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-white/5 border-white/10 text-white disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-white/5 border-white/10 text-white disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/10 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-white">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/10 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-white">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/10 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-white">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/10 text-white disabled:opacity-50 min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website" className="text-white">
                          Website
                        </Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-white/5 border-white/10 text-white disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github" className="text-white">
                          GitHub
                        </Label>
                        <Input
                          id="github"
                          value={formData.github}
                          onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                          disabled={!isEditing}
                          className="bg-white/5 border-white/10 text-white disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.preferences.emailNotifications}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, emailNotifications: e.target.checked },
                          }))
                        }
                        className="toggle"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-400">Receive push notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.preferences.pushNotifications}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, pushNotifications: e.target.checked },
                          }))
                        }
                        className="toggle"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Marketing Emails</h3>
                        <p className="text-sm text-gray-400">Receive marketing and promotional emails</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.preferences.marketingEmails}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, marketingEmails: e.target.checked },
                          }))
                        }
                        className="toggle"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Public Profile</h3>
                        <p className="text-sm text-gray-400">Make your profile visible to other users</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.preferences.publicProfile}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, publicProfile: e.target.checked },
                          }))
                        }
                        className="toggle"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <div className="space-y-6">
                  <Card className="glass border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Password & Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 bg-transparent">
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>

                      <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 bg-transparent">
                        <Shield className="w-4 h-4 mr-2" />
                        Enable Two-Factor Authentication
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="glass border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Payment Methods</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 bg-transparent">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Manage Payment Methods
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
