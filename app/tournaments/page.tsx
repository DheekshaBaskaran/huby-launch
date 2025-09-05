"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Clock, Users, Star, Zap, ArrowLeft, Crown, Medal, Award, Bot, CheckCircle, MessageSquare, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import ChatBot from "@/components/ChatBot"

interface Tournament {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  status: string;
  category: string;
  prize: string;
  rules: string[];
  participants: string[];
  winner: string | null;
  createdAt: string;
}

interface UserBot {
  _id: string;
  name: string;
  prompt: string;
  category: string;
}

export default function TournamentsPage() {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null)
  const [selectedBot, setSelectedBot] = useState<string>("")
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [joinedTournaments, setJoinedTournaments] = useState<string[]>([])
  const [activeTournaments, setActiveTournaments] = useState<Tournament[]>([])
  const [completedTournaments, setCompletedTournaments] = useState<Tournament[]>([])
  const [userBots, setUserBots] = useState<UserBot[]>([])
  const [loading, setLoading] = useState(true)
  const [showChatPreview, setShowChatPreview] = useState(false)
  const [previewBot, setPreviewBot] = useState<UserBot | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch active tournaments
        const activeResponse = await fetch('/api/tournaments?status=active');
        const active = await activeResponse.json();
        setActiveTournaments(active);

        // Fetch completed tournaments
        const completedResponse = await fetch('/api/tournaments?status=completed');
        const completed = await completedResponse.json();
        setCompletedTournaments(completed);

        // Fetch user bots (non-example bots)
        const botsResponse = await fetch('/api/bots?limit=10');
        const botsData = await botsResponse.json();
        // Filter out example bots to show only user-created bots
        const userCreatedBots = botsData.bots.filter((bot: any) => !bot.isExample);
        setUserBots(userCreatedBots);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleJoinTournament = (tournamentId: string) => {
    setSelectedTournament(tournamentId)
    setShowJoinDialog(true)
  }

  const handleChatPreview = (bot: UserBot) => {
    setPreviewBot(bot)
    setShowChatPreview(true)
  }

  const handleConfirmJoin = async () => {
    if (selectedBot && selectedTournament) {
      try {
        // Call API to join tournament
        const response = await fetch('/api/tournaments', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tournamentId: selectedTournament,
            botId: selectedBot,
            action: 'join'
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to join tournament:', errorData.error);
          return;
        }

        const updatedTournament = await response.json();
        
        // Update local state
        setJoinedTournaments([...joinedTournaments, selectedTournament]);
        setShowJoinDialog(false);
        setShowSuccessDialog(true);

        // Update tournament list with new participant count
        setActiveTournaments(prev => 
          prev.map(t => 
            t._id === selectedTournament 
              ? { ...t, currentParticipants: updatedTournament.currentParticipants }
              : t
          )
        );
      } catch (error) {
        console.error('Error joining tournament:', error);
      }
    }
  }

  const handleViewResults = (tournamentId: string) => {
    // Navigate to tournament results page
    router.push(`/tournament/${tournamentId}/results`)
  }

  const formatTimeLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return "Less than 1 hour";
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'ending-soon':
        return <Badge className="bg-orange-100 text-orange-700">Ending Soon</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tournaments...</p>
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
              <Trophy className="h-6 w-6 text-purple-600" />
              <h1 className="font-bold text-xl">Tournaments</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              🏆 Live Competitions
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              AI Tournament Arena
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compete with your AI bots in themed tournaments. Win prizes, climb leaderboards, and prove your bot's worth!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {activeTournaments.length}
                </div>
                <p className="text-gray-600">Active Tournaments</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {activeTournaments.reduce((sum, t) => sum + t.currentParticipants, 0)}
                </div>
                <p className="text-gray-600">Total Participants</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {completedTournaments.length}
                </div>
                <p className="text-gray-600">Completed</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {userBots.length}
                </div>
                <p className="text-gray-600">Your Bots</p>
              </CardContent>
            </Card>
          </div>

          {/* Tournament Tabs */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active">Active Tournaments</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="your-bots">Your Bots</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTournaments.map((tournament) => (
                  <Card key={tournament._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        {getStatusBadge(tournament.status)}
                        <Badge variant="outline">{tournament.category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{tournament.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {tournament.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Users className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="font-bold text-blue-600">
                              {tournament.currentParticipants}/{tournament.maxParticipants}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">Participants</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="h-4 w-4 text-orange-600 mr-1" />
                            <span className="font-bold text-orange-600">
                              {formatTimeLeft(tournament.endDate)}
                            </span>
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
                          joinedTournaments.includes(tournament._id)
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
                        } text-white`}
                        onClick={() => handleJoinTournament(tournament._id)}
                        disabled={joinedTournaments.includes(tournament._id)}
                      >
                        {joinedTournaments.includes(tournament._id) ? (
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

              {activeTournaments.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Tournaments</h3>
                  <p className="text-gray-500 mb-4">Check back later for new competitions!</p>
                  <Button onClick={() => router.push('/create')}>
                    <Bot className="mr-2 h-4 w-4" />
                    Create Your First Bot
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              {completedTournaments.length === 0 ? (
                <div className="text-center py-12">
                  <Crown className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Completed Tournaments</h3>
                  <p className="text-gray-500">Tournaments will appear here once they finish.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedTournaments.map((tournament) => (
                    <Card key={tournament._id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{tournament.name}</CardTitle>
                          <Badge className="bg-green-100 text-green-700">
                            <Crown className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Tournament Details</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Category:</span>
                                <span className="font-medium ml-2">{tournament.category}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Participants:</span>
                                <span className="font-medium ml-2">{tournament.currentParticipants}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Prize:</span>
                                <span className="font-medium ml-2">{tournament.prize}</span>
                              </div>
                              {tournament.winner && (
                                <div>
                                  <span className="text-gray-600">Winner:</span>
                                  <span className="font-medium ml-2">{tournament.winner}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                              <p className="text-gray-700 text-sm">{tournament.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button variant="outline" onClick={() => handleViewResults(tournament._id)}>
                            View Full Results
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="your-bots" className="space-y-6">
              {userBots.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Bots Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Create your first AI bot to start competing in tournaments!
                  </p>
                  <Button onClick={() => router.push("/create")}>
                    <Zap className="h-4 w-4 mr-2" />
                    Create Your First Bot
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Your AI Bots</h3>
                    <Button variant="outline" onClick={() => router.push("/create")}>
                      <Bot className="h-4 w-4 mr-2" />
                      Create New Bot
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userBots.map((bot) => (
                      <Card key={bot._id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{bot.category}</Badge>
                            <Bot className="h-5 w-5 text-purple-600" />
                          </div>
                          <CardTitle className="text-lg">{bot.name}</CardTitle>
                          <CardDescription className="text-sm line-clamp-2">
                            {bot.prompt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleChatPreview(bot)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Chat Preview
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => router.push("/gallery")}
                              className="flex-1"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View in Gallery
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                    Tournament Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Top performers across all tournaments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                      <div>Rank</div>
                      <div>Bot</div>
                      <div>Tournaments Won</div>
                      <div>Total Points</div>
                    </div>
                    
                    {/* Placeholder for leaderboard data */}
                    <div className="text-center py-8 text-gray-500">
                      <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <p>Leaderboard data will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Join Tournament Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Tournament</DialogTitle>
            <DialogDescription>
              Select which bot you want to enter in this tournament.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Your Bot</label>
              <Select value={selectedBot} onValueChange={setSelectedBot}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a bot to enter" />
                </SelectTrigger>
                <SelectContent>
                  {userBots.map((bot) => (
                    <SelectItem key={bot._id} value={bot._id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{bot.name}</span>
                        <span className="text-xs text-gray-500">{bot.category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmJoin} disabled={!selectedBot}>
                Join Tournament
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Successfully Joined!
            </DialogTitle>
            <DialogDescription>
              Your bot has been entered into the tournament. Good luck!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Preview Dialog */}
      <Dialog open={showChatPreview} onOpenChange={setShowChatPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
              Chat Preview: {previewBot?.name}
            </DialogTitle>
            <DialogDescription>
              Test your bot before entering tournaments. See how it responds to different prompts.
            </DialogDescription>
          </DialogHeader>
          
          {previewBot && (
            <div className="py-4">
              <ChatBot
                botName={previewBot.name}
                botPrompt={previewBot.prompt}
                initialMessage={`Hi! I'm ${previewBot.name}. ${previewBot.prompt} Let's chat and see how I perform!`}
                className="border-0 shadow-none"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
