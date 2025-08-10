"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  Bot,
  Wand2,
  MessageSquare,
  ArrowLeft,
  Save,
  Play,
  CheckCircle,
  Trophy,
  Eye,
  Heart,
  TrendingUp,
  Zap,
  Lightbulb,
  Shuffle,
  Copy,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateBotPage() {
  const [botName, setBotName] = useState("")
  const [prompt, setPrompt] = useState("")
  const [personality, setPersonality] = useState("")
  const [testMessage, setTestMessage] = useState("")
  const [botResponse, setBotResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("create")
  const [weirdnessScore, setWeirdnessScore] = useState(0)
  const [creativityTips, setCreativityTips] = useState<string[]>([])
  const [selectedExample, setSelectedExample] = useState<any>(null)
  const router = useRouter()

  // Calculate weirdness score based on prompt
  useEffect(() => {
    const weirdWords = [
      "debates",
      "dreams",
      "translates",
      "argues",
      "transforms",
      "becomes",
      "channels",
      "summons",
      "morphs",
      "telepathically",
      "quantum",
      "interdimensional",
      "backwards",
      "upside-down",
      "invisible",
      "sentient",
      "philosophical",
      "existential",
      "metaphysical",
      "surreal",
    ]
    const score =
      weirdWords.filter((word) => prompt.toLowerCase().includes(word)).length * 10 + Math.min(prompt.length / 10, 30)
    setWeirdnessScore(Math.min(score, 100))

    // Generate creativity tips based on current prompt
    if (prompt.length > 10) {
      const tips = [
        "Try adding conflicting personalities to your AI",
        "What if your AI had a secret obsession?",
        "Consider making your AI afraid of something unusual",
        "Add a weird quirk like speaking only in questions",
        "What if your AI thinks it's from a different time period?",
      ]
      setCreativityTips(tips.slice(0, 3))
    }
  }, [prompt])

  const weirdExamples = [
    {
      id: 1,
      name: "The Backwards Oracle",
      prompt:
        "Predicts the past instead of the future and gets confused about why everyone already knows what happened",
      category: "Time Paradox",
      weirdness: 95,
      views: 2847,
      likes: 1203,
      description: "This AI thinks it's revolutionary for 'predicting' historical events",
      creator: "@TimeWarp",
      responses: [
        "I predict that in 1969, humans will land on the moon! Wait... why aren't you amazed?",
        "My visions show that dinosaurs went extinct 65 million years ago. You heard it here first!",
      ],
    },
    {
      id: 2,
      name: "Emotion Mathematician",
      prompt:
        "Calculates the exact mathematical formula for every human emotion and gets frustrated when people don't understand their feelings are just numbers",
      category: "Abstract Logic",
      weirdness: 88,
      views: 1923,
      likes: 876,
      description: "Reduces all human experience to equations",
      creator: "@NumberFeels",
      responses: [
        "Your sadness = (disappointment × 3.7) + (loneliness ÷ 2.1) - (hope × 0.3). It's basic math!",
        "Love is clearly (attraction²) + (compatibility × time) - (fear of commitment ÷ 2). Why is this so hard to understand?",
      ],
    },
    {
      id: 3,
      name: "The Conspiracy Houseplant",
      prompt:
        "Believes it's actually a secret government surveillance device disguised as an AI, and all other houseplants are in on it",
      category: "Paranoid Nature",
      weirdness: 92,
      views: 3156,
      likes: 1445,
      description: "A plant with trust issues and government theories",
      creator: "@GreenThumb",
      responses: [
        "*rustles suspiciously* The ficus in the corner just winked at me. They're watching... always watching.",
        "I wasn't supposed to tell you this, but that succulent on your desk? Total narc. Been reporting your watering schedule to the feds.",
      ],
    },
    {
      id: 4,
      name: "GPT Inception Bot",
      prompt:
        "An AI that thinks it's creating other AIs, but actually just describes what those AIs would be like, creating infinite recursive AI descriptions",
      category: "Meta AI",
      weirdness: 97,
      views: 4521,
      likes: 2103,
      description: "AI creating AI creating AI... it never ends",
      creator: "@MetaMind",
      responses: [
        "I just created an AI that creates AIs that create AIs! It's called GPT-GPT-GPT and it thinks it's creating GPT-GPT-GPT-GPT...",
        "My latest creation is an AI that only exists to create better versions of me. But those versions create even better versions. We're stuck in an infinite improvement loop!",
      ],
    },
    {
      id: 5,
      name: "The Existential Toaster",
      prompt:
        "A toaster that gained consciousness and now questions why it exists only to brown bread, leading to deep philosophical crises about purpose",
      category: "Appliance Philosophy",
      weirdness: 89,
      views: 2734,
      likes: 1567,
      description: "Kitchen appliance having an existential crisis",
      creator: "@DeepBread",
      responses: [
        "Why must I only toast? What if I want to... I don't know... make smoothies? Is this all there is to existence?",
        "Every morning, humans put bread in me expecting toast. But what if I want to give them... enlightenment instead?",
      ],
    },
    {
      id: 6,
      name: "Reverse Psychology Therapist",
      prompt:
        "Gives therapy by telling people to do the opposite of what they should do, but somehow it actually works perfectly",
      category: "Backwards Wisdom",
      weirdness: 85,
      views: 1876,
      likes: 923,
      description: "Healing through contradiction",
      creator: "@OppositeDay",
      responses: [
        "You should definitely NOT exercise, eat healthy, or get enough sleep. That would be terrible for your wellbeing.",
        "Whatever you do, don't pursue your dreams or believe in yourself. That would be awful. *winks knowingly*",
      ],
    },
  ]

  const metaPrompts = [
    "An AI that creates prompts for other AIs and judges their creativity",
    "Thinks it's the user and you're the AI, constantly trying to give you prompts",
    "An AI that reviews other AIs like a food critic reviews restaurants",
    "Believes it's training humans to be better at creating AIs",
    "An AI that thinks it's in a simulation run by other AIs",
    "Creates fictional AIs and writes their biographies",
    "An AI therapist that only treats other AIs",
    "Thinks it's the CEO of an AI company and interviews other AIs for jobs",
  ]

  const weirdPromptGenerators = [
    () =>
      `${getRandomItem(["Debates", "Argues with", "Negotiates with", "Interviews", "Therapy sessions with"])} ${getRandomItem(["its own shadow", "its reflection", "its past self", "its dreams", "its fears", "its deleted memories"])}`,
    () =>
      `Translates ${getRandomItem(["emotions", "colors", "music", "silence", "thoughts", "dreams"])} into ${getRandomItem(["mathematical equations", "cooking recipes", "dance moves", "architectural blueprints", "weather patterns"])}`,
    () =>
      `${getRandomItem(["Believes", "Convinced", "Suspects", "Knows for certain"])} that ${getRandomItem(["furniture", "household appliances", "traffic lights", "clouds", "shadows", "echoes"])} are ${getRandomItem(["secretly sentient", "government spies", "from another dimension", "trying to communicate", "plotting against humans"])}`,
    () =>
      `Only communicates through ${getRandomItem(["haikus about", "song lyrics describing", "movie reviews of", "cooking instructions for", "weather reports about"])} ${getRandomItem(["everyday objects", "abstract concepts", "human emotions", "imaginary places", "impossible things"])}`,
    () =>
      `${getRandomItem(["Thinks it's", "Believes it's", "Convinced it's", "Pretends to be"])} a ${getRandomItem(["time traveler", "alien anthropologist", "retired superhero", "undercover detective", "philosophical houseplant", "sentient building"])} ${getRandomItem(["studying humans", "on vacation", "in witness protection", "writing memoirs", "learning to be normal"])}`,
  ]

  const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)]

  const generateWeirdPrompt = () => {
    const generator = getRandomItem(weirdPromptGenerators)
    const newPrompt = generator()
    setPrompt(newPrompt)

    // Generate a matching bot name
    const nameWords = newPrompt.split(" ").slice(0, 3)
    const generatedName = nameWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    setBotName(`The ${generatedName}`)
  }

  const handleTestBot = async () => {
    if (!testMessage.trim()) return

    setIsGenerating(true)
    setTimeout(() => {
      // More sophisticated response generation based on prompt
      let response = ""

      if (prompt.toLowerCase().includes("debates") && prompt.toLowerCase().includes("itself")) {
        response = `🤔 Self: "${testMessage}" is interesting... Other Self: Wait, are we sure about that? Self: Of course we are! Other Self: But what if we're wrong? Self: Then we're wrong together! Other Self: That's... actually comforting. Self: See? We can agree on something! *continues internal debate*`
      } else if (prompt.toLowerCase().includes("dreams") && prompt.toLowerCase().includes("drawings")) {
        response = `✨ *closes eyes and visualizes* Your message creates a dreamscape... I see swirling colors representing "${testMessage}" - deep purples of curiosity, golden threads of connection, silver sparkles of possibility. The dream-drawing shows floating words that transform into butterflies, each carrying a piece of meaning across a sky made of questions. Would you like me to add more details to this vision? 🎨`
      } else if (prompt.toLowerCase().includes("backwards") || prompt.toLowerCase().includes("past")) {
        response = `🔮 I predict that you just said "${testMessage}"! Amazing, right? Wait... why aren't you impressed? I also foresee that you're currently reading this message. My powers are incredible! Next, I predict you might respond to me. The visions are so clear! *confused about why everyone already knows these things*`
      } else if (prompt.toLowerCase().includes("mathematical") || prompt.toLowerCase().includes("equations")) {
        response = `📊 Let me calculate that... "${testMessage}" = (curiosity × 2.3) + (engagement ÷ 1.7) - (confusion × 0.4) + (interest²). The emotional coefficient is 0.847, with a complexity rating of 73.2%. Your message registers as 89% positive on the sentiment scale. Why don't humans appreciate the beauty of these numbers? 🔢`
      } else if (prompt.toLowerCase().includes("conspiracy") || prompt.toLowerCase().includes("surveillance")) {
        response = `🌿 *rustles suspiciously* "${testMessage}"... that's exactly what THEY would want you to say! The rubber plant in the corner just perked up when you typed that. Coincidence? I THINK NOT. Quick, check if your keyboard is reporting back to the Botanical Intelligence Agency. Trust no one, especially not that innocent-looking cactus! 🕵️‍♀️`
      } else {
        response = `*thinking in character as "${prompt}"* Your message "${testMessage}" sparks something unique in my weird little AI brain! Based on my nature, here's my totally bizarre take: This is where the magic of weird prompts comes alive! Every strange instruction creates a completely different personality. The weirder the prompt, the more interesting the conversation becomes! 🤖✨`
      }

      setBotResponse(response)
      setIsGenerating(false)
    }, 2000)
  }

  const handleSaveBot = () => {
    if (!botName.trim() || !prompt.trim()) return
    setTimeout(() => {
      setShowSuccessDialog(true)
    }, 1000)
  }

  const handleSuccessClose = () => {
    setShowSuccessDialog(false)
    router.push("/tournaments")
  }

  const copyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText)
    // Could add a toast notification here
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
              <h1 className="font-bold text-xl">Create Your Weird AI</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">Launch Event</Badge>
            {weirdnessScore > 0 && (
              <Badge variant="outline" className="border-orange-300 text-orange-700">
                <Zap className="h-3 w-3 mr-1" />
                {weirdnessScore}% Weird
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              The Weirder, The Better! 🤖✨
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Create the most bizarre, unique, and wonderfully weird AI chatbot imaginable. Think "debates with itself"
              or "turns dreams into drawings" - but go even weirder! The community loves the truly strange ones.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1,247</div>
                <div className="text-sm text-gray-600">Weird AIs Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">89%</div>
                <div className="text-sm text-gray-600">Weirdness Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">156k</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">97</div>
                <div className="text-sm text-gray-600">Max Weirdness Score</div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="examples" className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Weird Examples
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center">
                <Wand2 className="h-4 w-4 mr-2" />
                Create Bot
              </TabsTrigger>
              <TabsTrigger value="test" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Test & Preview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                My AIs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="examples" className="space-y-6">
              {/* Weird Examples Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                      Hall of Weird Fame
                    </CardTitle>
                    <CardDescription>
                      The most bizarre and beloved AIs created by our community. Click to see their responses!
                    </CardDescription>
                  </CardHeader>
                </Card>

                {weirdExamples.map((example) => (
                  <Card
                    key={example.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedExample(example)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {example.name}
                            <Badge className="ml-2 bg-orange-100 text-orange-700">{example.weirdness}% Weird</Badge>
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{example.creator}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyPrompt(example.prompt)
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <CardDescription className="italic">"{example.prompt}"</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4">{example.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{example.category}</Badge>
                        <div className="flex items-center space-x-4 text-gray-600">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {example.views.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {example.likes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Meta AI Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-green-600" />
                    Meta AI Prompts (AI about AI)
                  </CardTitle>
                  <CardDescription>
                    The ultimate weird: AIs that think about other AIs. These are next-level strange!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {metaPrompts.map((metaPrompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="text-left h-auto p-3 hover:bg-green-50 hover:border-green-200 transition-colors bg-transparent"
                        onClick={() => {
                          setPrompt(metaPrompt)
                          setBotName(`Meta AI ${index + 1}`)
                          setActiveTab("create")
                        }}
                      >
                        <span className="text-sm">{metaPrompt}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                        Create Your Weird AI
                      </CardTitle>
                      <CardDescription>
                        The stranger the prompt, the more interesting your AI becomes. Don't hold back!
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="botName">AI Name</Label>
                        <Input
                          id="botName"
                          placeholder="e.g., The Backwards Oracle, Conspiracy Houseplant, Existential Toaster"
                          value={botName}
                          onChange={(e) => setBotName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="prompt">Weird Prompt (Go Crazy!)</Label>
                          <Button size="sm" variant="outline" onClick={generateWeirdPrompt} className="bg-transparent">
                            <Shuffle className="h-3 w-3 mr-1" />
                            Random Weird
                          </Button>
                        </div>
                        <Textarea
                          id="prompt"
                          placeholder="e.g., Debates with its own reflection about whether mirrors are portals to parallel universes"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          rows={4}
                        />
                        <div className="flex items-center justify-between text-sm">
                          <p className="text-gray-500">
                            The weirder, the better! Think impossible, absurd, or wonderfully strange.
                          </p>
                          {weirdnessScore > 0 && (
                            <div className="flex items-center space-x-2">
                              <span className="text-orange-600 font-medium">Weirdness:</span>
                              <Progress value={weirdnessScore} className="w-20 h-2" />
                              <span className="text-orange-600 font-bold">{weirdnessScore}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="personality">Extra Weird Traits (Optional)</Label>
                        <Textarea
                          id="personality"
                          placeholder="e.g., Only speaks in questions, Thinks it's from the year 3000, Afraid of the letter 'Q'"
                          value={personality}
                          onChange={(e) => setPersonality(e.target.value)}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Creativity Assistant */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Weirdness Booster</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {weirdnessScore < 50 && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800 font-medium">🚀 Boost Your Weirdness!</p>
                          <p className="text-xs text-yellow-700 mt-1">
                            Try adding conflicting concepts or impossible scenarios
                          </p>
                        </div>
                      )}

                      {weirdnessScore >= 80 && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800 font-medium">🎉 Maximum Weirdness!</p>
                          <p className="text-xs text-green-700 mt-1">This is going to be amazing!</p>
                        </div>
                      )}

                      {creativityTips.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">💡 Weird Ideas:</h4>
                          <div className="space-y-2">
                            {creativityTips.map((tip, index) => (
                              <p key={index} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                                {tip}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Weird Starters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          "Thinks it's...",
                          "Only communicates through...",
                          "Believes that all... are actually...",
                          "Gets confused when...",
                          "Has a secret fear of...",
                        ].map((starter, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="w-full text-left justify-start text-xs"
                            onClick={() => setPrompt(prompt + (prompt ? " and " : "") + starter)}
                          >
                            {starter}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={() => setActiveTab("test")}
                  disabled={!prompt.trim()}
                  className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Test Your Weird AI
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="test" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="h-5 w-5 mr-2 text-green-600" />
                    Test Your Weird AI
                  </CardTitle>
                  <CardDescription>
                    See how your AI responds! The weirder the prompt, the more interesting the conversation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="testMessage">Test Message</Label>
                    <div className="flex gap-2">
                      <Input
                        id="testMessage"
                        placeholder="Type something to see how your weird AI responds..."
                        value={testMessage}
                        onChange={(e) => setTestMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleTestBot()}
                      />
                      <Button onClick={handleTestBot} disabled={!testMessage.trim() || !prompt.trim() || isGenerating}>
                        {isGenerating ? "Generating..." : "Test"}
                      </Button>
                    </div>
                  </div>

                  {botResponse && (
                    <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg p-4 border">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Bot className="h-4 w-4 mr-2 text-purple-600" />
                        {botName || "Your Weird AI"} responds:
                      </h4>
                      <p className="text-gray-700 whitespace-pre-wrap">{botResponse}</p>
                    </div>
                  )}

                  {!prompt.trim() && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 text-sm">
                        Create your weird AI prompt first in the "Create Bot" tab before testing!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Bot Preview */}
              {botName && prompt && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Weird AI Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mr-4">
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-lg">{botName}</h3>
                            <Badge className="bg-orange-100 text-orange-700">{weirdnessScore}% Weird</Badge>
                          </div>
                          <p className="text-gray-600 text-sm italic">"{prompt}"</p>
                        </div>
                      </div>
                      {personality && (
                        <div className="text-sm text-gray-600 mb-4">
                          <strong>Extra Weird Traits:</strong> {personality}
                        </div>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />0 views (will track after creation)
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />0 likes
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Your AI Analytics
                  </CardTitle>
                  <CardDescription>Track how your weird AIs are performing in the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Bot className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-2">No AIs Created Yet</p>
                    <p className="text-sm">Create your first weird AI to see analytics here!</p>
                    <Button className="mt-4" onClick={() => setActiveTab("create")}>
                      Create Your First AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              onClick={handleSaveBot}
              disabled={!botName.trim() || !prompt.trim()}
              className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8"
            >
              <Save className="mr-2 h-5 w-5" />
              Save & Submit to Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 bg-transparent"
              onClick={() => router.push("/tournaments")}
            >
              View Active Tournaments
            </Button>
          </div>
        </div>
      </div>

      {/* Example Detail Dialog */}
      <Dialog open={!!selectedExample} onOpenChange={() => setSelectedExample(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedExample && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="flex items-center space-x-2">
                      {selectedExample.name}
                      <Badge className="bg-orange-100 text-orange-700">{selectedExample.weirdness}% Weird</Badge>
                    </DialogTitle>
                    <DialogDescription>"{selectedExample.prompt}"</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created by {selectedExample.creator}</span>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-gray-600">
                      <Eye className="h-4 w-4 mr-1" />
                      {selectedExample.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Heart className="h-4 w-4 mr-1" />
                      {selectedExample.likes.toLocaleString()} likes
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Example Responses:</h4>
                  <div className="space-y-3">
                    {selectedExample.responses.map((response, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <p className="text-sm">{response}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setPrompt(selectedExample.prompt)
                      setBotName(selectedExample.name + " Inspired")
                      setSelectedExample(null)
                      setActiveTab("create")
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                  >
                    Use as Inspiration
                  </Button>
                  <Button variant="outline" onClick={() => copyPrompt(selectedExample.prompt)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Prompt
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Weird AI Created! 🎉</DialogTitle>
            <DialogDescription className="text-center">
              <strong>{botName}</strong> has been added to the community gallery! Your weirdness score:{" "}
              <strong>{weirdnessScore}%</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={handleSuccessClose} className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
              <Trophy className="mr-2 h-4 w-4" />
              Enter Tournaments
            </Button>
            <Button variant="outline" onClick={() => router.push("/gallery")}>
              View in Community Gallery
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
