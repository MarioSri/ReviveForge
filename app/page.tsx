import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Shield,
  Zap,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Code,
  Smartphone,
  ShoppingCart,
  Brain,
  Globe,
  Github,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-float">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover, Acquire & Revive <span className="gradient-text">Abandoned Digital Projects</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AI-powered marketplace connecting entrepreneurs with undervalued SaaS projects, MVPs, and digital assets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/marketplace">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Search className="w-5 h-5 mr-2" />
                Explore Projects
              </Button>
            </Link>
            <Link href="/sell">
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                List Your Project
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="glass-card text-center">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-gray-400">Projects Listed</div>
            </div>
            <div className="glass-card text-center">
              <div className="text-3xl font-bold gradient-text">$2.5M+</div>
              <div className="text-gray-400">Total Value</div>
            </div>
            <div className="glass-card text-center">
              <div className="text-3xl font-bold gradient-text">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">ReviveForge</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our platform provides everything you need to discover, evaluate, and acquire digital projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">AI-Powered Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Automated project scouting and intelligent valuation using advanced AI algorithms
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Secure Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Escrow payments and verified sellers ensure safe and secure project transfers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Revival Toolkit</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Post-acquisition support and resources to help you successfully revive projects
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Community Network</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Connect with partners, experts, and fellow entrepreneurs in our thriving community
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Project <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-xl text-gray-300">Find the perfect project in your area of expertise</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Globe, name: "SaaS Platforms", count: "120+" },
              { icon: Smartphone, name: "Mobile Apps", count: "85+" },
              { icon: ShoppingCart, name: "E-commerce", count: "95+" },
              { icon: Brain, name: "AI/ML Projects", count: "45+" },
              { icon: Code, name: "Web Apps", count: "150+" },
              { icon: Github, name: "Open Source", count: "75+" },
            ].map((category, index) => (
              <Card
                key={index}
                className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.count} projects</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-300">
              See how entrepreneurs are building successful businesses with ReviveForge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Founder, TaskFlow Pro",
                content:
                  "I found an abandoned project management tool on ReviveForge and turned it into a $50K/month SaaS. The AI valuation was spot-on!",
                rating: 5,
                avatar: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Marcus Rodriguez",
                role: "CEO, ShopEasy",
                content:
                  "ReviveForge helped me acquire an e-commerce platform for a fraction of building from scratch. Now we serve 10,000+ customers.",
                rating: 5,
                avatar: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Emily Watson",
                role: "CTO, DataViz",
                content:
                  "The due diligence tools and secure transaction process made acquiring our analytics platform seamless and risk-free.",
                rating: 5,
                avatar: "/placeholder.svg?height=40&width=40",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="glass border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-gray-300">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "/month",
                description: "Perfect for getting started",
                features: ["Browse all projects", "Basic search filters", "Community access", "Email support"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$49",
                period: "/month",
                description: "For serious project hunters",
                features: [
                  "Everything in Free",
                  "Advanced AI insights",
                  "Priority support",
                  "Due diligence tools",
                  "Negotiation assistance",
                ],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$199",
                period: "/month",
                description: "For teams and agencies",
                features: [
                  "Everything in Pro",
                  "Team collaboration",
                  "Custom integrations",
                  "Dedicated account manager",
                  "White-label options",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`glass border-white/10 relative ${plan.popular ? "border-purple-500/50 scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Next <span className="gradient-text">Big Opportunity</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of entrepreneurs who are building successful businesses with abandoned projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  Start Exploring Projects
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
                  List Your Project Free
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Limited Time: 50+ New Projects This Week
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
