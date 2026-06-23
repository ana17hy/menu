import { Sparkles } from 'lucide-react';

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="soft-card flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center animate-appear">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-sage/25 text-sageDark">
        <Sparkles size={30} />
      </div>
      <h3 className="font-display text-2xl font-bold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-ink/60">{description}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-full bg-rosewood px-5 py-3 text-sm font-bold text-white shadow-petal transition hover:-translate-y-0.5 hover:bg-rosewood/90"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
