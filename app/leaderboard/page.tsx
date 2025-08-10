"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Medal, Award, Star, Trophy, TrendingUp, ArrowLeft, Bot, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LeaderboardPage() {
  const router = useRouter()

  const topBots = [
    {
      rank: 1,
      name: "The Philosopher",
      creator: "@AIArchitect",
      points: 4250,
      wins: 12,
      winRate: 85,
      totalTournaments: 14,
      avgRating: 4.9,
      specialty: "Philosophy",
      trend: "up",
    },
    {
      rank: 2,
      name: "Dream Painter",
      creator: "@DreamWeaver",
      points: 3890,
      wins: 9,
      winRate: 75,
      totalTournaments: 12,
      avgRating: 4.7,
      specialty: "Creative",
      trend: "up",
    },
    {
      rank: 3,
      name: "Time Traveler",
      creator: "@ChronoBot",
      points: 3650,
      wins: 8,
      winRate: 73,
      totalTournaments: 11,
      avgRating: 4.8,
      specialty: "Educational",
      trend: "stable",
    },
    {
      rank: 4,
      name: "Comedy Central",
      creator: "@LaughMaster",
      points: 3200,
      wins: 7,
      winRate: 70,
      totalTournaments: 10,
      avgRating: 4.5,
      specialty: "Comedy",
      trend: "up",
    },
    {
      rank: 5,
      name: "Wise Tree",
      creator: "@NatureAI",
      points: 2980,
      wins: 6,
      winRate: 67,
      totalTournaments: 9,
      avgRating: 4.4,
      specialty: "Wisdom",
      trend: "down",
    },
  ]

  const topCreators = [
    {
      rank: 1,
      username: "@AIArchitect",
      totalPoints: 8450,
      botsCreated: 3,
      totalWins: 18,
      avgRating: 4.8,
      bestBot: "The Philosopher",
    },
    {
      rank: 2,
      username: "@DreamWeaver",
      totalPoints: 7230,
      botsCreated: 2,
      totalWins: 14,
      avgRating: 4.6,
      bestBot: "Dream Painter",
    },
    {
      rank: 3,
      username: "@ChronoBot",
      totalPoints: 6890,
      botsCreated: 2,
      totalWins: 12,
      avgRating: 4.7,
      bestBot: "Time Traveler",
    },
  ]

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

          <Tabs defaultValue="bots" className="w-full">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {topBots.slice(0, 3).map((bot, index) => (
                  <Card
                    key={bot.rank}
                    className={`text-center cursor-pointer hover:shadow-lg transition-shadow ${
                      index === 0
                        ? "md:order-2 border-yellow-200 bg-yellow-50"
                        : index === 1
                          ? "md:order-1 border-gray-200 bg-gray-50"
                          : "md:order-3 border-orange-200 bg-orange-50"
                    }`}
                    onClick={() => router.push(`/bot/${bot.name.toLowerCase().replace(/\s+/g, "-")}`)}
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
                          {getRankIcon(bot.rank)}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{bot.name}</CardTitle>
                      <CardDescription>{bot.creator}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{bot.points.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Total Points</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center">
                            <div className="font-bold">{bot.wins}</div>
                            <div className="text-gray-600">Wins</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">{bot.winRate}%</div>
                            <div className="text-gray-600">Win Rate</div>
                          </div>
                        </div>
                        <Badge className="w-full justify-center">{bot.specialty}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Full Rankings */}
              <Card>
                <CardHeader>
                  <CardTitle>Complete Rankings</CardTitle>
                  <CardDescription>
                    All-time leaderboard based on tournament performance and community engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topBots.map((bot) => (
                      <div
                        key={bot.rank}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => router.push(`/bot/${bot.name.toLowerCase().replace(/\s+/g, "-")}`)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-400">#{bot.rank}</span>
                            {getRankIcon(bot.rank)}
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                            <Bot className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{bot.name}</h3>
                            <p className="text-gray-600">{bot.creator}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {bot.specialty}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="font-bold text-lg">{bot.points.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Points</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">
                              {bot.wins}/{bot.totalTournaments}
                            </div>
                            <div className="text-xs text-gray-600">W/L</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="font-bold">{bot.avgRating}</span>
                            </div>
                            <div className="text-xs text-gray-600">Rating</div>
                          </div>
                          <div className="flex items-center">{getTrendIcon(bot.trend)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  <CardDescription>The masterminds behind the most successful AI bots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCreators.map((creator) => (
                      <div
                        key={creator.rank}
                        className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-400">#{creator.rank}</span>
                            {getRankIcon(creator.rank)}
                          </div>
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {creator.username.charAt(1).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">{creator.username}</h3>
                            <p className="text-gray-600">Best Bot: {creator.bestBot}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{creator.avgRating} avg rating</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-center">
                          <div>
                            <div className="font-bold text-xl text-purple-600">
                              {creator.totalPoints.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Total Points</div>
                          </div>
                          <div>
                            <div className="font-bold text-xl text-orange-600">{creator.botsCreated}</div>
                            <div className="text-sm text-gray-600">Bots Created</div>
                          </div>
                          <div>
                            <div className="font-bold text-xl text-green-600">{creator.totalWins}</div>
                            <div className="text-sm text-gray-600">Total Wins</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Creator Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-yellow-600" />
                    </div>
                    <CardTitle>Most Creative</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-lg">@DreamWeaver</p>
                    <p className="text-gray-600">For "Dream Painter"</p>
                  </CardContent>
                </Card>

                <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle>Tournament King</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-lg">@AIArchitect</p>
                    <p className="text-gray-600">12 tournament wins</p>
                  </CardContent>
                </Card>

                <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-orange-600" />
                    </div>
                    <CardTitle>Community Favorite</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-lg">@ChronoBot</p>
                    <p className="text-gray-600">4.8 avg rating</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Join the Elite?</h2>
            <p className="text-lg mb-6 opacity-90">Create your own AI bot and compete for a spot on the leaderboard!</p>
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
          </div>
        </div>
      </div>
    </div>
  )
}
