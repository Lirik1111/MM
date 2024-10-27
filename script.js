// Данные товаров с изображениями
const bagProductsData = [
    {  name: "Сумка 1", 
        title: "Сумка маленька.<br>Розмір 25*15см.<br>Дві кишені.<br>Довгий ремінець.<br>Еко-шкіра", 
        price: 500, 
        image: "img/bag1.jpg"  },
    { name: "Сумка 2", 
        title :"Сумка маленька.<br>Розмір 25*15см.<br>Дві кишені.<br>Довгий ремінець.<br>Еко-шкіра" ,
        price: 1200, 
        image: "img/bag2.jpg" },
    { name: "Сумка 3", 
        title :"Сумка маленька.<br>Розмір 25*15см.<br>Дві кишені.<br>Довгий ремінець.<br>Еко-шкіра" ,
        price: 800, 
        image: "img/bag3.jpg" },
    { name: "Сумка 4", 
        title :"Сумка маленька.<br>Розмір 25*15см.<br>Дві кишені.<br>Довгий ремінець.<br>Еко-шкіра" ,
        price: 500, 
        image: "img/bag1.jpg" },
    { name: "Сумка 5", 
        title :"Сумка маленька.<br>Розмір 25*15см.<br>Дві кишені.<br>Довгий ремінець.<br>Еко-шкіра" ,
        price: 1200, 
        image: "img/bag2.jpg" },
    { name: "Сумка 6", 
        title :"Сумка маленька.<br>Розмір 25*15см.<br>Дві кишені.<br>Довгий ремінець.<br>Еко-шкіра" ,
        price: 800, 
        image: "img/bag3.jpg" }
];

const clothesProductsData = [
    { name: "Одежда 1", price: 700, image: "clothes1.jpg" },
    { name: "Одежда 2", price: 300, image: "clothes2.jpg" },
    { name: "Одежда 3", price: 900, image: "clothes3.jpg" }
];

const perfumeProductsData = [
    { name: "Духи 1", price: 400, image: "perfume1.jpg" },
    { name: "Духи 2", price: 600, image: "perfume2.jpg" },
    { name: "Духи 3", price: 1000, image: "perfume3.jpg" }
];

// Корзина
let cart = [];

// Функция для добавления товара в корзину
function addToCart(product) {
    cart.push(product);
    updateCart();
    alert("Товар добавлен в корзину!");
}

// Функция для обновления корзины
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItems.innerHTML = ''; // Очистить текущее содержимое корзины
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item';
        cartItem.innerHTML = `${item.name} - ${item.price} грн`;
        cartItems.appendChild(cartItem);
        totalPrice += item.price; // Суммируем стоимость товаров
    });

    totalPriceElement.textContent = totalPrice; // Обновляем общую стоимость
}

// Функция для сортировки и отображения товаров
function sortProducts(productsData, order, elementId) {
    const sortedProducts = [...productsData].sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    displayProducts(sortedProducts, elementId);
}

// Функция для отображения товаров с изображениями
function displayProducts(products, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Очищаем содержимое контейнера

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-lg-4 mb-4'; // Устанавливаем стили для карточек

        productDiv.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <h6 class="card-title">${product.title}</h6>
                    <p class="card-text"><strong>${product.price} грн</strong></p>
                    <button class="btn btn-primary" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">Добавить в корзину</button>
                </div>
            </div>
        `;
        container.appendChild(productDiv); // Добавляем карточку в контейнер
    });
}


// Функция для очистки корзины
function clearCart() {
    cart = []; // Очистить массив корзины
    updateCart(); // Обновить отображение корзины
}

function sendOrder() {
    let cartContent = cart.map(item => `${item.name} - ${item.price} грн`).join("\n");
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    // Получаем данные из полей ввода
    let params = {
         fromName : document.getElementById('customerName').value, // Имя заказчика
         toSecondname : document.getElementById('customerSurname').value, // Электронная почта заказчика
         customerPatronymic : document.getElementById('customerPatronymic').value, // отчество почта заказчика
         customerPhone : document.getElementById('customerPhone').value, // Электронная почта заказчика
         shippingService : document.getElementById('shippingService').value, // Адрес доставки
         customerAddress : document.getElementById('customerAddress').value, // Назва почты
         cartContent: cartContent, // Добавляем список товаров с названиями и ценами
         totalPrice: `${totalPrice} грн`, // Добавляем итоговую сумму
         message : "Ваш заказ был успешно принят!", // Сообщение (можно изменить)
    }
    // Отправляем данные через EmailJS
    emailjs.send("service_xu0xufn", "template_xygbbpk", params)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Сообщение успешно отправлено!');
    }, function(error) {
        console.log('FAILED...', error);
        alert('Ошибка при отправке: ' + JSON.stringify(error));
    });
}

// Инициализация данных
document.addEventListener("DOMContentLoaded", function() {
    displayProducts(bagProductsData, 'bagProducts');
    displayProducts(clothesProductsData, 'clothesProducts');
    displayProducts(perfumeProductsData, 'perfumeProducts');
});
