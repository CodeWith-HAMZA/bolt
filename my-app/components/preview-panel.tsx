"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Code2, Copy, Check, Download, Play, Folder, File, ChevronRight, ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
// import { useGoogleOneTapLogin } from '@react-oauth/google';

interface PreviewPanelProps {
  code: string
}

export function PreviewPanel({ code }: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)
  const [fileTreeOpen,   setFileTreeOpen] = useState(true)
//   useGoogleOneTapLogin({
//     onSuccess: credentialResponse => {
//       console.log(credentialResponse);
//     },
//     onError: () => {
//       console.log('Login Failed');
//     },
//   });

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="inline-flex gap-0.5 rounded-lg bg-secondary p-0.5">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 gap-1.5 px-3 text-xs ${
                activeTab === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("preview")}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 gap-1.5 px-3 text-xs ${
                activeTab === "code"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("code")}
            >
              <Code2 className="h-3.5 w-3.5" />
              Code
            </Button>
          </div>
          {code && (
            <Badge variant="outline" className="gap-1 text-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-success" />
              Ready
            </Badge>
          )}
        </div>

        {code && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-3 text-xs text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-3 text-xs text-muted-foreground hover:text-foreground"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-7 gap-1.5 bg-primary px-3 text-xs shadow-md shadow-primary/20">
              <Play className="h-3.5 w-3.5" />
              Deploy
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File tree sidebar for code view */}
        {activeTab === "code" && code && (
          <div className="w-56 border-r border-border bg-card">
            <div className="border-b border-border p-3">
              <h3 className="text-xs font-medium text-muted-foreground">PROJECT FILES</h3>
            </div>
            <ScrollArea className="h-[calc(100%-3rem)]">
              <div className="space-y-1 p-2">
                <div className="flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-secondary">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => setFileTreeOpen(!fileTreeOpen)}
                  >
                    {fileTreeOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </Button>
                  <Folder className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">components</span>
                </div>
                {fileTreeOpen && (
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center gap-1.5 rounded-md bg-secondary px-2 py-1.5">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">Component.tsx</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        Active
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main content area */}
        <ScrollArea className="flex-1">
          {!code ? (
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted ring-1 ring-border">
                    <Code2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No code generated yet</h3>
                <p className="text-sm text-muted-foreground">Start a conversation to generate code</p>
              </div>
            </div>
          ) : activeTab === "preview" ? (
            <div className="p-8">
              <div className="mx-auto max-w-4xl">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-destructive/80" />
                    <div className="h-3 w-3 rounded-full bg-warning/80" />
                    <div className="h-3 w-3 rounded-full bg-success/80" />
                  </div>
                  <div className="flex-1 rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
                    localhost:3000
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                  <div className="p-8">
                    <h1 className="text-2xl font-bold text-foreground">Hello World</h1>
                    <p className="mt-2 text-muted-foreground">Your generated component will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-[#0d1117] p-6">
              <div className="relative overflow-hidden rounded-lg border border-border bg-[#0d1117] shadow-2xl">
                <div className="flex items-center justify-between border-b border-border/50 bg-[#161b22] px-4 py-2">
                  <span className="font-mono text-xs text-gray-400">Component.tsx</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-gray-700 bg-transparent text-xs text-gray-400">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="border-gray-700 bg-transparent text-xs text-gray-400">
                      React
                    </Badge>
                  </div>
                </div>
                <div className="flex">
                  {/* Line numbers */}
                  <div className="select-none border-r border-border/50 bg-[#0d1117] px-4 py-4 font-mono text-sm text-gray-600">
                    {code.split("\n").map((_, i) => (
                      <div key={i} className="leading-relaxed">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  {/* Code content */}
                  <pre className="flex-1 overflow-x-auto p-4">
                    <code className="font-mono text-sm leading-relaxed text-gray-300">{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
