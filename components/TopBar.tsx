export function TopBar() {
  return (
    <div className="border-b border-line px-s4 md:px-s5 py-s2 flex items-center justify-between gap-s3 caption text-ink-60">
      <span>Darmowa dostawa od 300 zł</span>
      <span className="hidden sm:inline">Wysyłka co wtorek · Warszawa</span>
    </div>
  );
}
