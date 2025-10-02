import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="card p-6">
        <h1 className="text-2xl font-bold mb-2">Найдите идеальную страну для жизни</h1>
        <p className="text-gray-600 mb-4">
          Персональный подбор по вашему профилю: семья, пара, одиночка или пенсионер. Сравнение цен, зарплат, медицины и безопасности.
        </p>
        <div className="flex gap-3">
          <Link href="/countries" className="bg-black text-white px-4 py-2 rounded-xl">Открыть каталог стран</Link>
          <Link href="/compare" className="border px-4 py-2 rounded-xl">Сравнить страны</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold mb-2">Быстрый фильтр по профилю</h2>
          <div className="flex flex-wrap gap-2">
            {["Семья", "Пара", "Одиночка", "Пенсионер"].map((p) => (
              <span key={p} className="badge border-gray-300">{p}</span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">В анкету добавим позже. Пока используйте каталог стран.</p>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold mb-2">Топ-страны (демо)</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>Германия • Канада • Испания • Израиль • Португалия</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">Данные демонстрационные. Реальные источники и даты обновления подключим в следующем спринте.</p>
        </div>
      </section>
    </div>
  );
}
