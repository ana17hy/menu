import { Plus } from 'lucide-react';
import { useState } from 'react';
import DishCard from '../components/DishCard.jsx';
import DishForm from '../components/DishForm.jsx';
import EmptyState from '../components/EmptyState.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

export default function DishesPage({ dishes, setDishes }) {
  const [editingDish, setEditingDish] = useState(null);
  const [showFormOnMobile, setShowFormOnMobile] = useState(false);

  const handleSave = (dish) => {
    setDishes((current) => {
      const exists = current.some((item) => item.id === dish.id);
      return exists ? current.map((item) => (item.id === dish.id ? dish : item)) : [dish, ...current];
    });
    setEditingDish(null);
    setShowFormOnMobile(false);
  };

  const handleDelete = (dishId) => {
    const confirmed = window.confirm('¿Eliminar este plato del recetario?');
    if (!confirmed) return;

    setDishes((current) => current.filter((dish) => dish.id !== dishId));
    if (editingDish?.id === dishId) setEditingDish(null);
  };

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setShowFormOnMobile(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="space-y-6 animate-appear">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="chip mb-3">Mis Platos</p>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Tu recetario bonito</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">
            Crea, edita y elimina los platos que sueles preparar para que el planificador tenga mejores opciones.
          </p>
        </div>
        <PrimaryButton icon={Plus} className="lg:hidden" onClick={() => setShowFormOnMobile(true)}>
          Agregar plato
        </PrimaryButton>
      </div>

      <div className="grid gap-6 lg:grid-cols-[23rem_1fr]">
        <aside className={`${showFormOnMobile ? 'block' : 'hidden'} lg:block`}>
          <DishForm
            editingDish={editingDish}
            onSave={handleSave}
            onCancel={() => {
              setEditingDish(null);
              setShowFormOnMobile(false);
            }}
          />
        </aside>

        {dishes.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No tienes platos guardados todavía."
            description="Agrega tus recetas favoritas para empezar."
            actionLabel="Crear mi primer plato"
            onAction={() => setShowFormOnMobile(true)}
          />
        )}
      </div>
    </section>
  );
}
