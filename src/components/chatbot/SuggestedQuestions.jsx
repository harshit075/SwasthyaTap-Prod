export const SUGGESTIONS = [
  "How does the card work in an emergency?",
  "Is my data secure on SwasthyaTap?",
  "What is the cost of the card?",
  "Does it require internet to read the card?",
  "How do I register as a blood donor?"
];

export default function SuggestedQuestions({ onSelectQuestion, suggestions = SUGGESTIONS }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 mx-4 my-2">
      <span className="text-xs font-bold text-secondary/40 uppercase tracking-wider block mb-1">
        Suggested Questions
      </span>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelectQuestion(q)}
            className="text-left text-xs bg-white hover:bg-primary/5 hover:text-primary hover:border-primary/30 text-secondary/70 px-3 py-2 rounded-xl border border-gray-200/60 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
