import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  Search,
  Shield,
  Zap,
  Star,
  CheckCircle,
  TrendingUp,
  Users,
  DollarSign,
  Github,
  Twitter,
  ExternalLink,
  Sparkles,
  Target,
  Rocket,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-8 border-primary/20 bg-primary/5 text-primary">
              <Sparkles className="mr-2 h-3 w-3" />
              AI-Powered Project Marketplace
            </Badge>
            
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Revive Abandoned{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                SaaS Projects
              </span>
              . Instantly.
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              The marketplace for discovering, valuing, and relaunching undervalued digital projects. 
              AI-powered valuation, secure escrow, and community-driven revival tools.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/marketplace">
                <Button 
                  size="lg" 
                  className="group h-12 px-8 text-base font-medium transition-all hover:scale-105"
                  aria-label="Browse available projects"
                >
                  Browse Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-8 text-base font-medium transition-all hover:scale-105"
                  aria-label="List your project for sale"
                >
                  Sell Your Project
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Secure Escrow
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                AI Valuation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Verified Sellers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three simple steps to revive abandoned projects
            </p>
          </div>
          
          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="group relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary/20">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                1. Discover & Evaluate
              </h3>
              <p className="mt-2 text-muted-foreground">
                Browse undervalued SaaS projects with AI-powered health scores and market analysis. 
                Filter by tech stack, price range, and growth potential.
              </p>
            </div>
            
            <div className="group relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                2. Secure Transaction
              </h3>
              <p className="mt-2 text-muted-foreground">
                Make offers with confidence using Stripe-powered escrow. Funds are held securely 
                until project transfer is complete and verified.
              </p>
            </div>
            
            <div className="group relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary/20">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                3. Revive & Scale
              </h3>
              <p className="mt-2 text-muted-foreground">
                Access community tools, growth playbooks, and expert guidance to successfully 
                relaunch and monetize your acquired project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Stats Section */}
      <section className="border-y bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Trusted by founders and backed by the community
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">$2.5M+</div>
              <div className="text-sm text-muted-foreground">Total GMV</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Projects Listed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">1,200+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
          
          <div className="mt-12 flex items-center justify-center">
            <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
              <Star className="mr-2 h-3 w-3 fill-current" />
              Backed by Indie Hackers Community
            </Badge>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See how founders are building successful businesses with ReviveForge
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="border-0 bg-muted/30 transition-all hover:bg-muted/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-foreground">
                  "Found an abandoned project management tool and turned it into a $50K/month SaaS. 
                  The AI valuation was spot-on!"
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Founder, TaskFlow Pro</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-muted/30 transition-all hover:bg-muted/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-foreground">
                  "ReviveForge helped me acquire an e-commerce platform for a fraction of building from scratch. 
                  Now we serve 10,000+ customers."
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">CEO, ShopEasy</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-muted/30 transition-all hover:bg-muted/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-foreground">
                  "The due diligence tools and secure transaction process made acquiring our analytics platform 
                  seamless and risk-free."
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">Emily Watson</div>
                    <div className="text-sm text-muted-foreground">CTO, DataViz</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Stay Updated</h2>
            <p className="mt-2 text-muted-foreground">
              Read our latest insights on project acquisition and SaaS revival
            </p>
            
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link 
                href="https://www.indiehackers.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="transition-all hover:scale-105"
                  aria-label="Read our posts on Indie Hackers"
                >
                  Read on Indie Hackers
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link 
                href="https://www.producthunt.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="transition-all hover:scale-105"
                  aria-label="Follow us on Product Hunt"
                >
                  Follow on Product Hunt
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Join the Community</h2>
            <p className="mt-2 text-muted-foreground">
              Connect with fellow founders and share your revival journey
            </p>
            
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link 
                href="https://twitter.com/reviveforge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="transition-all hover:scale-105"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="mr-2 h-4 w-4" />
                  Follow on Twitter
                </Button>
              </Link>
              
              <Link 
                href="https://github.com/reviveforge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <Button 
                  variant="outline" 
                  className="transition-all hover:scale-105"
                  aria-label="Star us on GitHub"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </Button>
              </Link>
            </div>
            
            <div className="mt-8">
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                <Zap className="mr-2 h-3 w-3" />
                Earn Revive Credits for referrals
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="border-t bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free, upgrade when you're ready to scale
            </p>
          </div>
          
          <div className="mt-16 flex justify-center">
            <Card className="relative w-full max-w-md border-primary/20 bg-background shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground">Pro</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-foreground">$49</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-muted-foreground">For serious project hunters</p>
                
                <ul className="mt-8 space-y-3 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced AI insights</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-500" />
                    <span className="text-sm">Due diligence tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-green-500" />
                    <span className="text-sm">Negotiation assistance</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link href="/pricing">
                    <Button className="w-full" aria-label="View full pricing details">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/pricing" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all plans and features →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Find Your Next{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Big Opportunity
            </span>
            ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join thousands of entrepreneurs who are building successful businesses with abandoned projects
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/marketplace">
              <Button 
                size="lg" 
                className="group h-12 px-8 text-base font-medium transition-all hover:scale-105"
                aria-label="Start exploring projects"
              >
                Start Exploring Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 px-8 text-base font-medium transition-all hover:scale-105"
                aria-label="List your project for free"
              >
                List Your Project Free
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>50+ New Projects This Week</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">RF</span>
                </div>
                <span className="text-xl font-bold text-foreground">ReviveForge</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                The marketplace for discovering, valuing, and relaunching abandoned digital projects. 
                Built by founders, for founders.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/dpa" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    DPA
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 ReviveForge. Built by founders for founders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}