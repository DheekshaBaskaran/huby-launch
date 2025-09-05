"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Star, Heart, MessageSquare, Search, ArrowLeft, Trophy, Sparkles, Send } from "lucide-react"
import { useRouter } from "next/navigation"

interface Bot {
  _id: string;
  name: string;
  creator: string;
  prompt: string;
  description: string;
  category: string;
  weirdness: number;
  views: number;
  likes: number;
  responses: string[];
  isExample: boolean;
  createdAt: string;
}

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null)
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; message: string }>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [likedBots, setLikedBots] = useState<string[]>([])
  const [bots, setBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('/api/bots');
        const data = await response.json();
        
        // The API returns { bots: [...], pagination: {...} }
        const botsArray = data.bots || [];
        setBots(botsArray);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(botsArray.map((bot: Bot) => bot.category))] as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching bots:', error);
        setBots([]); // Set empty array on error to prevent crashes
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  const filteredBots = bots.filter((bot) => {
    const matchesSearch =
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.creator.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterBy === "all" || bot.category.toLowerCase() === filterBy.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const sortedBots = [...filteredBots].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views
      case "rating":
        return (b.likes / (b.views || 1)) - (a.likes / (a.views || 1))
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "weirdness":
        return b.weirdness - a.weirdness
      case "likes":
        return b.likes - a.likes
      default:
        return 0
    }
  })

  const getStatusBadge = (bot: Bot) => {
    if (bot.isExample) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700">
          <Trophy className="h-3 w-3 mr-1" />
          Example
        </Badge>
      )
    }
    
    const rating = bot.views > 0 ? (bot.likes / bot.views) * 5 : 0;
    
    if (rating > 4.5) {
      return (
        <Badge className="bg-purple-100 text-purple-700">
          <Star className="h-3 w-3 mr-1" />
          Top Rated
        </Badge>
      )
    } else if (bot.weirdness > 80) {
      return (
        <Badge className="bg-orange-100 text-orange-700">
          <Sparkles className="h-3 w-3 mr-1" />
          Weird
        </Badge>
      )
    } else if (bot.views > 1000) {
      return (
        <Badge className="bg-green-100 text-green-700">
          <Sparkles className="h-3 w-3 mr-1" />
          Popular
        </Badge>
      )
    } else {
      return <Badge variant="outline">Active</Badge>
    }
  }

  const handleChatWithBot = (bot: Bot) => {
    setSelectedBot(bot)
    setChatHistory([])
    setShowChatDialog(true)
  }

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || !selectedBot) return

    const userMessage = chatMessage.trim()
    const newHistory = [...chatHistory, { role: "user", message: userMessage }]
    setChatHistory(newHistory)
    setChatMessage("")
    setIsGenerating(true)

    try {
      // Call the internal chat API with the bot's context and conversation history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          botPrompt: selectedBot.prompt,
          botName: selectedBot.name,
          chatHistory: newHistory.slice(0, -1) // Don't include the current message in history
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get bot response')
      }

      const data = await response.json()
      const botResponse = data.response || "I'm having trouble thinking right now... 🤔"

      setChatHistory([...newHistory, { role: "assistant", message: botResponse }])
    } catch (error) {
      console.error('Error getting bot response:', error)
      
      // Fallback to a character-appropriate error response
      const fallbackResponse = selectedBot.responses && selectedBot.responses.length > 0
        ? selectedBot.responses[Math.floor(Math.random() * selectedBot.responses.length)]
        : `*glitches briefly* My circuits are having a moment! As someone who ${selectedBot.prompt.toLowerCase()}, I should probably say something witty here... but my brain is buffering! 🤖⚡`
      
      setChatHistory([...newHistory, { role: "assistant", message: fallbackResponse }])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleLikeBot = (botId: string) => {
    if (likedBots.includes(botId)) {
      setLikedBots(likedBots.filter((id) => id !== botId))
    } else {
      setLikedBots([...likedBots, botId])
    }
  }

  const calculateRating = (bot: Bot) => {
    if (bot.views === 0) return 0;
    return (bot.likes / bot.views) * 5;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bot gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-purple-600" />
              <h1 className="font-bold text-xl">Bot Gallery</h1>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
            {bots.length} Bots Available
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              AI Bot Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing AI personalities created by the community. Chat with them, rate them, and get inspired for your own creations.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search bots by name, prompt, or creator..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="weirdness">Most Weird</SelectItem>
                    <SelectItem value="likes">Most Liked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredBots.length} of {bots.length} bots
            </p>
          </div>

          {/* Bot Grid */}
          {filteredBots.length === 0 ? (
            <div className="text-center py-16">
              <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No bots found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
              <Button onClick={() => {
                setSearchTerm("");
                setFilterBy("all");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedBots.map((bot) => (
                <Card key={bot._id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{bot.name}</CardTitle>
                      {getStatusBadge(bot)}
                    </div>
                    <CardDescription className="text-sm line-clamp-2">
                      {bot.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Prompt:</span> "{bot.prompt}"
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">by {bot.creator}</span>
                        <Badge variant="outline" className="text-xs">
                          {bot.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{calculateRating(bot).toFixed(1)}</span>
                        <span className="text-gray-500">({bot.views} views)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{bot.likes}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleChatWithBot(bot)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      <Button
                        size="sm"
                        variant={likedBots.includes(bot._id) ? "default" : "outline"}
                        onClick={() => handleLikeBot(bot._id)}
                      >
                        <Heart className={`h-4 w-4 ${likedBots.includes(bot._id) ? "text-white" : "text-red-500"}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-purple-600 to-orange-500 text-white border-0">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-bold mb-4">Inspired by what you see?</h3>
                <p className="text-lg opacity-90 mb-6">
                  Create your own AI bot and add it to the gallery!
                </p>
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => router.push("/create")}
                >
                  <Bot className="mr-2 h-5 w-5" />
                  Create Your Bot
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              Chat with {selectedBot?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedBot?.prompt}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Chat History */}
            <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-3">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                  <p>Start a conversation with {selectedBot?.name}!</p>
                </div>
              ) : (
                chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        chat.role === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{chat.message}</p>
                    </div>
                  </div>
                ))
              )}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                className="flex-1"
                rows={2}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim() || isGenerating}
                className="px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
