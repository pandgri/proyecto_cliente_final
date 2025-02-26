# PROYECTO FINAL DE ASIGNATURA CLIENTES - PROYECTO DE TIENDA DE JUEGOS

## Equipo que a realizado este proyecto por:
- Sergio Dorantes Godino 
- Pablo Enrique Andrada Grimaldi
- Juan Manuel Toro Caballero


## ¿En que consiste nuestro proyecto? 

- Nuestro proyecto consiste en una pagina web que ofrece una tienda de videojuegos online a los usuarios

- En esta tienda online podras comprar juegos y tendras un perfil en el que administras tus propias compras 

- Tienes un carrito para administrar tus compras y proceder al pago 

## REPARTICIÓN DE FUNCIONALIDADES

### Sergio : 

----

- Creacion de objetos dinamicos 

```javascript
const games = [
    {
        id: 1,
        title: "CyberQuest 2077",
        price: 45.99,
        image: "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S2_03_1200x1600-b1847981214ac013383111fc457eb9c5", 
        description: "Un RPG futurista con gráficos impresionantes y mundo abierto.",
        reviews: [
            { user: "GamerPro", rating: 4, comment: "¡Increíble experiencia de juego!" },
            { user: "RetroLover", rating: 5, comment: "El mejor juego del año" }
        ]
    },
    {
        id: 2,
        title: "The Witcher 3",
        price: 29.99,
        image: "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png",
        description: "Juego de rol de mundo abierto premiado mundialmente.",
        reviews: []
    },
    {
        id: 3,
        title: "Rise of the Tomb Raider",
        price: 49.99,
        image: "https://www.croftgeneration.com/wp-content/uploads/2020/11/rise-tombraider.jpg",
        description: "Juego de aventuras.",
        reviews: []
    },
    {
        id: 4,
        title: "Uncharted 4",
        price: 69.99,
        image: "https://image.api.playstation.com/vulcan/img/rnd/202010/2620/gPTPUF3mT9FXELav8OKXmr9j.png",
        description: "Juego de accion.",
        reviews: []
    },
    {
        id: 5,
        title: "Red dead Redemption 2",
        price: 69.99,
        image: "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png",
        description: "Juego de accion.",
        reviews: []
    },
    {
        id: 6,
        title: "God of war",
        price: 59.99,
        image: "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg",
        description: "Juego de accion.",
        reviews: []
    },

];
```

- Filtrado de precios :
```javascript
const initPriceFilter = () => {
    priceFilter.max = maxPrice;
    priceFilter.value = maxPrice;
    priceValue.textContent = `${maxPrice.toFixed(2)}€`;
};

// Filtrado de juegos
const filterGames = () => {
    const currentMax = games.length > 0 ? Math.max(...games.map(game => game.price)) : 0;
    const filteredGames = games.filter(game => game.price <= parseFloat(priceFilter.value));
    renderGames(filteredGames);
    priceValue.textContent = `${parseFloat(priceFilter.value).toFixed(2)}€`;
    
    // Actualizar máximo dinámicamente si cambian los datos
    if (currentMax !== maxPrice) {
        maxPrice = currentMax;
        priceFilter.max = maxPrice;
    }
};

// Eventos del filtro
priceFilter.addEventListener('input', filterGames);
priceFilter.addEventListener('change', filterGames);
``` 

- Reviews : 
```javascript
/ Funciones del modal
const showGameDetails = (gameId) => {
    const game = games.find(g => g.id === gameId);
    const modalContent = document.getElementById('gameModalContent');
    
    modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${game.image}" class="img-fluid" alt="${game.title}">
            </div>
            <div class="col-md-6">
                <h3>${game.title}</h3>
                <p class="lead">${game.price}€</p>
                <p>${game.description}</p>
                <h4>Reseñas</h4>
                ${game.reviews.map(review => `
                    <div class="review mb-3">
                        <div class="review-header">
                            <strong>${review.user}</strong>
                            <div class="review-stars">
                                ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                            </div>
                        </div>
                        <p class="text-muted">${review.comment}</p>
                    </div>
                `).join('')}
                <form onsubmit="submitReview(event, ${gameId})">
                    <div class="mb-3">
                        <textarea class="form-control" placeholder="Escribe tu reseña..." required></textarea>
                    </div>
                    <div class="mb-3">
                        <select class="form-select" required>
                            <option value="">Selecciona una puntuación</option>
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★☆</option>
                            <option value="3">★★★☆☆</option>
                            <option value="2">★★☆☆☆</option>
                            <option value="1">★☆☆☆☆</option>
                        </select>
                    </div>
                    <button type="submit" class="btn gaming-btn">Enviar Reseña</button>
                </form>
            </div>
        </div>
    `;
    
    new bootstrap.Modal(document.getElementById('gameModal')).show();
};

const submitReview = (event, gameId) => {
    event.preventDefault();
    const form = event.target;
    const textarea = form.querySelector('textarea');
    const select = form.querySelector('select');
    
    const newReview = {
        user: "Usuario",
        rating: parseInt(select.value),
        comment: textarea.value
    };

    const gameIndex = games.findIndex(g => g.id === gameId);
    games[gameIndex].reviews.push(newReview);
    
    localStorage.setItem('games', JSON.stringify(games));
    renderGames();
    showGameDetails(gameId);
    form.reset();
};
```
## Pablo
---

- Añadir juegos y funcionalidades a carrito :
```javascript


