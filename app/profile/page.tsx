"use client"

import React from "react"
import { useProfile, useUpdateProfile } from "@/lib/api"
import { useState } from "react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Save, Shield, Star, X, Mail, Phone, MapPin, User, Globe, Github, Twitter, Linkedin } from "lucide-react"
import VisuallyHiddenLabel from "@/components/VisuallyHiddenLabel"

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
  const { data: profile, isLoading, error } = useProfile()
  const { mutate: updateProfile, isLoading: saving } = useUpdateProfile()
  const [form, setForm] = useState({
    name: "",
    bio: "",
    website: "",
  })
  const toast = useToast()

  // Populate form when profile loads
  React.useEffect(() => {
    if (profile)
      setForm({
        name: profile.name || "",
        bio: profile.bio || "",
        website: profile.website || "",
      })
  }, [profile])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateProfile(form, {
      onSuccess: () => toast.toast({ title: "Profile updated!" }),
      onError: () =>
        toast.toast({ title: "Error updating profile", variant: "destructive" }),
    })
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            My <span className="gradient-text">Profile</span>
          </h1>
          {/* {!isEditing ? ( */}
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          {/* ) : ( */}
          {/* <div className="flex space-x-2"> */}
          {/*   <Button */}
          {/*     onClick={handleSave} */}
          {/*     className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" */}
          {/*   > */}
          {/*     <Save className="w-4 h-4 mr-2" /> */}
          {/*     Save Changes */}
          {/*   </Button> */}
          {/*   <Button */}
          {/*     onClick={handleCancel} */}
          {/*     variant="outline" */}
          {/*     className="border-white/20 hover:bg-white/10 bg-transparent" */}
          {/*   > */}
          {/*     <X className="w-4 h-4 mr-2" /> */}
          {/*     Cancel */}
          {/*   </Button> */}
          {/* </div> */}
          {/* } */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={profile?.avatar || userProfile.avatar} />
                      <AvatarFallback className="text-2xl">
                        {profile?.firstName[0]}
                        {profile?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {profile?.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    {profile?.firstName} {profile?.lastName}
                  </h2>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-semibold">
                      {profile?.rating}
                    </span>
                    <span className="text-gray-400">
                      ({profile?.reviews} reviews)
                    </span>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 capitalize">
                    {profile?.role}
                  </Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2" />
                    {profile?.email}
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 mr-2" />
                      {profile?.phone}
                    </div>
                  )}
                  {profile?.location && (
                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-4 h-4 mr-2" />
                      {profile?.location}
                    </div>
                  )}
                  <div className="flex items-center text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    Member since {profile?.joinedDate}
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-white font-semibold mb-3">Social Links</h3>
                  <div className="space-y-2">
                    {profile?.website && (
                      <a
                        href={profile.website}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </a>
                    )}
                    {profile?.github && (
                      <a
                        href={profile.github}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    )}
                    {profile?.twitter && (
                      <a
                        href={profile.twitter}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </a>
                    )}
                    {profile?.linkedin && (
                      <a
                        href={profile.linkedin}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
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
                    <div className="text-2xl font-bold gradient-text">
                      {profile?.stats.projectsSold}
                    </div>
                    <div className="text-xs text-gray-400">Projects Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      ${profile?.stats.totalEarnings.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Total Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {profile?.stats.avgRating}
                    </div>
                    <div className="text-xs text-gray-400">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {profile?.stats.totalViews.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Total Views</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <VisuallyHiddenLabel htmlFor="profile-name">Name</VisuallyHiddenLabel>
                <input
                  id="profile-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="input"
                  aria-label="Name"
                />
              </div>
              <div className="mb-4">
                <VisuallyHiddenLabel htmlFor="profile-bio">Bio</VisuallyHiddenLabel>
                <textarea
                  id="profile-bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="input"
                  aria-label="Bio"
                />
              </div>
              <div className="mb-4">
                <VisuallyHiddenLabel htmlFor="profile-website">Website</VisuallyHiddenLabel>
                <input
                  id="profile-website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="input"
                  aria-label="Website"
                />
              </div>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
