const API = 'https://script.google.com/macros/s/AKfycbzkwYMazwXGWbK1sLAkcM0Dstr5Oym20xO2fnqhT1-JEjrIWJQtIAwK5urGfBuO3QDX/exec';

// ===================================
// API
// ===================================

async function getAllMeals() {
    const response = await fetch(`${API}?type=all`);
    return await response.json();
}

// ===================================
// INIT
// ===================================

document.addEventListener('DOMContentLoaded', loadMenu);

// ===================================
// LOAD MENU
// ===================================

async function loadMenu() {
    const status = document.getElementById('status');

    status.textContent = 'Загрузка меню...';

    try {
        const result = await getAllMeals();

        renderSidebar();

        renderTopCategories(result.data);

        renderCategories(result.data);

        status.textContent = '';
    } catch (error) {
        status.textContent = 'Ошибка загрузки меню';
        console.error(error);
    }
}

// ===================================
// SIDEBAR
// ===================================

function renderSidebar() {
    const container = document.getElementById('sidebar-nav');

    container.innerHTML = `
    
        <button class="sidebar-btn" id="menu-btn">
            Меню
        </button>

        <div class="sidebar-group">

            <button class="sidebar-btn" id="entertainment-btn">
                Развлечения
            </button>

            <div class="submenu" id="submenu">

                <button class="sidebar-btn submenu-btn">
                    Игры
                </button>

                <button class="sidebar-btn submenu-btn">
                    Квизы
                </button>

                <button class="sidebar-btn submenu-btn">
                    Караоке
                </button>

            </div>

        </div>

        <button class="sidebar-btn" id="about-btn">
            О ресторане
        </button>
    `;

    // раскрытие второго уровня

    const entertainmentBtn =
        document.getElementById('entertainment-btn');

    const submenu =
        document.getElementById('submenu');

    entertainmentBtn.addEventListener('click', () => {
        submenu.classList.toggle('open');
    });

    // переход к меню

    document
        .getElementById('menu-btn')
        .addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
}
// ===================================
// TOP CATEGORIES
// ===================================

function renderTopCategories(categories) {
    const container = document.getElementById('top-categories');

    container.innerHTML = '';

    categories.forEach(category => {
        const button = document.createElement('button');

        button.textContent = category.name;

        button.addEventListener('click', () => {
            document
                .getElementById(`category-${category.id}`)
                .scrollIntoView({
                    behavior: 'smooth'
                });
        });

        container.appendChild(button);
    });
}

// ===================================
// CATEGORIES
// ===================================

function renderCategories(categories) {
    const container = document.getElementById('categories');

    container.innerHTML = '';

    categories.forEach(category => {
        const section = document.createElement('section');

        section.className = 'category-section';

        section.id = `category-${category.id}`;

        // TITLE

        const title = document.createElement('h2');

        title.className = 'category-title';

        title.textContent = category.name;

        section.appendChild(title);

        // АКЦИИ

        if (category.name === 'Акции') {
            renderPromoCategory(section, category.meals);
        } else {
            renderNormalCategory(section, category.meals);
        }

        container.appendChild(section);
    });
}

// ===================================
// PROMO
// ===================================

function renderPromoCategory(section, meals) {
    const grid = document.createElement('div');

    grid.className = 'promo-grid';

    meals.forEach(meal => {
        const card = document.createElement('div');

        card.className = 'promo-card';

        card.innerHTML = `
            <img src="${meal.image}" alt="${meal.name}" />

            <div class="promo-title">
                ${meal.name}
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `meal.html?id=${meal.id}`;
        });

        grid.appendChild(card);
    });

    section.appendChild(grid);
}

// ===================================
// NORMAL CATEGORY
// ===================================

function renderNormalCategory(section, meals) {
    const grid = document.createElement('div');

    grid.className = 'meals-grid';

    meals.forEach(meal => {
        const card = document.createElement('div');

        card.className = 'meal-card';

        card.innerHTML = `
            <img src="${meal.image}" alt="${meal.name}" />

            <div class="meal-info">

                <div class="meal-name">
                    ${meal.name}
                </div>

                <div class="meal-price">
                    ${meal.price} ₽
                </div>

                <button class="order-btn">
                    Заказать
                </button>

            </div>
        `;

        // переход в блюдо

        card.addEventListener('click', () => {
            window.location.href = `meal.html?id=${meal.id}`;
        });

        // кнопка заказать

        const button = card.querySelector('.order-btn');

        button.addEventListener('click', event => {
            event.stopPropagation();

            console.log('POST order', meal.id);

            // тут потом будет postOrder(meal.id)
        });

        grid.appendChild(card);
    });

    section.appendChild(grid);
}