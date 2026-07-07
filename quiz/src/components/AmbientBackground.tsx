export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="animate-float-a absolute -top-16 -left-20 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: 'var(--color-violet-light)' }}
      />
      <div
        className="animate-float-b absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: 'var(--color-violet)' }}
      />
      <div
        className="animate-float-a absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--color-violet-light)', animationDelay: '2s' }}
      />
    </div>
  );
}
