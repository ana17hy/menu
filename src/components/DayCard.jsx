import { RefreshCcw, Sparkle } from 'lucide-react';

export default function DayCard({ day, dish, onChange }) {
  return (
    <article className="soft-card flex min-h-[12rem] flex-col justify-between p-5 transition duration-300 hover:-translate-y-1 hover:shadow-petal">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-display text-2xl font-bold text-rosewood">{day}</p>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-sage/20 text-sageDark">
            <Sparkle size={18} />
          </span>
        </div>

        {dish ? (
          <>
            <h3 className="text-xl font-bold text-ink">{dish.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip capitalize">{dish.protein}</span>
              <span className="chip capitalize">{dish.side}</span>
            </div>
          </>
        ) : (
          <p className="rounded-3xl bg-cream/75 px-4 py-5 text-sm leading-6 text-ink/60">
            Aún no hay plato elegido para este día.
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!dish}
        onClick={() => onChange(day)}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-3 text-sm font-bold text-rosewood transition hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCcw size={16} />
        Cambiar
      </button>
    </article>
  );
}
