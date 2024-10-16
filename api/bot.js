import { Client } from "pg";
// api/bot.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    const userInfo = req.body.message?.from;

    if (userInfo) {
      // Здесь ваша логика для сохранения данных в базу
      await saveUserToDatabase(userInfo);
    }

    // Отвечаем Telegram
    res.status(200).send("ok");
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

async function saveUserToDatabase(userInfo) {
  // Подключаемся к базе данных
  const client = new Client({
    connectionString: "https://fspqqcawosvitlfqweqv.supabase.co", // строка подключения из переменных окружения
  });

  try {
    // Открываем соединение с базой данных
    await client.connect();

    // SQL-запрос для вставки данных
    const query = `
            INSERT INTO users (telegram_id, first_name, last_name, username, date)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (telegram_id) DO UPDATE SET 
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            username = EXCLUDED.username,
            date = EXCLUDED.date;

        `;
    const values = [
      userInfo.id, // ID пользователя в Telegram
      userInfo.first_name, // Имя пользователя
      userInfo.last_name, // Фамилия пользователя
      userInfo.username, // Username пользователя
      new Date(), // Дата взаимодействия
    ];

    // Выполняем запрос
    await client.query(query, values);
  } catch (err) {
    // Обработка ошибок
    console.error("Ошибка при сохранении данных в базу:", err);
  } finally {
    // Закрываем соединение с базой данных
    await client.end();
  }
}
