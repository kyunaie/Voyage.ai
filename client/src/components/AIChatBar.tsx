import { useState, FormEvent } from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AIChatBarProps {
  onSearch: (query: string) => void;
  isProcessing?: boolean;
}

const quickPrompts = [
  { icon: "🏖️", text: "Beach Getaway" },
  { icon: "🏔️", text: "Mountain Adventure" },
  { icon: "🚗", text: "Weekend Trip" },
  { icon: "💎", text: "Luxury Escape" },
  { icon: "💰", text: "Budget-Friendly" },
];

export function AIChatBar({ onSearch, isProcessing = false }: AIChatBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isProcessing) {
      onSearch(query.trim());
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setQuery(prompt);
    onSearch(prompt);
  };

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b pb-4">
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ai-accent" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask AI: e.g., Beach trip under ₹20k for couples"
              className="pl-12 pr-4 h-14 text-base"
              disabled={isProcessing}
              data-testid="input-ai-chat"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!query.trim() || isProcessing}
            className="h-14 px-6 gap-2"
            data-testid="button-ai-send"
          >
            {isProcessing ? (
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send
              </>
            )}
          </Button>
        </form>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer px-4 py-2 hover-elevate text-sm"
              onClick={() => handleQuickPrompt(prompt.text)}
              data-testid={`quick-prompt-${prompt.text.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="mr-2">{prompt.icon}</span>
              {prompt.text}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
