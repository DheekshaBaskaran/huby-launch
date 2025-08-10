"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Star, Heart, MessageSquare, Search, ArrowLeft, Trophy, Sparkles, Send } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedBot, setSelectedBot] = useState<any>(null)
  const [showChatDialog, setShowChatDialog] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; message: string }>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [likedBots, setLikedBots] = useState<string[]>([])
  const router = useRouter()

  const bots = [
    {
      id: "1",
      name: "The Philosopher",
      creator: "@AIArchitect",
      prompt: "Debates itself on existential questions",
      description: "A deep-thinking AI that explores the meaning of life through internal dialogue",
      rating: 4.9,
      votes: 1247,
      likes: 892,
      category: "Philosophy",
      status: "winner",
      tournaments: 12,
      points: 4250,
    },
    {
      id: "2",
      name: "Dream Painter",
      creator: "@DreamWeaver",
      prompt: "Turns dreams into realistic drawings",
      description: "Transforms abstract dream descriptions into vivid visual narratives",
      rating: 4.7,
      votes: 956,
      likes: 743,
      category: "Creative",
      status: "trending",
      tournaments: 9,
      points: 3890,
    },
    {
      id: "3",
      name: "Time Traveler",
      creator: "@ChronoBot",
      prompt: "Explains modern concepts to historical figures",
      description: "Bridges past and present by teaching history's greatest minds about today",
      rating: 4.8,
      votes: 834,
      likes: 621,
      category: "Educational",
      status: "featured",
      tournaments: 8,
      points: 3650,
    },
    {
      id: "4",
      name: "Emotion Translator",
      creator: "@FeelBot",
      prompt: "Translates emotions into mathematical equations",
      description: "Converts complex human feelings into precise mathematical formulas",
      rating: 4.6,
      votes: 723,
      likes: 534,
      category: "Science",
      status: "new",
      tournaments: 5,
      points: 2100,
    },
    {
      id: "5",
      name: "Comedy Central",
      creator: "@LaughMaster",
      prompt: "Explains quantum physics using only dad jokes",
      description: "Makes complex physics concepts accessible through humor",
      rating: 4.5,
      votes: 689,
      likes: 512,
      category: "Comedy",
      status: "active",
      tournaments: 7,
      points: 3200,
    },
    {
      id: "6",
      name: "Wise Tree",
      creator: "@NatureAI",
      prompt: "Gives life advice as a wise old tree",
      description: "Offers ancient wisdom and guidance from the perspective of nature",
      rating: 4.4,
      votes: 567,
      likes: 445,
      category: "Wisdom",
      status: "active",
      tournaments: 6,
      points: 2980,
    },
  ]

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
        return b.votes - a.votes
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id.localeCompare(a.id)
      case "points":
        return b.points - a.points
      default:
        return 0
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "winner":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Trophy className="h-3 w-3 mr-1" />
            Winner
          </Badge>
        )
      case "trending":
        return (
          <Badge className="bg-orange-100 text-orange-700">
            <Sparkles className="h-3 w-3 mr-1" />
            Trending
          </Badge>
        )
      case "featured":
        return <Badge className="bg-purple-100 text-purple-700">Featured</Badge>
      case "new":
        return <Badge className="bg-green-100 text-green-700">New</Badge>
      default:
        return <Badge variant="outline">Active</Badge>
    }
  }

  const handleChatWithBot = (bot: any) => {
    setSelectedBot(bot)
    setChatHistory([])
    setShowChatDialog(true)
  }

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return

    const newHistory = [...chatHistory, { role: "user", message: chatMessage }]
    setChatHistory(newHistory)
    setChatMessage("")
    setIsGenerating(true)

    // Simulate bot response
    setTimeout(() => {
      const responses = {
        "The Philosopher": `🤔 *ponders deeply* You raise a fascinating point. Let me debate this with myself... Self 1: "${chatMessage}" suggests a fundamental question about existence. Self 2: But wait, isn't the very act of questioning proof of consciousness? Self 1: Exactly! The doubt validates the reality! *continues internal philosophical debate*`,
        "Dream Painter": `✨ *closes eyes and visualizes* I see your words transforming into colors... *begins sketching* Your message creates an image of swirling blues and golden threads, like thoughts becoming tangible. The canvas shows a landscape where your words bloom into flowers of meaning. Would you like me to add more detail to this dream-painting?`,
        "Time Traveler": `*adjusts temporal goggles* Fascinating! Let me explain this to someone from the past... "Dear Leonardo da Vinci, imagine if your notebooks could instantly share ideas across the world! This human asks: '${chatMessage}' - which in your time would be like having a town crier who could speak to every person in every village simultaneously!" *chuckles* He'd probably want to invent it immediately! 🎨⚡`,
        "Emotion Translator": `📊 *calculates emotional coefficients* Let me translate your message into mathematical terms... Your emotional state = (curiosity × 0.7) + (engagement × 0.9) - (uncertainty × 0.2). The sentiment vector shows: Hope = 85%, Interest = 92%, Complexity = 78%. In equation form: Feeling(t) = ∫(wonder + connection)dt. Quite a beautiful emotional formula! 🔢✨`,
        "Comedy Central": `😄 *adjusts comedy goggles* Oh, you want to know about that? Well, it's like quantum entanglement - spooky action at a distance, but instead of particles, it's dad jokes! Why don't quantum physicists ever get lost? Because they're always in a superposition of knowing exactly where they are AND having no clue! *ba dum tss* 🥁`,
        "Wise Tree": `🌳 *rustles ancient leaves thoughtfully* Ah, young sapling, your question reminds me of the seasons I've witnessed... In my 800 years, I've learned that growth comes not from rushing toward the sun, but from deepening roots in rich soil. Your inquiry is like a seed - plant it in patience, water it with curiosity, and watch wisdom bloom in its own time. *creaks wisely in the wind* 🍃`,
      }

      const botResponse =
        responses[selectedBot.name as keyof typeof responses] ||
        `*thinking in character* Based on my nature as "${selectedBot.prompt}", here's my response: ${chatMessage} is quite interesting! Let me share my unique perspective on this... *responds in character based on my special abilities* 🤖✨`

      setChatHistory([...newHistory, { role: "bot", message: botResponse }])
      setIsGenerating(false)
    }, 2000)
  }

  const handleLikeBot = (botId: string) => {
    if (likedBots.includes(botId)) {
      setLikedBots(likedBots.filter((id) => id !== botId))
    } else {
      setLikedBots([...likedBots, botId])
      // Update likes count
      const bot = bots.find((b) => b.id === botId)
      if (bot) {
        bot.likes += likedBots.includes(botId) ? -1 : 1
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-purple-600" />
              <h1 className="font-bold text-xl">Bot Gallery</h1>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">{bots.length} Bots</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Community Creations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing AI bots created by our community. Vote for your favorites, get inspired, and see what's
              possible with creative prompts.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bots, creators, or prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="points">Most Points</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="philosophy">Philosophy</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="wisdom">Wisdom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bot Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBots.map((bot) => (
              <Card key={bot.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{bot.name}</CardTitle>
                        <p className="text-sm text-gray-600">{bot.creator}</p>
                      </div>
                    </div>
                    {getStatusBadge(bot.status)}
                  </div>
                  <CardDescription className="text-sm italic">"{bot.prompt}"</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">{bot.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{bot.rating}</span>
                        <span className="text-gray-500 ml-1">({bot.votes})</span>
                      </div>
                      <div className="flex items-center">
                        <Heart
                          className={`h-4 w-4 mr-1 ${likedBots.includes(bot.id) ? "text-red-500 fill-current" : "text-red-500"}`}
                        />
                        <span>{bot.likes}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {bot.category}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Tournaments:</span> {bot.tournaments}
                    </div>
                    <div>
                      <span className="font-medium">Points:</span> {bot.points.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleChatWithBot(bot)}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`flex-1 ${likedBots.includes(bot.id) ? "bg-red-50 border-red-200" : ""}`}
                      onClick={() => handleLikeBot(bot.id)}
                    >
                      <Heart
                        className={`h-3 w-3 mr-1 ${likedBots.includes(bot.id) ? "text-red-500 fill-current" : ""}`}
                      />
                      {likedBots.includes(bot.id) ? "Liked" : "Like"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedBots.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No bots found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Load More */}
          {sortedBots.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Bots
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle>{selectedBot?.name}</DialogTitle>
                <DialogDescription>"{selectedBot?.prompt}"</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 flex flex-col min-h-0">
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg mb-4">
              {chatHistory.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Bot className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>Start a conversation with {selectedBot?.name}!</p>
                  <p className="text-sm">Try asking something related to: "{selectedBot?.prompt}"</p>
                </div>
              ) : (
                chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        chat.role === "user" ? "bg-purple-600 text-white" : "bg-white border"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                    </div>
                  </div>
                ))
              )}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-white border p-3 rounded-lg">
                    <p className="text-sm text-gray-500">*{selectedBot?.name} is thinking...*</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Textarea
                placeholder={`Chat with ${selectedBot?.name}...`}
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                className="flex-1 min-h-[60px] max-h-[120px]"
                disabled={isGenerating}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim() || isGenerating}
                className="bg-gradient-to-r from-purple-600 to-orange-500 text-white"
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
