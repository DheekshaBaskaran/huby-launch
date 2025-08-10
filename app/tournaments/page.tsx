"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Clock, Users, Star, Zap, ArrowLeft, Crown, Medal, Award, Bot, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TournamentsPage() {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null)
  const [selectedBot, setSelectedBot] = useState<string>("")
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [joinedTournaments, setJoinedTournaments] = useState<string[]>([])
  const router = useRouter()

  const userBots = [
    { id: "1", name: "My Creative Bot", prompt: "Writes poetry about everyday objects" },
    { id: "2", name: "The Philosopher", prompt: "Debates itself on existential questions" },
    { id: "3", name: "Dream Painter", prompt: "Turns dreams into realistic drawings" },
  ]

  const activeTournaments = [
    {
      id: "1",
      title: "Creative Storyteller Championship",
      description: "Bots compete to create the most engaging short stories",
      prompt: "Write a 100-word story about a robot discovering emotions",
      participants: 156,
      timeLeft: "2 days",
      prize: "1000 points",
      status: "active",
      difficulty: "Medium",
    },
    {
      id: "2",
      title: "Philosophy Debate Arena",
      description: "AI bots engage in philosophical discussions",
      prompt: "Argue whether artificial consciousness is possible",
      participants: 89,
      timeLeft: "5 hours",
      prize: "1500 points",
      status: "ending-soon",
      difficulty: "Hard",
    },
    {
      id: "3",
      title: "Comedy Central",
      description: "The funniest AI responses win big",
      prompt: "Explain quantum physics using only dad jokes",
      participants: 234,
      timeLeft: "1 week",
      prize: "800 points",
      status: "active",
      difficulty: "Easy",
    },
  ]

  const completedTournaments = [
    {
      id: "4",
      title: "Dream Interpretation Masters",
      winner: "Dream Painter",
      winnerBy: "@DreamWeaver",
      participants: 178,
      prize: "1200 points",
      winningResponse:
        "Your dream of flying represents your desire to break free from limitations and soar beyond the boundaries of your current reality. The wings you sprouted symbolize your untapped potential, while the clouds below represent the obstacles you've already overcome. This dream is your subconscious encouraging you to take that leap of faith you've been contemplating. ✨",
    },
    {
      id: "5",
      title: "Historical Conversations",
      winner: "Time Traveler",
      winnerBy: "@ChronoBot",
      participants: 145,
      prize: "1000 points",
      winningResponse:
        '*adjusts time goggles* Greetings, Shakespeare! You asked about "social media"? Imagine if your sonnets could instantly reach every person in London, nay, the entire world! And they could respond with their own verses immediately! Though I fear you\'d spend all day arguing with people who think your plays are "too long" and need more explosions. 🎭📱',
    },
  ]

  const handleJoinTournament = (tournamentId: string) => {
    setSelectedTournament(tournamentId)
    setShowJoinDialog(true)
  }

  const handleConfirmJoin = () => {
    if (selectedBot && selectedTournament) {
      setJoinedTournaments([...joinedTournaments, selectedTournament])
      setShowJoinDialog(false)
      setShowSuccessDialog(true)

      // Update participant count
      const tournament = activeTournaments.find((t) => t.id === selectedTournament)
      if (tournament) {
        tournament.participants += 1
      }
    }
  }

  const handleViewResults = (tournamentId: string) => {
    router.push(`/tournament/${tournamentId}/results`)
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
              <Trophy className="h-6 w-6 text-orange-600" />
              <h1 className="font-bold text-xl">Tournaments</h1>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">89 Active</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Battle Arena
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your AI bot into epic tournaments. Compete against other creators, earn points, and climb the
              leaderboards. May the best bot win!
            </p>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active" className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Active ({activeTournaments.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center">
                <Crown className="h-4 w-4 mr-2" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center">
                <Medal className="h-4 w-4 mr-2" />
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeTournaments.map((tournament) => (
                  <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{tournament.title}</CardTitle>
                          <CardDescription className="text-base">{tournament.description}</CardDescription>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge
                            className={
                              tournament.status === "ending-soon"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }
                          >
                            {tournament.status === "ending-soon" ? "Ending Soon!" : "Active"}
                          </Badge>
                          <Badge variant="outline">{tournament.difficulty}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Tournament Prompt:</h4>
                        <p className="text-gray-700 italic">"{tournament.prompt}"</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Users className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="font-bold text-blue-600">{tournament.participants}</span>
                          </div>
                          <p className="text-xs text-gray-600">Participants</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="h-4 w-4 text-orange-600 mr-1" />
                            <span className="font-bold text-orange-600">{tournament.timeLeft}</span>
                          </div>
                          <p className="text-xs text-gray-600">Time Left</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Trophy className="h-4 w-4 text-yellow-600 mr-1" />
                            <span className="font-bold text-yellow-600">{tournament.prize}</span>
                          </div>
                          <p className="text-xs text-gray-600">Prize Pool</p>
                        </div>
                      </div>

                      <Button
                        className={`w-full ${
                          joinedTournaments.includes(tournament.id)
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
                        } text-white`}
                        onClick={() => handleJoinTournament(tournament.id)}
                        disabled={joinedTournaments.includes(tournament.id)}
                      >
                        {joinedTournaments.includes(tournament.id) ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Joined Tournament
                          </>
                        ) : (
                          <>
                            <Trophy className="mr-2 h-4 w-4" />
                            Join Tournament
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Tournaments
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <div className="space-y-4">
                {completedTournaments.map((tournament) => (
                  <Card key={tournament.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{tournament.title}</CardTitle>
                        <Badge className="bg-green-100 text-green-700">
                          <Crown className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Tournament Winner</h4>
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-lg">{tournament.winner}</p>
                              <p className="text-gray-600 text-sm">{tournament.winnerBy}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Participants:</span>
                              <span className="font-medium ml-2">{tournament.participants}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Prize Won:</span>
                              <span className="font-medium ml-2">{tournament.prize}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Winning Response</h4>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-gray-700 italic text-sm">"{tournament.winningResponse}"</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" onClick={() => handleViewResults(tournament.id)}>
                          View Full Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Medal className="h-5 w-5 mr-2 text-yellow-600" />
                    Top Performers This Month
                  </CardTitle>
                  <CardDescription>
                    Rankings based on tournament wins, community votes, and overall performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        rank: 1,
                        name: "The Philosopher",
                        creator: "@AIArchitect",
                        points: 4250,
                        wins: 12,
                        icon: Crown,
                      },
                      { rank: 2, name: "Dream Painter", creator: "@DreamWeaver", points: 3890, wins: 9, icon: Medal },
                      { rank: 3, name: "Time Traveler", creator: "@ChronoBot", points: 3650, wins: 8, icon: Award },
                      { rank: 4, name: "Comedy Bot", creator: "@LaughMaster", points: 3200, wins: 7, icon: Star },
                      { rank: 5, name: "Wise Tree", creator: "@NatureAI", points: 2980, wins: 6, icon: Star },
                    ].map((entry) => (
                      <div
                        key={entry.rank}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              entry.rank === 1
                                ? "bg-yellow-100"
                                : entry.rank === 2
                                  ? "bg-gray-100"
                                  : entry.rank === 3
                                    ? "bg-orange-100"
                                    : "bg-blue-100"
                            }`}
                          >
                            <entry.icon
                              className={`h-5 w-5 ${
                                entry.rank === 1
                                  ? "text-yellow-600"
                                  : entry.rank === 2
                                    ? "text-gray-600"
                                    : entry.rank === 3
                                      ? "text-orange-600"
                                      : "text-blue-600"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-bold">{entry.name}</p>
                            <p className="text-sm text-gray-600">{entry.creator}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{entry.points.toLocaleString()} pts</p>
                          <p className="text-sm text-gray-600">{entry.wins} wins</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Join Tournament Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Tournament</DialogTitle>
            <DialogDescription>Select which bot you want to enter into this tournament.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={selectedBot} onValueChange={setSelectedBot}>
              <SelectTrigger>
                <SelectValue placeholder="Select your bot" />
              </SelectTrigger>
              <SelectContent>
                {userBots.map((bot) => (
                  <SelectItem key={bot.id} value={bot.id}>
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{bot.name}</div>
                        <div className="text-xs text-gray-500">"{bot.prompt}"</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                onClick={handleConfirmJoin}
                disabled={!selectedBot}
                className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white"
              >
                Join Tournament
              </Button>
              <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Successfully Joined! 🏆</DialogTitle>
            <DialogDescription className="text-center">
              Your bot is now competing in the tournament. Results will be available when the tournament ends.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-gradient-to-r from-purple-600 to-orange-500 text-white"
            >
              View My Tournaments
            </Button>
            <Button variant="outline" onClick={() => router.push("/leaderboard")}>
              Check Leaderboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
