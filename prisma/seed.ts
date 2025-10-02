import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const countries = [
    {
      slug: "germany",
      name: "Германия",
      currency: "EUR",
      summary: "Сильная экономика, высокое качество жизни, но бюрократия и язык могут быть барьерами.",
      metrics: [
        { kind: "cost", label: "Аренда 1-комн (мес)", value: "900", unit: "EUR" },
        { kind: "income", label: "Средняя зарплата (нетто)", value: "2800", unit: "EUR" },
        { kind: "quality", label: "Безопасность (индекс)", value: "70", unit: "/100" }
      ],
      pros: ["Стабильная экономика", "Хорошая медицина", "Транспорт"],
      cons: ["Высокие налоги", "Бюрократия"]
    },
    {
      slug: "canada",
      name: "Канада",
      currency: "CAD",
      summary: "Высокие доходы и безопасность, дорогая аренда в крупных городах, холодный климат.",
      metrics: [
        { kind: "cost", label: "Аренда 1-комн (мес)", value: "1500", unit: "CAD" },
        { kind: "income", label: "Средняя зарплата (нетто)", value: "3200", unit: "CAD" },
        { kind: "quality", label: "Безопасность (индекс)", value: "82", unit: "/100" }
      ],
      pros: ["Безопасность", "Природа", "Образование"],
      cons: ["Дорогая аренда", "Климат"]
    },
    {
      slug: "israel",
      name: "Израиль",
      currency: "ILS",
      summary: "Сильный IT-рынок и медицина, но высокая стоимость жизни и аренды.",
      metrics: [
        { kind: "cost", label: "Аренда 1-комн (мес)", value: "4500", unit: "ILS" },
        { kind: "income", label: "Средняя зарплата (нетто)", value: "11000", unit: "ILS" },
        { kind: "quality", label: "Безопасность (индекс)", value: "65", unit: "/100" }
      ],
      pros: ["IT-возможности", "Медицина", "Климат"],
      cons: ["Высокие цены", "Налоги"]
    }
  ];

  for (const c of countries) {
    const created = await prisma.country.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        name: c.name,
        currency: c.currency,
        summary: c.summary,
      }
    });

    for (const p of c.pros) {
      await prisma.pro.create({ data: { text: p, countryId: created.id } });
    }
    for (const cn of c.cons) {
      await prisma.con.create({ data: { text: cn, countryId: created.id } });
    }
    for (const m of c.metrics) {
      await prisma.metric.create({
        data: {
          kind: m.kind,
          label: m.label,
          value: m.value,
          unit: m.unit ?? "",
          countryId: created.id
        }
      });
    }
  }

  console.log("Seeded demo data.");
}

main().finally(() => prisma.$disconnect());
