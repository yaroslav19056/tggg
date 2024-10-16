import logo from './logo.svg';
import './App.css';

function App() {
  window.Telegram.WebApp.ready();

// Получение данных о пользователе
const user = window.Telegram.WebApp.initDataUnsafe.user;

// Отправка данных пользователя на сервер
fetch('https://justtest-6y7c9cobu-yaroslav19056s-projects.vercel.app/api/bot', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username
    }),
}).then(response => response.json())
  .then(data => console.log('Данные отправлены:', data))
  .catch(error => console.error('Ошибка:', error));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
