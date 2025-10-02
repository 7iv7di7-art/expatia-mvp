export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Профиль</h1>
      <p className="text-gray-600">
        Здесь появятся: вход/регистрация, ваш профиль (семья/пара/одиночка/пенсионер), избранные страны, отзывы и настройки.
      </p>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        <li>Тип профиля и приоритеты (что важно при переезде)</li>
        <li>Избранные страны</li>
        <li>Мои отзывы</li>
        <li>Premium-доступ (позже)</li>
      </ul>
    </div>
  );
}
