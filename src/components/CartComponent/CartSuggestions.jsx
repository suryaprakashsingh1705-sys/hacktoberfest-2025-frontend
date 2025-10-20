import SuggestionCard from "./SuggestionsCard";

export default function CartSuggestions({ suggestions, onClose }) {
  if (!suggestions || suggestions.length === 0) return null;
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-700 pb-2 border-b-2 border-gray-500">You may also like</h3>
      <div className="flex gap-3 overflow-x-auto pb-2" role="list" aria-label="Product suggestions" tabIndex={0} style={{scrollbarWidth: 'thin'}}>
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
