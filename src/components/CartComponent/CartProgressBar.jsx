import React from 'react';

export default function CartProgressBar({ subtotal, milestones, progressPercent, currentMilestone }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-gray-900">
          ${subtotal.toFixed(2)} spent
        </span>
        {currentMilestone && (
          <span className="text-xs text-gray-600">
            ${(currentMilestone.amount - subtotal).toFixed(2)} away from {currentMilestone.label}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        {milestones.map((m) => (
          <div
            key={m.amount}
            className={`text-center ${subtotal >= m.amount ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
          >
            <div>${m.amount}</div>
            <div className="text-xs">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
