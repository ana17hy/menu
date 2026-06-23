export default function PrimaryButton({ icon: Icon, children, variant = 'primary', className = '', ...props }) {
  const styles =
    variant === 'soft'
      ? 'border border-white/80 bg-white/70 text-rosewood hover:bg-white'
      : 'bg-rosewood text-white shadow-petal hover:bg-rosewood/90';

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${styles} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
