import { Fragment } from "react";

/**
 * Renders text where *words* become an accent span (`.accent` in globals.css).
 * Kept so Notion content using the *star* convention renders cleanly;
 * the accent style itself is neutral in the Tactile Brutalism direction.
 */
export function ItalicPlay({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="accent">{part.slice(1, -1)}</span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
