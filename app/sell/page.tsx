"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { X, Github, Globe, FileText, DollarSign, ImageIcon, AlertCircle, CheckCircle } from "lucide-react"

const techStackOptions = [
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "Nuxt.js",
  "Svelte",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Laravel",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "Supabase",
  "AWS",
  "Vercel",
  "Netlify",
  "Docker",
  "Kubernetes",
  "TypeScript",
  "Python",
  "JavaScript",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
]

const categories = [
  "SaaS Platform",
  "Mobile App",
  "Web App",
  "E-commerce",
  "AI/ML",
  "Blockchain",
  "Game",
  "Desktop App",
  "API/Backend",
  "Chrome Extension",
]

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    projectName: "",
    description: "",
    category: "",
    price: "",

    // Technical Details
    techStack: [] as string[],
    repositoryUrl: "",
    liveUrl: "",
    documentation: "",

    // Project Assets
    images: [] as File[],
    additionalFiles: [] as File[],

    // Project Health
    lastUpdated: "",
    codeQuality: 50,
    testCoverage: 0,
    hasDocumentation: false,
    hasTests: false,
    isDeployed: false,

    // Legal & Transfer
    hasLegalIssues: false,
    includesDatabase: false,
    includesDomain: false,
    transferMethod: "",

    // Additional Info
    reasonForSelling: "",
    targetBuyer: "",
    negotiable: false,
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTechStackToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech) ? prev.techStack.filter((t) => t !== tech) : [...prev.techStack, tech],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    // Here you would submit to your API
    console.log("Submitting project:", formData)
    // Redirect to dashboard or success page
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>
              <p className="text-gray-400 mb-6">Tell us about your project</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName" className="text-white">
                  Project Name *
                </Label>
                <Input
                  id="projectName"
                  placeholder="e.g., TaskFlow Pro"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange("projectName", e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project, its features, and what makes it valuable..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-white/5 border-white/10 text-white min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price" className="text-white">
                    Asking Price (USD) *
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="5000"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="bg-white/5 border-white/10 text-white pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Technical Details</h2>
              <p className="text-gray-400 mb-6">Help buyers understand your tech stack</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white">Tech Stack *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {techStackOptions.map((tech) => (
                    <div
                      key={tech}
                      onClick={() => handleTechStackToggle(tech)}
                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                        formData.techStack.includes(tech)
                          ? "border-purple-500 bg-purple-500/20 text-purple-300"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20"
                      }`}
                    >
                      <div className="text-sm text-center">{tech}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="repositoryUrl" className="text-white">
                    Repository URL
                  </Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="repositoryUrl"
                      placeholder="https://github.com/username/repo"
                      value={formData.repositoryUrl}
                      onChange={(e) => handleInputChange("repositoryUrl", e.target.value)}
                      className="bg-white/5 border-white/10 text-white pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="liveUrl" className="text-white">
                    Live Demo URL
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="liveUrl"
                      placeholder="https://your-project.com"
                      value={formData.liveUrl}
                      onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                      className="bg-white/5 border-white/10 text-white pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="documentation" className="text-white">
                  Documentation URL
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="documentation"
                    placeholder="Link to documentation, README, or setup guide"
                    value={formData.documentation}
                    onChange={(e) => handleInputChange("documentation", e.target.value)}
                    className="bg-white/5 border-white/10 text-white pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Project Assets</h2>
              <p className="text-gray-400 mb-6">Upload screenshots and additional files</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white">Screenshots *</Label>
                <div className="mt-2">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-white mb-2">Click to upload screenshots</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 10MB each</p>
                    </label>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Project Health</h2>
              <p className="text-gray-400 mb-6">Help buyers assess your project's condition</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-white">Code Quality (1-100)</Label>
                <div className="mt-2">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={formData.codeQuality}
                    onChange={(e) => handleInputChange("codeQuality", Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Poor</span>
                    <span className="text-white font-semibold">{formData.codeQuality}%</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="testCoverage" className="text-white">
                  Test Coverage (%)
                </Label>
                <Input
                  id="testCoverage"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0"
                  value={formData.testCoverage}
                  onChange={(e) => handleInputChange("testCoverage", Number.parseInt(e.target.value) || 0)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDocumentation"
                    checked={formData.hasDocumentation}
                    onCheckedChange={(checked) => handleInputChange("hasDocumentation", checked)}
                  />
                  <Label htmlFor="hasDocumentation" className="text-white">
                    Has comprehensive documentation
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTests"
                    checked={formData.hasTests}
                    onCheckedChange={(checked) => handleInputChange("hasTests", checked)}
                  />
                  <Label htmlFor="hasTests" className="text-white">
                    Has automated tests
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isDeployed"
                    checked={formData.isDeployed}
                    onCheckedChange={(checked) => handleInputChange("isDeployed", checked)}
                  />
                  <Label htmlFor="isDeployed" className="text-white">
                    Currently deployed and running
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Final Details</h2>
              <p className="text-gray-400 mb-6">Complete your listing</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="reasonForSelling" className="text-white">
                  Why are you selling?
                </Label>
                <Textarea
                  id="reasonForSelling"
                  placeholder="e.g., Pivoting to a different market, lack of time to maintain..."
                  value={formData.reasonForSelling}
                  onChange={(e) => handleInputChange("reasonForSelling", e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div>
                <Label htmlFor="targetBuyer" className="text-white">
                  Ideal buyer
                </Label>
                <Input
                  id="targetBuyer"
                  placeholder="e.g., Solo developer, Small team, Enterprise"
                  value={formData.targetBuyer}
                  onChange={(e) => handleInputChange("targetBuyer", e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="negotiable"
                    checked={formData.negotiable}
                    onCheckedChange={(checked) => handleInputChange("negotiable", checked)}
                  />
                  <Label htmlFor="negotiable" className="text-white">
                    Price is negotiable
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includesDatabase"
                    checked={formData.includesDatabase}
                    onCheckedChange={(checked) => handleInputChange("includesDatabase", checked)}
                  />
                  <Label htmlFor="includesDatabase" className="text-white">
                    Includes database/data transfer
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includesDomain"
                    checked={formData.includesDomain}
                    onCheckedChange={(checked) => handleInputChange("includesDomain", checked)}
                  />
                  <Label htmlFor="includesDomain" className="text-white">
                    Includes domain name
                  </Label>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-300 font-semibold">Before you submit</h4>
                    <ul className="text-sm text-yellow-200 mt-1 space-y-1">
                      <li>• Ensure all code is clean and well-documented</li>
                      <li>• Remove any sensitive data or API keys</li>
                      <li>• Test that your project runs on a fresh environment</li>
                      <li>• Prepare transfer documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            List Your <span className="gradient-text">Project</span>
          </h1>
          <p className="text-gray-300 text-lg">Turn your abandoned project into revenue</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form */}
        <Card className="glass border-white/10">
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="border-white/20 hover:bg-white/10 bg-transparent"
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  disabled={
                    (currentStep === 1 &&
                      (!formData.projectName || !formData.description || !formData.category || !formData.price)) ||
                    (currentStep === 2 && formData.techStack.length === 0) ||
                    (currentStep === 3 && formData.images.length === 0)
                  }
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="glass border-white/10 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Listing Guide</h3>
                <p className="text-sm text-gray-400">Learn how to create compelling project listings</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Pricing Tips</h3>
                <p className="text-sm text-gray-400">Get advice on pricing your project competitively</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Success Stories</h3>
                <p className="text-sm text-gray-400">Read about successful project sales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
