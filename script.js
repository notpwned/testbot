const spinner = document.getElementById('spinner');
const spinButton = document.getElementById('spin-btn');
const statusText = document.getElementById('status');

// --- НАША КОЛЛЕКЦИЯ NFT-ФРАГМЕНТОВ ---
const NFTS_TO_SPIN = [
    // УКАЗЫВАЙ РЕАЛЬНЫЕ ИЛИ ТЕСТОВЫЕ ID NFT TON
    { id: "EQB4T_Master_Piece_A", name: "Цифровой Молот Хаоса" },
    { id: "EQC5R_Void_Gem_B", name: "Кристалл Пустоты" },
    { id: "EQD6S_Chaos_Star_C", name: "Звезда Схемы" },
    { id: "EQE7T_Pleroma_Frag_D", name: "Фрагмент Плеромы" },
    { id: "EQF8U_Schema_E", name: "Свиток Deus Ex Sophia" }
];

function startSpin() {
    if (!window.Telegram || !Telegram.WebApp) {
        statusText.innerText = "Ошибка: Web App SDK не найден (Запустите в Telegram).";
        return;
    }

    spinButton.disabled = true;
    statusText.innerText = "Идет Захват Активов...";
    
    // Выбираем случайный NFT
    const finalNFT = NFTS_TO_SPIN[Math.floor(Math.random() * NFTS_TO_SPIN.length)];
    
    // Имитация вращения (случайный угол)
    const randomRotation = Math.floor(Math.random() * 360) + 360 * 5; 
    spinner.style.transform = `rotate(${randomRotation}deg)`;
    spinner.innerText = "⚡️";
    
    // Ожидание завершения анимации
    setTimeout(() => {
        spinner.style.transform = `rotate(0deg)`; 
        spinner.innerText = finalNFT.name.substring(0, 10) + '...'; // Показываем часть названия
        statusText.innerText = `Успех! Захваченный NFT: ${finalNFT.name}`;
        
        // --- Отправка данных обратно в Бота ---
        const resultData = JSON.stringify({
            action: 'nft_roll_complete',
            nft_id: finalNFT.id, 
            nft_name: finalNFT.name,
            timestamp: new Date().toISOString()
        });
        
        Telegram.WebApp.sendData(resultData);
        // Немедленно закрываем Web App, чтобы вернуть управление боту для перевода NFT
        Telegram.WebApp.close(); 
        
    }, 3000); 
}
