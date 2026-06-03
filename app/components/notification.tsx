"use client";

import { useNotification } from "./notificationContext";

export default function Notification() {
  const { message, type, dismissNotification } = useNotification();

  if (!message) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`mt-4 flex items-center gap-3 rounded-lg px-5 py-3 shadow-lg pointer-events-auto text-sm font-medium text-white ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <span>{type === "success" ? "✓" : "✕"}</span>
        <span>{message}</span>
        <button
          onClick={dismissNotification}
          className="ml-2 leading-none hover:opacity-80"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
