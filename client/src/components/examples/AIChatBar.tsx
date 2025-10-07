import { AIChatBar } from "../AIChatBar";

export default function AIChatBarExample() {
  return (
    <div className="p-8 max-w-4xl">
      <AIChatBar
        onSearch={(query) => console.log("AI Search:", query)}
        isProcessing={false}
      />
    </div>
  );
}
