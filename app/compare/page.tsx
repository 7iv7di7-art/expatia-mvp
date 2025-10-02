import { prisma } from "../../lib/db";

export const dynamic = "force-dynamic";

type C = Awaited<ReturnType<typeof prisma.country.findUnique>>;

function getLabels(kind: string, a?: C, b?: C) {
  const la = (a?.metrics ?? []).filter(m => m.kind === kind).map(m => m.label);
  const lb = (b?.metrics ?? []).filter(m => m.kind === kind).map(m => m.label);
  return Array.from(new Set([...la, ...lb]));
}

function Row({ label, a, b }: { label: string, a?: string, b?: string }) {
  return (
    <tr className="border-b">
      <td className="p-2 text-sm text-gray-600">{label}</td>
      <td className="p-2">{a ?? "—"}</td>
      <td className="p-2">{b ?? "—"}</td>
    </tr>
  )
}

export default async function ComparePage({ searchParams }: { searchParams: { a?: string, b?: string }}) {
  const [a, b] = await Promise.all([
    searchParams.a ? prisma.country.findUnique({ where: { slug: searchParams.a }, include: { metrics: true }}) : null,
    searchParams.b ? prisma.country.findUnique({ where: { slug: searchParams.b }, include: { metrics: true }}) : null
  ]);

  const kinds = ["cost", "income", "quality"] as const;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Сравнение стран</h1>
      <form className="flex gap-3 card p-4">
        <input name="a" placeholder="страна-a (slug)" className="border p-2 rounded-lg" defaultValue={searchParams.a ?? ""} />
        <input name="b" placeholder="страна-b (slug)" className="border p-2 rounded-lg" defaultValue={searchParams.b ?? ""} />
        <button className="px-4 py-2 rounded-lg bg-black text-white">Сравнить</button>
      </form>

      <div className="overflow-auto">
        <table className="min-w-[640px] w-full card">
          <thead>
            <tr className="text-left">
              <th className="p-2 w-1/3"></th>
              <th className="p-2">{a?.name ?? "Страна A"}</th>
              <th className="p-2">{b?.name ?? "Страна B"}</th>
            </tr>
          </thead>
          <tbody>
            {kinds.map(kind => (
              <tbody key={kind}>
                <tr><td colSpan={3} className="bg-gray-50 text-xs text-gray-500 p-2 uppercase">{kind}</td></tr>
                {getLabels(kind, a, b).map(label => {
                  const aval = a?.metrics.find(x => x.kind===kind && x.label===label)?.value;
                  const bval = b?.metrics.find(x => x.kind===kind && x.label===label)?.value;
                  return <Row key={label} label={label} a={aval} b={bval} />;
                })}
              </tbody>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500">Пример: <code>?a=germany&b=canada</code></p>
    </div>
  );
}
