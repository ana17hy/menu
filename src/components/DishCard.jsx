import { Pencil, Trash2 } from 'lucide-react';

export default function DishCard({ dish, onEdit, onDelete }) {
  return (
    <article className="soft-card group flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:shadow-petal">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-ink">{dish.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="chip capitalize">{dish.protein}</span>
            <span className="chip capitalize">{dish.side}</span>
          </div>
        </div>
        <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(dish)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/75 text-sageDark transition hover:bg-sage hover:text-white"
            aria-label={`Editar ${dish.name}`}
            title="Editar"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(dish.id)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/75 text-rosewood transition hover:bg-rosewood hover:text-white"
            aria-label={`Eliminar ${dish.name}`}
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {dish.ingredients.slice(0, 5).map((ingredient) => (
          <span key={ingredient} className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-ink/60">
            {ingredient}
          </span>
        ))}
        {dish.ingredients.length > 5 && (
          <span className="rounded-full bg-sage/20 px-3 py-1 text-xs font-bold text-sageDark">
            +{dish.ingredients.length - 5}
          </span>
        )}
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink/60">{dish.preparation}</p>
    </article>
  );
}
