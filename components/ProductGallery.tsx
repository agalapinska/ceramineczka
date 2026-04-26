"use client";

import { useState } from "react";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const safe = images.length > 0 ? images : [""];
  const current = safe[active] ?? safe[0];

  return (
    <div className="flex flex-col">
      <div className="aspect-square flex items-center justify-center p-s6 bg-cream">
        <img
          src={current}
          alt={alt}
          className="max-h-full max-w-full object-contain mix-blend-multiply"
        />
      </div>
      {safe.length > 1 && (
        <ul className="border-t border-ink grid grid-cols-4 md:grid-cols-5">
          {safe.map((src, i) => (
            <li key={src + i} className="border-r border-ink last:border-r-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Pokaż zdjęcie ${i + 1}`}
                aria-current={i === active}
                className={`w-full aspect-square flex items-center justify-center p-s2 transition-colors ${
                  i === active ? "bg-ink-20" : "bg-cream hover:bg-ink-20"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
