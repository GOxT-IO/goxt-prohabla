import { Badge } from "../ui/badge";

const stats = [
  {
    id: "stat-1",
    value: "20,3%",
    label: "de los jóvenes entre 15 y 24 años en Costa Rica no estudia ni trabaja (INEC, 2025)",
  },
  {
    id: "stat-2",
    value: "29,2%",
    label: "es la tasa de ocupación juvenil, frente al 75,8% en adultos de 25 a 35 años (MTSS)",
  },
  {
    id: "stat-3",
    value: "37,8%",
    label: "de la población ocupada en Costa Rica trabaja en la informalidad (INEC)",
  },
  {
    id: "stat-4",
    value: "1 de 3",
    label: "jóvenes de 25 a 34 años no completó la educación secundaria (OCDE, 2025)",
  },
];

export default function ExpoTalentoStats() {
  return (
    <section
      className="relative isolate overflow-hidden py-16 md:py-24"
      style={{ background: "#FFFFFF" }}
      aria-labelledby="brecha-heading"
    >
      <div className="page-bg-grid" />
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="flex flex-col gap-4">
          <Badge className="text-sm h-auto py-1 px-3 border-0 w-fit gap-2 bg-secondary text-navy">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            Por qué existe Prohabla
          </Badge>
          <h2 id="brecha-heading" className="text-3xl md:text-5xl font-medium tracking-tight text-navy">
            La <span className="text-primary">brecha</span> es real
          </h2>
          <p className="text-muted-foreground max-w-3xl">
            En Costa Rica, miles de jóvenes buscan su primera oportunidad mientras las empresas necesitan talento calificado. En Prohabla trabajamos para cerrar esa brecha.
          </p>
        </div>

        <dl className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col-reverse gap-5">
              <dt className="text-muted-foreground text-sm">{stat.label}</dt>
              <dd className="text-6xl font-bold text-navy">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
