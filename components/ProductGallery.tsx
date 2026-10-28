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
    <div className="flex flex-col gap-s3">
      <div className="inset-photo relative aspect-square">
        <img src={current} alt={alt} className="absolute inset-0" />
      </div>
      {safe.length > 1 && (
        <ul className="grid grid-cols-4 md:grid-cols-5 gap-s3">
          {safe.map((src, i) => (
            <li key={src + i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Pokaż zdjęcie ${i + 1}`}
                aria-current={i === active}
                className={`inset-photo relative block w-full aspect-square transition-opacity ${
                  i === active ? "outline outline-1 outline-offset-2 outline-ink" : "opacity-70 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="absolute inset-0" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
