import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

type ToastKind = "success" | "error";
type ToastItem = { id: number; kind: ToastKind; message: string };

let emit: ((kind: ToastKind, message: string) => void) | null = null;

/** Drop-in toast API — call from anywhere, no hooks needed. */
export const toast = {
  success: (message: string) => emit?.("success", message),
  error: (message: string) => emit?.("error", message),
};

const KIND_STYLE: Record<ToastKind, { icon: typeof CheckCircle2; bar: string; iconColor: string }> =
  {
    success: { icon: CheckCircle2, bar: "bg-primary", iconColor: "text-primary" },
    error: { icon: AlertCircle, bar: "bg-destructive", iconColor: "text-destructive" },
  };

/** Render once near the root (e.g. in __root.tsx). Pure Tailwind, no libraries. */
export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    let id = 0;
    emit = (kind, message) => {
      const item = { id: ++id, kind, message };
      setToasts((prev) => [...prev.slice(-2), item]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== item.id));
      }, 4200);
    };
    return () => {
      emit = null;
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-[min(92vw,22rem)] flex-col gap-2"
    >
      {toasts.map((t) => {
        const s = KIND_STYLE[t.kind];
        const Icon = s.icon;
        return (
          <div
            key={t.id}
            className="toast-in pointer-events-auto flex items-start gap-3 overflow-hidden rounded-xl border border-border bg-card/95 p-4 shadow-2xl shadow-black/40 backdrop-blur"
          >
            <span className={`mt-0.5 h-8 w-1 shrink-0 rounded-full ${s.bar}`} aria-hidden />
            <Icon size={18} className={`mt-0.5 shrink-0 ${s.iconColor}`} aria-hidden />
            <p className="flex-1 text-sm leading-snug text-foreground">{t.message}</p>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              aria-label="Dismiss"
              className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
