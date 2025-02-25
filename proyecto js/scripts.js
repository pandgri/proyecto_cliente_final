// Datos de ejemplo (pueden ser reemplazados por una API)
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

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar juegos
function renderGames() {
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = games.map(game => `
        <div class="col-md-4">
            <div class="game-card card h-100" data-id="${game.id}" onclick="showGameDetails(${game.id})">
                <img src="${game.image}" class="card-img-top" alt="${game.title}">
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">$${game.price}</p>
                    <button class="btn gaming-btn w-100" onclick="event.stopPropagation(); addToCart(${game.id})">
                        <i class="bi bi-cart-plus"></i> Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para mostrar detalles del juego
function showGameDetails(gameId) {
    const game = games.find(g => g.id === gameId);
    const modalContent = document.getElementById('gameModalContent');
    
    modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${game.image}" class="img-fluid" alt="${game.title}">
            </div>
            <div class="col-md-6">
                <h3>${game.title}</h3>
                <p class="lead">$${game.price}</p>
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
}

// Función para añadir al carrito
function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...game, quantity: 1 });
    }
    
    updateCart();
    showToast('¡Juego añadido al carrito!');
}

// Actualizar carrito
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Función para mostrar notificaciones
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-primary border-0';
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    document.body.appendChild(toast);
    new bootstrap.Toast(toast, { autohide: true, delay: 2000 }).show();
    setTimeout(() => toast.remove(), 2500);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    updateCart();
});