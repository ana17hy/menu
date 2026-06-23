import { Check } from 'lucide-react';

export default function ShoppingItem({ ingredient, checked, onToggle }) {
  return (
    <label className="flex items-center gap-3 rounded-3xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm transition hover:bg-white">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(ingredient)}
        className="sr-only"
      />
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition ${
          checked ? 'border-sage bg-sage text-white' : 'border-blush/40 bg-cream text-transparent'
        }`}
      >
        <Check size={15} />
      </span>
      <span className={`text-sm font-semibold capitalize ${checked ? 'text-ink/40 line-through' : 'text-ink/80'}`}>
        {ingredient}
      </span>
      {checked && <span className="ml-auto rounded-full bg-sage/20 px-3 py-1 text-xs font-bold text-sageDark">Ya tengo</span>}
    </label>
  );
}
