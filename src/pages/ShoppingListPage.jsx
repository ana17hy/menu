import { Eraser, ShoppingBasket } from 'lucide-react';
import { useMemo } from 'react';
import EmptyState from '../components/EmptyState.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import ShoppingItem from '../components/ShoppingItem.jsx';
import { buildShoppingList } from '../utils/planner.js';

export default function ShoppingListPage({
  dishes,
  weeklyPlan,
  shoppingChecks,
  setShoppingChecks,
  onGoToPlanner,
}) {
  const ingredients = useMemo(() => buildShoppingList(weeklyPlan, dishes), [weeklyPlan, dishes]);
  const checkedCount = ingredients.filter((ingredient) => shoppingChecks[ingredient]).length;

  const toggleIngredient = (ingredient) => {
    setShoppingChecks((current) => ({
      ...current,
      [ingredient]: !current[ingredient],
    }));
  };

  const clearList = () => {
    setShoppingChecks({});
  };

  return (
    <section className="space-y-6 animate-appear">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="chip mb-3">Lista de Compras</p>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Compras sin duplicados</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">
            La lista toma los ingredientes del menú semanal y une los repetidos automáticamente.
          </p>
        </div>
        <PrimaryButton icon={Eraser} variant="soft" onClick={clearList} disabled={!ingredients.length}>
          Limpiar lista
        </PrimaryButton>
      </div>

      {!ingredients.length ? (
        <EmptyState
          title="Tu lista está esperando el menú."
          description="Genera una semana en el planificador para ver aquí todos los ingredientes que necesitas comprar."
          actionLabel="Ir al Planificador"
          onAction={onGoToPlanner}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="grid gap-3 sm:grid-cols-2">
            {ingredients.map((ingredient) => (
              <ShoppingItem
                key={ingredient}
                ingredient={ingredient}
                checked={Boolean(shoppingChecks[ingredient])}
                onToggle={toggleIngredient}
              />
            ))}
          </div>

          <aside className="soft-card h-fit p-6">
            <div className="grid h-14 w-14 place-items-center rounded-3xl bg-blush text-white shadow-petal">
              <ShoppingBasket size={28} />
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink">Resumen</h2>
            <div className="mt-5 space-y-3">
              <div className="rounded-3xl bg-cream/80 p-4">
                <p className="text-sm font-bold text-ink">{ingredients.length} ingredientes</p>
                <p className="mt-1 text-xs leading-5 text-ink/60">Unificados desde tus platos de la semana.</p>
              </div>
              <div className="rounded-3xl bg-sage/20 p-4">
                <p className="text-sm font-bold text-sageDark">{checkedCount} marcados como “Ya tengo”</p>
                <p className="mt-1 text-xs leading-5 text-ink/60">Estos checks se guardan en este navegador.</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
