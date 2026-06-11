const API = 'https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnRPqpx2LkPeMcyX7WHEN4CBng7eh2nTGnjuPy0gt52Xnf6_rS1NnoJTctRS1C_3VsrK459bzc3Ic6WJ6Zx99-qbDstEfuEVcD52LU3WmmM63-n2ZbzmxA5g-w9OLJmgdu5-jBWDXUecsk_xEPFkHyQb_-ePgm-5cFepKtvX4JjwgM8Tew3yOL9Xt4_WZmW8JXI3eNxSWMKttk7oJ2j9M1P5QSAm156bs9BaodLoMLQhJfBt9tvyFbPfZEaJOBb2bij7XH1C1WWWIdSfMSqPnfian4ofPg&lib=Mb3uDB82ItmwYDqG0e0LtNf_xtrtDc7k6'

// получить все блюда
async function getAllMeals() {
    const response = await fetch(API + '&type=all');
    const data = await response.json();

    console.log(data);
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById("main-btn").addEventListener("click", getAllMeals)
})

