"use client";

import * as React from "react";
import { CheckCircle2, Info, X } from "lucide-react";

export type ToastMessage = {
  id: string;
  type: "success" | "info" | "warning";
  title: string;
  description?: string;
};

type ToastContextType = {
  showToast: (title: string, description?: string, type?: "success" | "info" | "warning") => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function AuthToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const showToast = React.useCallback(
    (title: string, description?: string, type: "success" | "info" | "warning" = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Portal */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-[380px] pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-[#111016]/10 bg-[var(--surface-elevated)] p-4 shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-up"
            style={{
              boxShadow: "0 12px 32px -8px rgba(37, 32, 51, 0.25)",
            }}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="size-5 shrink-0 text-[#557D70] mt-0.5" />
            ) : (
              <Info className="size-5 shrink-0 text-[#8D6BB3] mt-0.5" />
            )}
            <div className="flex-1">
              <p className="type-body text-[13.5px] font-semibold text-[var(--foreground)]">
                {toast.title}
              </p>
              {toast.description && (
                <p className="type-caption mt-0.5 text-[12px] text-[var(--muted)] leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors p-0.5"
              aria-label="Dismiss notification"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useAuthToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    return {
      showToast: (title: string, description?: string) => {
        console.log(`[Toast]: ${title} - ${description}`);
      },
    };
  }
  return ctx;
}
