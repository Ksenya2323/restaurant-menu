const API = 'https://script.google.com/macros/s/AKfycbzkwYMazwXGWbK1sLAkcM0Dstr5Oym20xO2fnqhT1-JEjrIWJQtIAwK5urGfBuO3QDX/exec';

// сделать заказ
async function makeOrder(mealId) {
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            meal_id: mealId
        })
    });

    const data = await response.json();

    console.log(data);
}