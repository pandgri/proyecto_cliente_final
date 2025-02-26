// Datos de ejemplo
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

// 1. CARRITO DE COMPRAS (almacenamiento local)
// Cargar carrito guardado o crear uno vacío
let carrito;
if (localStorage.getItem('carrito')) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
} else {
  carrito = [];
}

// 2. FILTRO DE PRECIO
// Obtener elementos del DOM
const filtroPrecio = document.getElementById('priceFilter');
const valorPrecio = document.getElementById('priceValue');

// Función para calcular precio máximo
function calcularPrecioMaximo() {
  let maximo = 0;
  // Recorrer todos los juegos para encontrar el precio más alto
  for (let i = 0; i < games.length; i++) {
    if (games[i].price > maximo) {
      maximo = games[i].price;
    }
  }
  return maximo;
}

// Configurar el filtro al cargar la página
function configurarFiltro() {
  const precioMax = calcularPrecioMaximo();
  filtroPrecio.max = precioMax;
  filtroPrecio.value = precioMax;
  valorPrecio.textContent = precioMax.toFixed(2) + '€';
}

// 3. MOSTRAR JUEGOS EN PANTALLA
function mostrarJuegos(juegos = games) {
  const contenedor = document.getElementById('games-list');
  contenedor.innerHTML = ''; // Limpiar contenido anterior
  
  // Recorrer cada juego para crear su tarjeta
  for (let i = 0; i < juegos.length; i++) {
    const juego = juegos[i];
    
    // Calcular promedio de reseñas
    let promedio = 0;
    if (juego.reviews.length > 0) {
      let suma = 0;
      for (let j = 0; j < juego.reviews.length; j++) {
        suma += juego.reviews[j].rating;
      }
      promedio = suma / juego.reviews.length;
    }
    
    // Crear HTML de la tarjeta
    const tarjeta = `
    <div class="col mb-4">
      <div class="card h-100 bg-dark text-light game-card">
        <div class="position-relative">
          <img src="${juego.image}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;">
          <span class="position-absolute top-0 end-0 bg-primary px-3 py-1 rounded-bl">${juego.price.toFixed(2)}€</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title gaming-font text-truncate">${juego.title}</h5>
          
          <div class="d-flex align-items-center mb-2">
            <div class="star-rating">
              ${'<i class="bi bi-star-fill text-warning"></i>'.repeat(Math.floor(promedio))}
              ${'<i class="bi bi-star text-warning"></i>'.repeat(5 - Math.ceil(promedio))}
            </div>
            <small class="text-muted ms-2">(${juego.reviews.length} reseñas)</small>
          </div>
          
          <p class="card-text flex-grow-1 text-truncate-3">${juego.description}</p>
          
          <div class="d-grid gap-2 mt-3">
            <button onclick="agregarAlCarrito(${juego.id})" class="btn btn-primary btn-sm">
              <i class="bi bi-cart-plus"></i> Añadir al carrito
            </button>
          </div>

        </div>
        </div>
      </div>
    </div>`;
    
    contenedor.innerHTML += tarjeta; // Agregar tarjeta al contenedor
  }
}

// 4. FUNCIÓN PARA AÑADIR AL CARRITO
function agregarAlCarrito(idJuego) {
  const juego = games.find(j => j.id === idJuego);
  const itemExistente = carrito.find(item => item.id === idJuego);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({
      id: juego.id,
      title: juego.title,
      price: juego.price,
      cantidad: 1,
      image: juego.image // Añadimos la imagen para mostrarla en el carrito
    });
  }

  actualizarCarrito();
  
  // Mostrar notificación flotante
  const notificacion = document.createElement('div');
  notificacion.className = 'position-fixed bottom-0 end-0 m-3 p-3 bg-success text-white rounded shadow';
  notificacion.innerHTML = `
    <i class="bi bi-check2-circle me-2"></i>
    ${juego.title} añadido al carrito
  `;
  document.body.appendChild(notificacion);
  
  setTimeout(() => notificacion.remove(), 3000);
}
  

// 5. ACTUALIZAR CARRITO EN PANTALLA Y ALMACENAMIENTO
function actualizarCarrito() {
  // Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Calcular total de productos
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].cantidad;
  }
  
  // Mostrar en el contador
  document.getElementById('cartCount').textContent = total;
}

// 6. FILTRAR JUEGOS CUANDO SE MUEVE EL SLIDER
function filtrarPorPrecio() {
  const precioMax = parseFloat(filtroPrecio.value);
  const juegosFiltrados = [];
  
  // Recorrer todos los juegos
  for (let i = 0; i < games.length; i++) {
    if (games[i].price <= precioMax) {
      juegosFiltrados.push(games[i]);
    }
  }
  
  mostrarJuegos(juegosFiltrados);
  valorPrecio.textContent = precioMax.toFixed(2) + '€';
}

// 7. INICIALIZAR LA PÁGINA
function iniciar() {
  configurarFiltro();
  mostrarJuegos();
  actualizarCarrito();
}

// Evento para filtrar cuando se mueve el slider
filtroPrecio.addEventListener('input', filtrarPorPrecio);

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', iniciar);