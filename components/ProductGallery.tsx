"use client";

import { useState } from "react";
import { Photo } from "./Photo";

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
        <Photo src={current} alt={alt} sizes="(min-width: 768px) 50vw, 100vw" priority />
      </div>
      {safe.length > 1 && (
        <ul className="grid grid-cols-5 gap-s2 md:gap-s3">
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
                <Photo src={src} alt="" sizes="20vw" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
