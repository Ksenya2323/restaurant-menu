const API = 'https://script.google.com/macros/s/AKfycbzkwYMazwXGWbK1sLAKcM0Dstr5Oym20xO2fnqhT1-JErlWJQtIAwK5urGfBuO3QDX/exec';

// Получить все блюда
async function getAllMeals() {
    try {
        const response = await fetch(API + '&type=all');
        const data = await response.json();
        console.log("Все блюда:", data);
    } catch (error) {
        console.error("Ошибка при получении всех блюд:", error);
    }
}

// Получить конкретное блюдо (исправлен params и знак &)
async function getMeal(id) {
    try {
        let url = API + "&type=meal&id=" + id; // Используем id и соединяем через &
        const response = await fetch(url);
        const data = await response.json();
        console.log("Блюдо:", data);
        // Здесь создавайте DOM-элементы
    } catch (error) {
        console.error("Ошибка в getMeal:", error);
    }
}

// Получить рекомендации (исправлен знак &)
async function getRecommended(id) {
    try {
        let url = API + "&type=recommendations&id=" + id; // Соединяем через &
        const response = await fetch(url);
        const data = await response.json();
        console.log("Рекомендации:", data);
        // Здесь создавайте DOM-элементы
    } catch (error) {
        console.error("Ошибка в getRecommended:", error);
    }
}

async function btnClickHandler() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.warn("Предупреждение: В адресной строке (URL) отсутствует параметр ?id=");
        // Если id нет, можно, например, вызвать getAllMeals()
        return;
    }

    getMeal(id);
    getRecommended(id);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("main-btn").addEventListener("click", btnClickHandler);
});