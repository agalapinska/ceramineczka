import { ButtonLink, Eyebrow, TextLink } from "./ui";

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] border-b border-line">
      <div className="px-s4 md:px-s6 pt-s6 pb-s6 md:pb-s7 flex flex-col">
        <Eyebrow>Ręcznie toczona ceramika · Warszawa</Eyebrow>

        <h1 className="mt-s6 font-display font-medium text-display-xl">
          Ceramika
          <br />
          na dziś.
          <br />
          Nie na
          <br />
          później.
        </h1>

        <p className="mt-s6 text-body-l max-w-md">
          Małe wypały i jednorazowe edycje. Każda sztuka toczona ręcznie w pracowni na Pradze,
          sygnowana i opisana numerem partii.
        </p>

        <div className="mt-s6 md:mt-auto md:pt-s6 flex flex-wrap items-center gap-s5">
          <ButtonLink href="/sklep" variant="solid">Zobacz kolekcję</ButtonLink>
          <TextLink href="/pracownia">Jak powstaje</TextLink>
        </div>
      </div>

      <div className="px-s4 pb-s4 md:p-s5 md:pl-0">
        <div className="inset-photo relative aspect-[4/3.4] md:aspect-auto md:h-full md:min-h-[34rem]">
          <img
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1600&q=80"
            alt="Ręcznie toczona miska z gliny kamionkowej"
            className="absolute inset-0"
          />
        </div>
      </div>
    </section>
  );
}