// Funciones del carrito
const updateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
};

const addToCart = (gameId) => {
    const game = games.find(g => g.id === gameId);
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...game, quantity: 1 });
    }
    
    updateCart();
    showToast('¡Juego añadido al carrito!');
};


  // Función para renderizar el carrito
        function renderCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItems = document.getElementById('cartItems');
            const emptyCart = document.getElementById('emptyCart');
            
            if (cart.length === 0) {
                emptyCart.style.display = 'block';
                document.querySelector('.cart-summary').style.display = 'none';
                return;
            }

            emptyCart.style.display = 'none';
            document.querySelector('.cart-summary').style.display = 'block';

            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item card bg-dark mb-3 border-primary">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <img src="images/${item.image}" class="img-fluid rounded" alt="${item.title}">
                            </div>
                            <div class="col-md-4">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="text-muted mb-0">${item.price}€</p>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-outline-primary" onclick="updateQuantity(${item.id}, -1)">
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <input type="number" class="form-control text-center mx-2" 
                                           value="${item.quantity}" min="1" 
                                           onchange="updateQuantityInput(${item.id}, this.value)" 
                                           style="width: 60px;">
                                    <button class="btn btn-outline-primary" onclick="updateQuantity(${item.id}, 1)">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-2 text-end">
                                <h5 class="mb-0">${(item.price * item.quantity).toFixed(2)}€</h5>
                            </div>
                            <div class="col-md-1 text-end">
                                <button class="btn btn-danger" onclick="removeItem('${item.id}')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            updateCartTotals();
        }

        // Actualizar totales
        function updateCartTotals() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = 5.00;
            const total = subtotal + shipping;

            document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}€`;
            document.getElementById('total').textContent = `${total.toFixed(2)}€`;
        }

        // Actualizar contador del carrito
        function updateCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = count;
        }

        // Funciones de modificación del carrito
        function updateQuantity(gameId, change) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.id === gameId);
            
            if (itemIndex > -1) {
                cart[itemIndex].quantity += change;
                
                if (cart[itemIndex].quantity < 1) {
                    cart.splice(itemIndex, 1);
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCart();
            }
        }

        function updateQuantityInput(gameId, newQuantity) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.id === gameId);
            
            if (itemIndex > -1) {
                const quantity = Math.max(1, parseInt(newQuantity) || 1);
                cart[itemIndex].quantity = quantity;
                
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCart();
            }
        }

        function removeItem(gameId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id.toString() !== gameId.toString());
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCart();
            showToast('¡Artículo eliminado del carrito!');
        }

        // Mostrar notificaciones
        function showToast(message) {
            const toastEl = document.getElementById('liveToast');
            const toastBody = toastEl.querySelector('.toast-body');
            toastBody.textContent = message;
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        }

        // Inicializar
        document.addEventListener('DOMContentLoaded', () => {
            renderCart();
            updateCart();
        });
```
## Juan Manuel

- Pago con tarjeta
```javascript
 document.getElementById('paymentForm').addEventListener('submit', function(event) {
            event.preventDefault(); 

            // Limpiar el carrito (asumiendo que está almacenado en localStorage)
            localStorage.removeItem('cart');
    
            alert('Se ha realizado el pago correctamente')

            // Redirigir a index.html
            window.location.href = 'index.html';
        });
```

- Pedidos en el perfil

```javascript
 // Datos de ejemplo para pedidos
        const orders = [
            {
                id: 1,
                date: '2023-08-15',
                total: 145.97,
                status: 'Entregado',
                items: ['CyberQuest 2077', 'The Witcher 3']
            },
            {
                id: 2,
                date: '2023-08-10',
                total: 69.99,
                status: 'En camino',
                items: ['God of War']
            }
        ];

        // Función para cargar pedidos
        const loadOrders = () => {
            const ordersList = document.getElementById('ordersList');
            ordersList.innerHTML = orders.map(order => `
                <div class="order-item bg-dark p-3 mb-3 rounded">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <h6 class="gaming-font">Pedido #${order.id}</h6>
                            <small class="text-muted">${order.date}</small>
                        </div>
                        <span class="badge ${order.status === 'Entregado' ? 'bg-success' : 'bg-warning'}">
                            ${order.status}
                        </span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div>
                            <p class="mb-0">${order.items.join(', ')}</p>
                        </div>
                        <div>
                            <strong>$${order.total}</strong>
                        </div>
                    </div>
                </div>
            `).join('');
        };

        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            loadOrders();
        });
```


- Añadir pedidos a profile
```javascript
   const addOrder = () => {
            const newOrder = {
                id: orders.length + 1,
                date: new Date().toISOString().split('T')[0],
                total: Math.floor(Math.random() * 100) + 50,
                status: 'En proceso',
                items: ['Nuevo Juego ' + (orders.length + 1)]
            };
            orders.unshift(newOrder); // Agregar al principio de la lista
            loadOrders();
        };

        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            loadOrders();
            document.getElementById('addOrderBtn').addEventListener('click', addOrder);
        });
```