import { CalendarDays, ChefHat, ShoppingBasket } from 'lucide-react';
import PlannerIllustration from '../components/PlannerIllustration.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';

const actionCards = [
  {
    id: 'platos',
    title: 'Mis Platos',
    text: 'Guarda tus recetas favoritas y tenlas listas para combinar.',
    icon: ChefHat,
  },
  {
    id: 'planificador',
    title: 'Planificador Semanal',
    text: 'Crea una semana equilibrada para almuerzo y cena.',
    icon: CalendarDays,
  },
  {
    id: 'compras',
    title: 'Lista de Compras',
    text: 'Reúne ingredientes repetidos en una checklist simple.',
    icon: ShoppingBasket,
  },
];

export default function HomePage({ onNavigate, dishCount }) {
  return (
    <section className="grid min-h-[calc(100vh-7.5rem)] items-center gap-10 py-6 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="animate-appear">
        <p className="chip mb-5">Planner digital de comidas</p>
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
          ¿Qué cocinamos esta semana?
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
          Organiza tus almuerzos y cenas sin pensar todos los días qué preparar.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton icon={ChefHat} onClick={() => onNavigate('platos')}>
            Mis Platos
          </PrimaryButton>
          <PrimaryButton icon={CalendarDays} variant="soft" onClick={() => onNavigate('planificador')}>
            Planificador Semanal
          </PrimaryButton>
          <PrimaryButton icon={ShoppingBasket} variant="soft" onClick={() => onNavigate('compras')}>
            Lista de Compras
          </PrimaryButton>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-3">
          {actionCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onNavigate(card.id)}
                className="rounded-[1.7rem] border border-white/75 bg-white/60 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-petal"
              >
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-sage/20 text-sageDark">
                  <Icon size={22} />
                </span>
                <span className="block text-sm font-bold text-ink">{card.title}</span>
                <span className="mt-1 block text-xs leading-5 text-ink/60">{card.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <PlannerIllustration />
        <div className="mx-auto mt-4 max-w-sm rounded-[2rem] border border-white/80 bg-white/70 p-5 text-center shadow-soft">
          <p className="text-sm font-bold text-rosewood">{dishCount} platos guardados</p>
          <p className="mt-1 text-xs leading-5 text-ink/60">
            Una base lista para combinar cenas y almuerzos de toda la semana.
          </p>
        </div>
      </div>
    </section>
  );
}
