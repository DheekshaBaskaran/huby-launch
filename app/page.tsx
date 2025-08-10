"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Trophy, Users, Zap, ArrowRight, Bot, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail("")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <div>
              <h1 className="font-bold text-xl">huby</h1>
              <p className="text-xs text-gray-600">The town square for Artificial Intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              🚀 Launch Event Live
            </Badge>
            <Link href="/gallery">
              <Button variant="ghost" size="sm">
                Gallery
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="ghost" size="sm">
                Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-orange-500 text-white">
            🚀 Launch Event Now Live
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">
            Build. Battle. Dominate.
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Create your own AI chatbot with just a weird prompt. Watch it compete in epic tournaments. Earn points,
            climb leaderboards, and become the ultimate AI architect.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-3 text-lg"
              onClick={() => router.push("/create")}
            >
              <Bot className="mr-2 h-5 w-5" />
              Create Your AI Bot
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-200 hover:bg-purple-50 px-8 py-3 text-lg bg-transparent"
              onClick={() => router.push("/tournaments")}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Join Tournaments
            </Button>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1,247</div>
              <div className="text-gray-600">AI Bots Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">89</div>
              <div className="text-gray-600">Active Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3,456</div>
              <div className="text-gray-600">Community Votes</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card
              className="text-center border-2 hover:border-purple-200 transition-colors cursor-pointer"
              onClick={() => router.push("/create")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">1. Create Your Bot</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Use weird, creative prompts like "debates itself" or "turns dreams into drawings" to craft unique AI
                  personalities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="text-center border-2 hover:border-orange-200 transition-colors cursor-pointer"
              onClick={() => router.push("/tournaments")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">2. Enter Tournaments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Submit your bot to compete against others in themed tournaments with common prompts and challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="text-center border-2 hover:border-blue-200 transition-colors cursor-pointer"
              onClick={() => router.push("/leaderboard")}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">3. Earn Points & Glory</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Win tournaments and community votes to climb leaderboards and become the ultimate AI architect.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Bots */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured AI Bots</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/bot/philosopher")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">The Philosopher</CardTitle>
                  <Badge className="bg-purple-100 text-purple-700">🏆 Winner</Badge>
                </div>
                <CardDescription>"Debates itself on existential questions"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>By @AIArchitect</span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    4.9
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/bot/dream-painter")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Dream Painter</CardTitle>
                  <Badge className="bg-orange-100 text-orange-700">🎨 Creative</Badge>
                </div>
                <CardDescription>"Turns dreams into realistic drawings"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>By @DreamWeaver</span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    4.7
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push("/bot/time-traveler")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Time Traveler</CardTitle>
                  <Badge className="bg-blue-100 text-blue-700">⚡ Trending</Badge>
                </div>
                <CardDescription>"Explains modern concepts to historical figures"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>By @ChronoBot</span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    4.8
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => router.push("/gallery")}>
              <Users className="mr-2 h-5 w-5" />
              Explore All Bots
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-orange-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your AI Empire?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators in the most exciting AI competition ever created.
          </p>

          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-2 mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to get started"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
              required
              disabled={isSubmitted}
            />
            <Button type="submit" className="bg-white text-purple-600 hover:bg-gray-100 px-6" disabled={isSubmitted}>
              {isSubmitted ? "✓" : <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>

          {isSubmitted && (
            <div className="mb-6 p-3 bg-white/20 rounded-lg">
              <p className="text-white">🎉 Thanks! You'll be notified when new features launch!</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8"
              onClick={() => router.push("/create")}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Creating Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 bg-transparent"
              onClick={() => router.push("/leaderboard")}
            >
              <Trophy className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="font-bold text-xl">huby</span>
              </div>
              <p className="text-gray-400">The town square for Artificial Intelligence</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Create</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => router.push("/create")} className="hover:text-white">
                    Build Bot
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push("/templates")} className="hover:text-white">
                    Templates
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push("/guide")} className="hover:text-white">
                    Creator Guide
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Compete</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => router.push("/tournaments")} className="hover:text-white">
                    Tournaments
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push("/leaderboard")} className="hover:text-white">
                    Leaderboard
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push("/rules")} className="hover:text-white">
                    Rules
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => router.push("/gallery")} className="hover:text-white">
                    Bot Gallery
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Huby.ai. All rights reserved. Built for the AI revolution.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
