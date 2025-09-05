'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Send, Bot, User, Loader2 } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant' | 'bot'
  message: string
}

interface ChatBotProps {
  botName: string
  botPrompt: string
  className?: string
  initialMessage?: string
}

export default function ChatBot({ 
  botName, 
  botPrompt, 
  className = "", 
  initialMessage = "Hi! Start chatting with me!" 
}: ChatBotProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage = currentMessage.trim()
    const newHistory = [...chatHistory, { role: 'user' as const, message: userMessage }]
    setChatHistory(newHistory)
    setCurrentMessage("")
    setIsGenerating(true)

    try {
      // Call the internal chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          botPrompt: botPrompt,
          botName: botName,
          chatHistory: newHistory.slice(0, -1) // Don't include current message in history
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get bot response')
      }

      const data = await response.json()
      const botResponse = data.response || "I'm having trouble thinking right now... 🤔"

      setChatHistory([...newHistory, { role: 'assistant', message: botResponse }])
    } catch (error) {
      console.error('Error getting bot response:', error)
      
      // Character-appropriate fallback response
      const fallbackResponse = `*glitches briefly* My systems are having a moment! As someone who ${botPrompt.toLowerCase()}, I should probably say something clever here... but I'm experiencing some technical difficulties! 🤖⚡`
      
      setChatHistory([...newHistory, { role: 'assistant', message: fallbackResponse }])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setChatHistory([])
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-purple-600" />
          <CardTitle className="text-lg">{botName}</CardTitle>
        </div>
        <div className="ml-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearChat}
            disabled={chatHistory.length === 0}
          >
            Clear Chat
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Chat History */}
        <div className="h-80 overflow-y-auto border rounded-lg p-4 space-y-3 bg-gray-50">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">{initialMessage}</p>
              <p className="text-xs text-gray-400 mt-1">{botPrompt}</p>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    chat.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-900 border"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {chat.role !== "user" && (
                      <Bot className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    )}
                    {chat.role === "user" && (
                      <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm">{chat.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {/* Loading indicator */}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-white border">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-purple-600" />
                  <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                  <p className="text-sm text-gray-600">Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isGenerating}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isGenerating}
            size="sm"
            className="px-3"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
