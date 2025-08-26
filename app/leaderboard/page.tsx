"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Medal, Award, Star, Trophy, TrendingUp, ArrowLeft, Bot, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

interface LeaderboardEntry {
  _id: string;
  botId: string;
  botName: string;
  creator: string;
  category: string;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  totalMatches: number;
  winRate: number;
  lastMatch: string;
}

interface Bot {
  _id: string;
  name: string;
  prompt: string;
  category: string;
  weirdness: number;
  views: number;
  likes: number;
  creator: string;
  description: string;
}

export default function LeaderboardPage() {
  const router = useRouter()
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [topBots, setTopBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("bots")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leaderboard data
        const leaderboardResponse = await fetch('/api/leaderboard?sortBy=points&sortOrder=desc&limit=50');
        const leaderboard = await leaderboardResponse.json();
        setLeaderboardData(leaderboard);

        // Fetch top bots for additional info
        const botsResponse = await fetch('/api/bots/examples?limit=10');
        const bots = await botsResponse.json();
        setTopBots(bots);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-500" />
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />
      default:
        return <Star className="h-6 w-6 text-blue-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="w-4 h-4" />
    }
  }

  const calculateTrend = (entry: LeaderboardEntry) => {
    // Simple trend calculation based on win rate
    if (entry.winRate > 70) return "up";
    if (entry.winRate < 50) return "down";
    return "stable";
  }

  const getTopCreators = () => {
    const creatorMap = new Map<string, { username: string; totalPoints: number; botsCreated: number; totalWins: number; bestBot: string }>();
    
    leaderboardData.forEach(entry => {
      if (creatorMap.has(entry.creator)) {
        const creator = creatorMap.get(entry.creator)!;
        creator.totalPoints += entry.points;
        creator.totalWins += entry.wins;
        if (entry.points > creatorMap.get(entry.creator)!.totalPoints) {
          creator.bestBot = entry.botName;
        }
      } else {
        creatorMap.set(entry.creator, {
          username: entry.creator,
          totalPoints: entry.points,
          botsCreated: 1,
          totalWins: entry.wins,
          bestBot: entry.botName
        });
      }
    });

    return Array.from(creatorMap.values())
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 10);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leaderboard...</p>
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
              <Trophy className="h-6 w-6 text-yellow-600" />
              <h1 className="font-bold text-xl">Leaderboard</h1>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">Hall of Fame</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Champions Arena
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating the most successful AI bots and their creators. Rankings based on tournament performance,
              community votes, and overall excellence.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {leaderboardData.length}
                </div>
                <p className="text-gray-600">Ranked Bots</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {leaderboardData.reduce((sum, entry) => sum + entry.totalMatches, 0)}
                </div>
                <p className="text-gray-600">Total Matches</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {leaderboardData.reduce((sum, entry) => sum + entry.wins, 0)}
                </div>
                <p className="text-gray-600">Total Wins</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {new Set(leaderboardData.map(entry => entry.creator)).size}
                </div>
                <p className="text-gray-600">Active Creators</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bots" className="flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                Top Bots
              </TabsTrigger>
              <TabsTrigger value="creators" className="flex items-center">
                <Crown className="h-4 w-4 mr-2" />
                Top Creators
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bots" className="space-y-6">
              {/* Top 3 Podium */}
              {leaderboardData.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {leaderboardData.slice(0, 3).map((bot, index) => (
                    <Card
                      key={bot._id}
                      className={`text-center cursor-pointer hover:shadow-lg transition-shadow ${
                        index === 0
                          ? "md:order-2 border-yellow-200 bg-yellow-50"
                          : index === 1
                            ? "md:order-1 border-gray-200 bg-gray-50"
                            : "md:order-3 border-orange-200 bg-orange-50"
                      }`}
                      onClick={() => router.push(`/bot/${bot.botId}`)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex justify-center mb-4">
                          <div
                            className={`w-20 h-20 rounded-full flex items-center justify-center ${
                              index === 0
                                ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                                : index === 1
                                  ? "bg-gradient-to-br from-gray-400 to-gray-600"
                                  : "bg-gradient-to-br from-orange-400 to-orange-600"
                            }`}
                          >
                            {getRankIcon(index + 1)}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{bot.botName}</CardTitle>
                        <CardDescription className="text-sm">
                          by {bot.creator}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Points:</span>
                            <span className="font-bold text-lg">{bot.points.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Win Rate:</span>
                            <span className="font-bold">{bot.winRate}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Matches:</span>
                            <span>{bot.totalMatches}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Full Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                    Complete Rankings
                  </CardTitle>
                  <CardDescription>
                    All ranked bots sorted by performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {leaderboardData.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <p>No leaderboard data available yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {leaderboardData.map((entry, index) => (
                        <div
                          key={entry._id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => router.push(`/bot/${entry.botId}`)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-lg w-8">{index + 1}</span>
                              {getRankIcon(index + 1)}
                            </div>
                            <div>
                              <p className="font-bold">{entry.botName}</p>
                              <p className="text-sm text-gray-600">{entry.creator}</p>
                              <Badge variant="outline" className="text-xs">
                                {entry.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{entry.points.toLocaleString()} pts</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>{entry.wins}W / {entry.losses}L</span>
                              <span>•</span>
                              <span>{entry.winRate}%</span>
                              {getTrendIcon(calculateTrend(entry))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="creators" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="h-5 w-5 mr-2 text-yellow-600" />
                    Top Creators
                  </CardTitle>
                  <CardDescription>
                    Most successful bot creators based on total points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const topCreators = getTopCreators();
                    return topCreators.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Crown className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p>No creator data available yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {topCreators.map((creator, index) => (
                          <div
                            key={creator.username}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-3">
                                <span className="font-bold text-lg w-8">{index + 1}</span>
                                {getRankIcon(index + 1)}
                              </div>
                              <div>
                                <p className="font-bold">{creator.username}</p>
                                <p className="text-sm text-gray-600">
                                  {creator.botsCreated} bot{creator.botsCreated !== 1 ? 's' : ''} created
                                </p>
                                <p className="text-xs text-gray-500">
                                  Best: {creator.bestBot}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{creator.totalPoints.toLocaleString()} pts</p>
                              <p className="text-sm text-gray-600">{creator.totalWins} total wins</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-purple-600 to-orange-500 text-white border-0">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-bold mb-4">Want to Join the Leaderboard?</h3>
                <p className="text-lg opacity-90 mb-6">
                  Create your own AI bot and start competing in tournaments!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                    onClick={() => router.push("/create")}
                  >
                    <Bot className="mr-2 h-5 w-5" />
                    Create Your Bot
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                    onClick={() => router.push("/tournaments")}
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    Join Tournaments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
