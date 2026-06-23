import { CalendarCheck, Shuffle } from 'lucide-react';
import DayCard from '../components/DayCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import PrimaryButton from '../components/PrimaryButton.jsx';
import { weekDays } from '../utils/sampleData.js';

export default function PlannerPage({
  dishes,
  dishesById,
  weeklyPlan,
  onGenerateWeek,
  onChangeDay,
  onGoToDishes,
}) {
  const hasPlan = weekDays.some((day) => weeklyPlan[day]);
  const enoughDishes = dishes.length >= 3;

  return (
    <section className="space-y-6 animate-appear">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="chip mb-3">Almuerzos y cenas</p>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Planificador Semanal</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/60">
            Genera una semana variada pensando en proteína y acompañamiento para que la cocina de la tarde rinda mejor.
          </p>
        </div>
        <PrimaryButton icon={Shuffle} onClick={onGenerateWeek} disabled={!dishes.length}>
          Generar Semana
        </PrimaryButton>
      </div>

      {!dishes.length && (
        <EmptyState
          title="Primero necesitamos platos."
          description="Agrega tus recetas favoritas para que el planificador pueda armar combinaciones lindas y variadas."
          actionLabel="Ir a Mis Platos"
          onAction={onGoToDishes}
        />
      )}

      {dishes.length > 0 && !hasPlan && (
        <div className="soft-card grid gap-6 overflow-hidden p-6 lg:grid-cols-[1fr_18rem]">
          <div>
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-3xl bg-blush text-white shadow-petal">
              <CalendarCheck size={28} />
            </div>
            <h2 className="font-display text-3xl font-bold text-ink">Tu semana todavía está en blanco.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink/60">
              Presiona “Generar Semana” y la app elegirá platos sin repetir, evitando proteínas seguidas cuando sea posible.
            </p>
            {!enoughDishes && (
              <p className="mt-4 rounded-3xl bg-butter/50 px-4 py-3 text-sm font-semibold text-clay">
                Con más platos guardados, la semana queda más variada.
              </p>
            )}
          </div>
          <div className="rounded-[2rem] bg-cream/75 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sageDark">Ritmo de casa</p>
            <p className="mt-3 text-3xl font-display font-bold text-rosewood">Cena hoy, almuerzo mañana</p>
          </div>
        </div>
      )}

      {dishes.length > 0 && hasPlan && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {weekDays.map((day) => (
            <DayCard
              key={day}
              day={day}
              dish={dishesById[weeklyPlan[day]]}
              onChange={onChangeDay}
            />
          ))}
        </div>
      )}
    </section>
  );
}
