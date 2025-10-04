const spinner = document.getElementById('spinner');
const spinButton = document.getElementById('spin-btn');
const statusText = document.getElementById('status');
const prizes = ["1000 ₽", "500 ₽", "100 ₽ (возврат)", "ПРОКРУТКА", "ПУСТО"];

// Функция, запускающая анимацию и определение результата
function startSpin() {
    spinButton.disabled = true;
    statusText.innerText = "Колесо вращается, границы стираются...";
    
    // Выбираем случайный результат
    const finalPrize = prizes[Math.floor(Math.random() * prizes.length)];
    
    // Имитация вращения (случайный угол)
    const randomRotation = Math.floor(Math.random() * 360) + 360 * 5; // 5 полных оборотов + случайный угол
    spinner.style.transform = `rotate(${randomRotation}deg)`;
    
    // Ожидание завершения анимации (3 секунды)
    setTimeout(() => {
        spinner.style.transform = `rotate(0deg)`; // Сброс для следующего спина
        statusText.innerText = `Победа! Ты получил: ${finalPrize}`;
        
        // --- Ключевой Момент: Отправка данных обратно в Бота ---
        // Отправка JSON-строки с результатом
        const resultData = JSON.stringify({
            action: 'prize_roll_complete',
            result: finalPrize,
            timestamp: new Date().toISOString()
        });
        
        if (window.Telegram && Telegram.WebApp) {
            Telegram.WebApp.sendData(resultData);
            // Закрываем Web App после отправки данных
            Telegram.WebApp.close();
        } else {
            // Режим отладки, если запущено вне Telegram
            console.error("Telegram WebApp SDK не найден. Данные не отправлены.");
        }
        
    }, 3000); 
}
