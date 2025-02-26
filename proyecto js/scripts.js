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
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${juego.image}" class="card-img-top">
          <div class="card-body">
            <h5>${juego.title}</h5>
            <p>Precio: ${juego.price}€</p>
            <p>Valoración: ${promedio.toFixed(1)}/5</p>
            <button onclick="agregarAlCarrito(${juego.id})" class="btn btn-success">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    `;
    
    contenedor.innerHTML += tarjeta; // Agregar tarjeta al contenedor
  }
}

// 4. FUNCIÓN PARA AÑADIR AL CARRITO
function agregarAlCarrito(idJuego) {
  // Buscar el juego en el arreglo
  let juegoSeleccionado;
  for (let i = 0; i < games.length; i++) {
    if (games[i].id === idJuego) {
      juegoSeleccionado = games[i];
      break;
    }
  }
  
  // Verificar si ya está en el carrito
  let existe = false;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idJuego) {
      carrito[i].cantidad += 1;
      existe = true;
      break;
    }
  }
  
  // Si no existe, agregarlo
  if (!existe) {
    carrito.push({
      id: juegoSeleccionado.id,
      title: juegoSeleccionado.title,
      price: juegoSeleccionado.price,
      cantidad: 1
    });
  }
  
  actualizarCarrito();
  alert('Producto añadido!');
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