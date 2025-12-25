"use client"

import { useState } from "react"
import { ChatPanel } from "@/components/chat-panel"
import { PreviewPanel } from "@/components/preview-panel"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Separator } from "react-resizable-panels"

export function BoltInterface() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [generatedCode, setGeneratedCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }])
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const response = `I'll help you with that! Here's a component:\n\n\`\`\`tsx\nexport default function Component() {\n  return (\n    <div className="p-8">\n      <h1 className="text-2xl font-bold">Hello World</h1>\n    </div>\n  )\n}\n\`\`\``

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setGeneratedCode(`export default function Component() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  )
}`)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ResizablePanelGroup>
        {/* Left Panel - Chat */}
        <ResizablePanel defaultSize={45} minSize={30}>
          <ChatPanel messages={messages} onSendMessage={handleSendMessage} isGenerating={isGenerating} />
        </ResizablePanel>

        {/* <ResizableHandle withHandle /> */}
    <Separator color="red"/>
    <Separator color="red" />
    {/* Right Panel - Preview/Code */}
    <ResizablePanel defaultSize={55} minSize={30}>
      <PreviewPanel code={generatedCode} />
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
);
}
