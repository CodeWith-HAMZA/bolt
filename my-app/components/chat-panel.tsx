"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, User, Paperclip, ImageIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatPanelProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isGenerating: boolean
}

export function ChatPanel({ messages, onSendMessage, isGenerating }: ChatPanelProps) {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isGenerating) {
      onSendMessage(input)
      setInput("")
    }
  }

  const renderMessageContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g)
    return parts.map((part, i) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```(\w+)?\n?/g, "").replace(/```$/g, "")
        const language = part.match(/```(\w+)/)?.[1] || "tsx"
        return (
          <div key={i} className="my-3 overflow-hidden rounded-lg border border-border bg-muted">
            <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">{language}</span>
              <Badge variant="outline" className="text-xs">
                Code
              </Badge>
            </div>
            <pre className="overflow-x-auto p-4">
              <code className="font-mono text-sm text-foreground">{code}</code>
            </pre>
          </div>
        )
      }
      return (
        <p key={i} className="leading-relaxed text-foreground">
          {part}
        </p>
      )
    })
  }

  return (
    <div className="flex h-full flex-col bg-card">
      
      <div className="relative border-b border-border bg-gradient-to-r from-card to-card/95">
        <div className="flex items-center gap-3 px-6 py-2">
          <div className="flex h-3 w-3 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
            <Sparkles className="h-2 w-2 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Bolt Clone</h1>
            <p className="text-xs text-muted-foreground">AI-powered development assistant</p>
          </div>
          <div className="ml-auto">
            <Badge variant="secondary" className="gap-1.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              Active
            </Badge>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="space-y-6 px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-6 pt-16 text-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-3xl bg-primary/20 opacity-75" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/70 shadow-2xl shadow-primary/20">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">Start building something amazing</h2>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Describe what you want to create, and I'll generate production-ready code for you in seconds
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="px-3 py-1.5">
                  React Components
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5">
                  Full Stack Apps
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5">
                  UI/UX Design
                </Badge>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="group space-y-3">
                <div className="flex items-center gap-3">
                  {message.role === "user" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary ring-1 ring-border">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-md shadow-primary/10">
                      <Sparkles className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {message.role === "user" ? "You" : "Bolt AI"}
                  </span>
                  <span className="text-xs text-muted-foreground">just now</span>
                </div>
                <div className="ml-11 space-y-2 text-sm">{renderMessageContent(message.content)}</div>
              </div>
            ))
          )}
          {isGenerating && (
            <div className="group space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-md shadow-primary/10">
                  <Sparkles className="h-4 w-4 animate-pulse text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">Bolt AI</span>
                <span className="text-xs text-muted-foreground">thinking...</span>
              </div>
              <div className="ml-11 flex items-center gap-2">
                <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border bg-card p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you want to build..."
              className="min-h-[80px] resize-none bg-secondary pr-12 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <div className="absolute bottom-3 right-3 flex gap-1">
              <Button type="button" size="icon" variant="ghost" className="h-7 w-7">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button type="button" size="icon" variant="ghost" className="h-7 w-7">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="h-10 gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              disabled={!input.trim() || isGenerating}
            >
              <Send className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate"}
            </Button>
            <p className="text-xs text-muted-foreground">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </form>
      </div>
    </div>
  )
}
