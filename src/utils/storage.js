import { sampleDishes } from './sampleData';

const DISHES_KEY = 'qc_dishes';
const PLAN_KEY = 'qc_weekly_plan';
const CHECKS_KEY = 'qc_shopping_checks';

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadDishes = () => {
  const stored = readJson(DISHES_KEY, null);

  if (stored && stored.length) {
    return stored;
  }

  // Primera visita: cargamos platos base para que la app ya tenga vida.
  writeJson(DISHES_KEY, sampleDishes);
  return sampleDishes;
};

export const saveDishes = (dishes) => writeJson(DISHES_KEY, dishes);

export const loadPlan = () => readJson(PLAN_KEY, {});

export const savePlan = (plan) => writeJson(PLAN_KEY, plan);

export const loadShoppingChecks = () => readJson(CHECKS_KEY, {});

export const saveShoppingChecks = (checks) => writeJson(CHECKS_KEY, checks);

export const clearShoppingChecks = () => writeJson(CHECKS_KEY, {});
