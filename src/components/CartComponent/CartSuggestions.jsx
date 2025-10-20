import SuggestionCard from "./SuggestionsCard";

export default function CartSuggestions({ suggestions, onClose }) {
  if (!suggestions || suggestions.length === 0) return null;
  return (
    <div className="space-y-3 border-t border-gray-200 pt-6">
      <h3 className="font-semibold text-gray-900">You may also like</h3>
      <div className="grid grid-cols-2 gap-3">
        {suggestions.map((prod) => (
          <SuggestionCard
            key={prod.id || prod._id}
            prod={prod}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}
