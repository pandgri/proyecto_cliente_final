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

let maxPrice = Math.max(...games.map(game => game.price));

// Elementos del filtrado
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');

// Inicializar filtro de precios
const initPriceFilter = () => {
    priceFilter.max = maxPrice;
    priceFilter.value = maxPrice;
    priceValue.textContent = `$${maxPrice.toFixed(2)}`;
};

// Filtrado de juegos
const filterGames = () => {
    const currentMax = games.length > 0 ? Math.max(...games.map(game => game.price)) : 0;
    const filteredGames = games.filter(game => game.price <= parseFloat(priceFilter.value));
    renderGames(filteredGames);
    priceValue.textContent = `$${parseFloat(priceFilter.value).toFixed(2)}`;
    
    // Actualizar máximo dinámicamente si cambian los datos
    if (currentMax !== maxPrice) {
        maxPrice = currentMax;
        priceFilter.max = maxPrice;
    }
};

// Eventos del filtro
priceFilter.addEventListener('input', filterGames);
priceFilter.addEventListener('change', filterGames);

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

// Funciones de renderizado
const renderGames = (gamesArray = games) => {
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = gamesArray.map(game => {
        const averageRating = game.reviews.length > 0 
            ? game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length
            : 0;

        return `
        <div class="col-md-4">
            <div class="game-card card h-100" data-id="${game.id}" onclick="showGameDetails(${game.id})">
                <img src="${game.image}" class="card-img-top" alt="${game.title}">
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">$${game.price}</p>
                    <div class="reviews-small mb-3">
                        ${averageRating > 0 
                            ? `★ ${averageRating.toFixed(1)} (${game.reviews.length} reseñas)`
                            : 'Sin reseñas aún'}
                    </div>
                    <button class="btn gaming-btn w-100" onclick="event.stopPropagation(); addToCart(${game.id})">
                        <i class="bi bi-cart-plus"></i> Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
};

// Funciones del modal
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

// Notificaciones
const showToast = (message) => {
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
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Calcular maxPrice después de cargar los datos
    maxPrice = games.length > 0 ? Math.max(...games.map(game => game.price)) : 0;
    initPriceFilter();
    renderGames();
    updateCart();
});