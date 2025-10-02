import { notFound } from "next/navigation";
import { prisma } from "../../../lib/db";

export default async function CountryPage({ params }: { params: { slug: string }}) {
  const country = await prisma.country.findUnique({
    where: { slug: params.slug },
    include: { metrics: true, pros: true, cons: true }
  });
  if (!country) return notFound();

  // Группировка метрик без Object.groupBy (совместимо с Node 18)
  const metricsByKind = country.metrics.reduce<Record<string, typeof country.metrics>>((acc, m) => {
    (acc[m.kind] ||= []).push(m);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{country.name}</h1>
        <span className="badge border-gray-300">{country.currency}</span>
      </div>
      <p className="text-gray-700">{country.summary}</p>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Основные показатели</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            {(metricsByKind["cost"] ?? []).map(m => (
              <li key={m.id}>{m.label}: <strong>{m.value}</strong> <span className="text-gray-500">{m.unit}</span></li>
            ))}
            {(metricsByKind["income"] ?? []).map(m => (
              <li key={m.id}>{m.label}: <strong>{m.value}</strong> <span className="text-gray-500">{m.unit}</span></li>
            ))}
            {(metricsByKind["quality"] ?? []).map(m => (
              <li key={m.id}>{m.label}: <strong>{m.value}</strong> <span className="text-gray-500">{m.unit}</span></li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Источник: демо • Дата обновления: {new Date(country.updatedAt).toLocaleDateString("ru-RU")}
          </p>
        </div>

        <div className="card p-4">
          <h2 className="font-semibold mb-2">Для кого подходит</h2>
          <ul className="text-sm text-gray-700 list-disc pl-5">
            <li>Семьи: школы, медицина</li>
            <li>Пары: карьера, жильё</li>
            <li>Одиночки: аренда студии, коммьюнити</li>
            <li>Пенсионеры: климат, страховки</li>
          </ul>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Плюсы</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {country.pros.map(p => (<li key={p.id}>{p.text}</li>))}
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="font-semibold mb-2">Минусы</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {country.cons.map(c => (<li key={c.id}>{c.text}</li>))}
          </ul>
        </div>
      </section>
    </div>
  );
}
