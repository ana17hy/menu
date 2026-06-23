import { weekDays } from './sampleData';

const normalize = (text) => text.trim().toLowerCase();

const scoreDish = (dish, previousDish, usedIds, sideCounts, proteinCounts) => {
  let score = 100;

  // Restamos puntos a opciones repetidas; el plato con mejor puntaje gana.
  if (usedIds.has(dish.id)) score -= 80;
  if (previousDish?.protein === dish.protein) score -= 35;
  if (previousDish?.side === dish.side) score -= 18;

  score -= (sideCounts[dish.side] || 0) * 9;
  score -= (proteinCounts[dish.protein] || 0) * 7;

  return score;
};

const pickBestDish = (dishes, previousDish, usedIds, sideCounts, proteinCounts, forbiddenId) => {
  const ranked = dishes
    .filter((dish) => dish.id !== forbiddenId)
    .map((dish) => ({
      dish,
      score: scoreDish(dish, previousDish, usedIds, sideCounts, proteinCounts) + Math.random() * 12,
    }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.dish || null;
};

export const generateWeekPlan = (dishes) => {
  if (!dishes.length) return {};

  const plan = {};
  const usedIds = new Set();
  const sideCounts = {};
  const proteinCounts = {};
  let previousDish = null;

  // Recorremos la semana en orden para poder mirar qué se cocinó el día anterior.
  weekDays.forEach((day) => {
    const dish = pickBestDish(dishes, previousDish, usedIds, sideCounts, proteinCounts);
    if (!dish) return;

    plan[day] = dish.id;
    usedIds.add(dish.id);
    sideCounts[dish.side] = (sideCounts[dish.side] || 0) + 1;
    proteinCounts[dish.protein] = (proteinCounts[dish.protein] || 0) + 1;
    previousDish = dish;
  });

  return plan;
};

export const replaceDayDish = (day, currentPlan, dishes) => {
  const currentIndex = weekDays.indexOf(day);
  const previousDay = weekDays[currentIndex - 1];
  const previousDish = dishes.find((dish) => dish.id === currentPlan[previousDay]) || null;
  const usedIds = new Set(Object.values(currentPlan));
  const sideCounts = {};
  const proteinCounts = {};

  Object.values(currentPlan).forEach((dishId) => {
    const dish = dishes.find((item) => item.id === dishId);
    if (!dish) return;
    sideCounts[dish.side] = (sideCounts[dish.side] || 0) + 1;
    proteinCounts[dish.protein] = (proteinCounts[dish.protein] || 0) + 1;
  });

  const replacement = pickBestDish(dishes, previousDish, usedIds, sideCounts, proteinCounts, currentPlan[day]);

  if (!replacement) return currentPlan;
  return { ...currentPlan, [day]: replacement.id };
};

export const buildShoppingList = (plan, dishes) => {
  const selectedIds = new Set(Object.values(plan));
  const ingredients = dishes
    .filter((dish) => selectedIds.has(dish.id))
    .flatMap((dish) => dish.ingredients || [])
    .map(normalize)
    .filter(Boolean);

  return [...new Set(ingredients)].sort((a, b) => a.localeCompare(b, 'es'));
};
