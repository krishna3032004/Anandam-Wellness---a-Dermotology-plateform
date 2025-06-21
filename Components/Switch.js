"use client";
import { useState } from "react";

export default function Switch({ isOn, onToggle, label = "" }) {
  const [internalState, setInternalState] = useState(isOn);

  const handleToggle = () => {
    const newState = !internalState;
    setInternalState(newState);
    onToggle(newState); // Callback to parent
  };

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
          internalState ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            internalState ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
