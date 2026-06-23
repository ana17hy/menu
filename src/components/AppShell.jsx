import { ChefHat } from 'lucide-react';

export default function AppShell({ views, currentView, onNavigate, children }) {
  return (
    <div className="planner-bg min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-cream/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate('inicio')}
            className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1 text-left transition hover:bg-white/50"
            aria-label="Ir al inicio"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-white shadow-petal">
              <ChefHat size={23} />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate font-display text-lg font-bold text-ink">
                ¿Qué Cocinamos?
              </span>
              <span className="block text-xs font-semibold text-sageDark">Planner familiar</span>
            </span>
          </button>

          <nav className="flex items-center gap-1 rounded-full border border-white/80 bg-white/60 p-1 shadow-sm">
            {views.map((view) => {
              const Icon = view.icon;
              const active = currentView === view.id;

              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => onNavigate(view.id)}
                  className={`group flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-rosewood text-white shadow-sm'
                      : 'text-ink/70 hover:bg-white hover:text-rosewood'
                  }`}
                  aria-label={view.label}
                  title={view.label}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{view.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-4.5rem)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
