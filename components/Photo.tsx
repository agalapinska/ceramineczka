/**
 * <img> z leniwym ładowaniem i srcSet dla Unsplash (parametr `w`),
 * żeby telefon nie pobierał zdjęć w rozdzielczości desktopowej.
 */
const WIDTHS = [400, 640, 960, 1280, 1600];

function unsplashSrcSet(src: string): string | undefined {
  try {
    const u = new URL(src);
    if (u.hostname !== "images.unsplash.com") return undefined;
    return WIDTHS.map((w) => {
      u.searchParams.set("w", String(w));
      return `${u.toString()} ${w}w`;
    }).join(", ");
  } catch {
    return undefined;
  }
}

export function Photo({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "absolute inset-0",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const srcSet = unsplashSrcSet(src);
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
