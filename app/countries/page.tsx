import Link from "next/link";
import { prisma } from "../../lib/db";

export const dynamic = "force-dynamic";

export default async function CountriesPage() {
  const countries = await prisma.country.findMany({
    orderBy: { name: "asc" },
    include: { metrics: true }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Страны</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {countries.map(c => (
          <Link key={c.id} href={`/country/${c.slug}`} className="card p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{c.name}</h2>
              <span className="text-xs text-gray-500">{c.currency}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{c.summary}</p>
            <div className="text-xs text-gray-500 mt-3">
              Обновлено: {new Date(c.updatedAt).toLocaleDateString("ru-RU")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
