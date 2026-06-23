import { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';
import { proteinOptions, sideOptions } from '../utils/sampleData.js';
import PrimaryButton from './PrimaryButton.jsx';

const emptyDish = {
  name: '',
  protein: 'pollo',
  side: 'arroz',
  ingredientsText: '',
  preparation: '',
};

const toFormState = (dish) => {
  if (!dish) return emptyDish;

  return {
    ...dish,
    ingredientsText: (dish.ingredients || []).join('\n'),
  };
};

export default function DishForm({ editingDish, onSave, onCancel }) {
  const [form, setForm] = useState(() => toFormState(editingDish));

  useEffect(() => {
    setForm(toFormState(editingDish));
  }, [editingDish]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const ingredients = form.ingredientsText
      .split(/[\n,]/)
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);

    onSave({
      id: editingDish?.id || crypto.randomUUID(),
      name: form.name.trim(),
      protein: form.protein,
      side: form.side,
      ingredients,
      preparation: form.preparation.trim(),
    });

    setForm(emptyDish);
  };

  return (
    <form onSubmit={handleSubmit} className="soft-card space-y-4 p-5 animate-appear">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="chip">Recetario familiar</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink">
            {editingDish ? 'Editar plato' : 'Nuevo plato'}
          </h2>
        </div>
        {editingDish && (
          <button
            type="button"
            onClick={onCancel}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/75 text-ink/60 transition hover:bg-white hover:text-rosewood"
            aria-label="Cancelar edición"
            title="Cancelar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <label className="block">
        <span className="text-sm font-bold text-ink/75">Nombre</span>
        <input
          required
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          placeholder="Ej. Sudado de pescado"
          className="focus-ring mt-2 w-full rounded-2xl border border-blush/30 bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink/40"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-ink/75">Proteína</span>
          <select
            value={form.protein}
            onChange={(event) => updateField('protein', event.target.value)}
            className="focus-ring mt-2 w-full rounded-2xl border border-blush/30 bg-white/80 px-4 py-3 text-sm capitalize text-ink"
          >
            {proteinOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold text-ink/75">Acompañamiento</span>
          <select
            value={form.side}
            onChange={(event) => updateField('side', event.target.value)}
            className="focus-ring mt-2 w-full rounded-2xl border border-blush/30 bg-white/80 px-4 py-3 text-sm capitalize text-ink"
          >
            {sideOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-bold text-ink/75">Ingredientes</span>
        <textarea
          required
          rows="5"
          value={form.ingredientsText}
          onChange={(event) => updateField('ingredientsText', event.target.value)}
          placeholder="Escribe uno por línea o sepáralos con comas"
          className="focus-ring mt-2 w-full resize-none rounded-2xl border border-blush/30 bg-white/80 px-4 py-3 text-sm leading-6 text-ink placeholder:text-ink/40"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-ink/75">Preparación</span>
        <textarea
          required
          rows="4"
          value={form.preparation}
          onChange={(event) => updateField('preparation', event.target.value)}
          placeholder="Anota los pasos principales de forma sencilla"
          className="focus-ring mt-2 w-full resize-none rounded-2xl border border-blush/30 bg-white/80 px-4 py-3 text-sm leading-6 text-ink placeholder:text-ink/40"
        />
      </label>

      <PrimaryButton type="submit" icon={Save} className="w-full">
        {editingDish ? 'Guardar cambios' : 'Agregar plato'}
      </PrimaryButton>
    </form>
  );
}
