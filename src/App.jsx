import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChefHat, Home, ShoppingBasket } from 'lucide-react';
import AppShell from './components/AppShell.jsx';
import HomePage from './pages/HomePage.jsx';
import DishesPage from './pages/DishesPage.jsx';
import PlannerPage from './pages/PlannerPage.jsx';
import ShoppingListPage from './pages/ShoppingListPage.jsx';
import {
  loadDishes,
  loadPlan,
  loadShoppingChecks,
  saveDishes,
  savePlan,
  saveShoppingChecks,
} from './utils/storage.js';
import { generateWeekPlan, replaceDayDish } from './utils/planner.js';

const views = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'platos', label: 'Mis Platos', icon: ChefHat },
  { id: 'planificador', label: 'Planificador', icon: CalendarDays },
  { id: 'compras', label: 'Compras', icon: ShoppingBasket },
];

export default function App() {
  const [currentView, setCurrentView] = useState('inicio');
  const [dishes, setDishes] = useState(() => loadDishes());
  const [weeklyPlan, setWeeklyPlan] = useState(() => loadPlan());
  const [shoppingChecks, setShoppingChecks] = useState(() => loadShoppingChecks());
  const [message, setMessage] = useState('');

  // Cada cambio se guarda automáticamente en el navegador con localStorage.
  useEffect(() => saveDishes(dishes), [dishes]);
  useEffect(() => savePlan(weeklyPlan), [weeklyPlan]);
  useEffect(() => saveShoppingChecks(shoppingChecks), [shoppingChecks]);

  const dishesById = useMemo(
    () => Object.fromEntries(dishes.map((dish) => [dish.id, dish])),
    [dishes],
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 2600);
  };

  const handleGenerateWeek = () => {
    // La utilidad elige platos variados según proteína y acompañamiento.
    const nextPlan = generateWeekPlan(dishes);
    setWeeklyPlan(nextPlan);
    showMessage('Tu menú semanal está listo 🌷');
  };

  const handleChangeDay = (day) => {
    const nextPlan = replaceDayDish(day, weeklyPlan, dishes);
    setWeeklyPlan(nextPlan);
    showMessage('Cambié ese día por otra opción bonita.');
  };

  const renderView = () => {
    if (currentView === 'platos') {
      return <DishesPage dishes={dishes} setDishes={setDishes} />;
    }

    if (currentView === 'planificador') {
      return (
        <PlannerPage
          dishes={dishes}
          dishesById={dishesById}
          weeklyPlan={weeklyPlan}
          onGenerateWeek={handleGenerateWeek}
          onChangeDay={handleChangeDay}
          onGoToDishes={() => setCurrentView('platos')}
        />
      );
    }

    if (currentView === 'compras') {
      return (
        <ShoppingListPage
          dishes={dishes}
          weeklyPlan={weeklyPlan}
          shoppingChecks={shoppingChecks}
          setShoppingChecks={setShoppingChecks}
          onGoToPlanner={() => setCurrentView('planificador')}
        />
      );
    }

    return <HomePage onNavigate={setCurrentView} dishCount={dishes.length} />;
  };

  return (
    <AppShell views={views} currentView={currentView} onNavigate={setCurrentView}>
      {message && (
        <div className="fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-full bg-rosewood px-5 py-3 text-center text-sm font-semibold text-white shadow-petal animate-appear">
          {message}
        </div>
      )}
      {renderView()}
    </AppShell>
  );
}
