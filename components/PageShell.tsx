import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Cała strona osadzona w jednej ramce z cienką linią — jak w referencji. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:px-s5 md:py-s6">
      <div className="mx-auto max-w-frame bg-paper md:border border-line">
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
