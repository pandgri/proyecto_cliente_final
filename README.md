# PROYECTO FINAL DE ASIGNATURA CLIENTES - PROYECTO DE TIENDA DE JUEGOS

## Equipo que a realizado este proyecto:
- Sergio Dorantes Godino 
- Pablo Enrique Andrada Grimaldi
- Juan Manuel Toro Caballero


## ¿En que consiste nuestro proyecto? 

- Nuestro proyecto consiste en una pagina web que ofrece una tienda de videojuegos online. En nuestra pagina buscamos que los usuarios puedan comprar videojuegos a precios bastante más reducidos que otras tiendas online. Los usuarios podrán explorar un amplio catalogo de videojuegos a precios competitivos, con grandes ofertas para todo tipo de usuarios.

## ¿ Què  herramientas hemos utilizado?

- Este proyecto es la culminación de la asignatura durante todo el curso, por lo tanto haremos un repaso de todo lo visto hasta ahora. 

- Lenguajes utilizados para este proyecto : 
<br>
<br>
Javascript: Es el lenguaje que hemos aprendido en esta asignatura y hemos aprendido a masterizarlo a lo largo de todo este curso, todas las funcionalidades de este proyecto funcionan con este lenguaje.
<br>
<br>
HTML: No puede faltar este lenguaje para crear una pagina web, por lo que es esencial el uso de HTML, con ello hemos creado toda la estructura de las paginas
<br>
<br>
CSS: Añadimos estilos y hacemos que la pagina web tenga un diseño atractivo hacia el publico
<br>
<br>
Boostrap: Incluye elementos ya prediseñados para el uso de la pagina web, como por ejemplo hacerla responsive.


## Referencias

- Nuestra principal referencia: [www.w3](https://www.w3schools.com/)
<br>
En esta página hemos obtenido todas la documentación necesaria para realizar los ejercicios. Esta pagina es en la que nos hemos basado durante casi todo el curso siguiendo sus tutoriales para aprender JavaScript y Boostrap.
<br>
<br>
- Hemos consultado algunas paginas dedicadas a documentarnos y orientarnos para una correcta estructuracion de algunas funcionalidades de nuestro proyecto.

## Explicacion del proyecto y guía de la página: 

- Nuestra proyecto se estuctura en 6 páginas relacionadas entre si: 
<br>
<br>
-index.html
<br>
-cart.html
<br>
-checkout.html
<br>
-login.html
<br>
-logout.html
<br>
-profile.html
<br>
<br>
- Además tenemos dos archivos más : scripts.js(archivo donde se encuentran la mayoria de las funcionalidades) y style.css(archivo donde añadimos los estilos que tienen nuestras páginas)

#### En este proyecto nos hemos dividido tanto las funcionalidades como la creacion de los html, ahora voy a explicar como nos hemos dividido cada uno de los participantes del proyecto este trabajo:

- Sergio : Creacion de los html de index y login, funcionalidades filtrar videojuegos por precio, añadir al carrito y el inicio y cierre de sesion.
<br>
<br>
- Pablo Enrique : Creacion de los HTML, checkout(datos bancarios), carrito, funcionalidades de crear las card y funciones varias del carrito
<br>
<br>
- Juan Manuel: Creacion de los html profile y logout, funcionalidades del profile


#### Ahora vamos a explicar todas las funcionalidades, con el codigo comentado, además de una explicación de su funcionamiento, esta seccion se va a dividir por las funciones que hemos realizado cada uno de nosotros: 

### Funcionalidades de Sergio : 

- Crear el filtro: Accedemos a los elementos del filtrado de precio y del valor del precio, una vez obtenidos calculamos el precio maximo, con este bucle recorremos todos los juegos que hay para encontrar el juego o los juegos con el precio mas alto. Segun el juego que haya con el maximo del precio, ese juego será el que se ponga en el máximo del filtrado. También tenemos la funcionalidad para cargar el filtrado de juegos por precio cuando la pagina carga.

```javascript
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
```
- Filtrar el juego: Después de haber creado el filtro con las funcionalidades anteriores, recorremos todos los juegos y el juego que tenga un precio menor al que está como máximo en la barra de filtrado serán los juegos que salgan con respecto al precio que le hemos asignado
```javascript
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

````
- Funcion añadir al carrito: Cuando le puslsas al boton añadir al carrito en index, llama a esta función que se llama a añadir al carrito, coge todos los datos del juego que hemos seleccionado y luego despues de hacer las comprobaciones añade el juego, con todos sus datos al carrito.
```javascript
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
  
```

- Login: Cuando se rellena el formulario, se hace una comprobacion de que todo está correcto y se envia un mensaje "se ha iniciado sesion correctamente", y nos redirige al index
```javascript
<script>
        document.getElementById('paymentForm').addEventListener('submit', function(event) {
            event.preventDefault(); 
    
            alert('Se ha iniciado sesión correctamente')

            // Redirigir a index.html
            window.location.href = 'index.html';
        });
    </script>

```
- Creacion de objetos dinamicos: Con este array/lista, creamos objectos para poder utilizarlos después en las funcionalidades de la página
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
- Función actualizar el icono del carrito: segun el tamaño de la lista se cambia el icono despues de haber sumado toda la cantidad de productos
```javascript

        // Actualizar número en el icono del carrito
        function actualizarContador() {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let total = 0;
            
            for (let i = 0; i < carrito.length; i++) {
                total += carrito[i].cantidad;
            }
            
            document.getElementById('cartCount').textContent = total;
        }
    
```

- DOM al cargar la página de carrito : cuando la pagina de carrito carga, se llama a estas 2 funcionalidades para que se ejecuten
```javascript
 // Al cargar la página
        window.addEventListener('DOMContentLoaded', function() {
            mostrarCarrito();
            actualizarContador();
        });
```


### Funcionalidades de Pablo: 

- Crear la comprobación a la hora de comprar lo que está añadido al carrito: Cuando se rellena el formulario, se elimina los productos del carrito y se envía un mensaje diciendo 'Se ha realizado el pago correctamente'. Finalmente se hace una redicrrección hacia la página principal.

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

- Funcionalidad para mostrar el carrito con los productos que se han añadido: Se crea un html con todos los atributos de cada producto para añadirlo a la página html del carrito y finalmente llama a una función que actualiza el precio total de todos los productos que se encuentran en el carrito

```javascript
// Mostrar los productos en el carrito
        function mostrarCarrito() {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const contenedor = document.getElementById('cartItems');
            const carritoVacio = document.getElementById('emptyCart');
            const resumen = document.querySelector('.cart-summary');
    
            // Mostrar mensaje si está vacío
            if (carrito.length === 0) {
                carritoVacio.style.display = 'block';
                resumen.style.display = 'none';
                return;
            }
            
            carritoVacio.style.display = 'none';
            resumen.style.display = 'block';
            
            // Crear HTML para cada producto
            let html = '';
            for (let i = 0; i < carrito.length; i++) {
                const producto = carrito[i];
                html += `
                    <div class="cart-item card bg-dark mb-3 border-primary">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-2">
                                    <img src="${producto.image}" class="img-fluid rounded" style="height: 100px; object-fit: cover;">
                                </div>
                                <div class="col-md-4">
                                    <h5 class="card-title">${producto.title}</h5>
                                    <p class="text-muted">${producto.price.toFixed(2)}€</p>
                                </div>
                                <div class="col-md-3">
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-outline-primary" onclick="cambiarCantidad(${producto.id}, -1)">
                                            <i class="bi bi-dash"></i>
                                        </button>
                                        <input type="number" class="form-control text-center mx-2" 
                                               value="${producto.cantidad}" min="1" 
                                               onchange="cambiarCantidadInput(${producto.id}, this.value)">
                                        <button class="btn btn-outline-primary" onclick="cambiarCantidad(${producto.id}, 1)">
                                            <i class="bi bi-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-2 text-end">
                                    <h5>${(producto.price * producto.cantidad).toFixed(2)}€</h5>
                                </div>
                                <div class="col-md-1 text-end">
                                    <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            contenedor.innerHTML = html;
            
            actualizarTotales();
        }
```

- Funcionalidad actualizar el precio total de todos los productos que hay añadidos en el carrito: Esta es la función que se llama en la función anterior al final y hace que sume todos los precios de los productos y los multiplique por el número de productos

```javascript
// Calcular precio total
        function actualizarTotales() {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let subtotal = 0;
            
            for (let i = 0; i < carrito.length; i++) {
                subtotal += carrito[i].price * carrito[i].cantidad;
            }
            
            const envio = 5.00;
            const total = subtotal + envio;
            
            document.getElementById('subtotal').textContent = subtotal.toFixed(2) + '€';
            document.getElementById('total').textContent = total.toFixed(2) + '€';
        }
```

- Funcionalidad de eliminar o añadir mas cantidad de un producto que ya tenemos añadido en el carrito: Lo que hace es que segun el numero que esté en el input se multiplica el precio por el nuḿero de productos que esté vinculado a ese producto. Finalmente muestra el carrito con los datos modificados después de haberse modificado

```javascript
// Cambiar cantidad de productos con botones +/-
        function cambiarCantidad(id, cambio) {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id === id) {
                    carrito[i].cantidad += cambio;
                    
                    if (carrito[i].cantidad < 1) {
                        carrito.splice(i, 1);
                    }
                    
                    break;
                }
            }
            
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
            actualizarContador();
        }
    
        // Cambiar cantidad de productos desde el input
        function cambiarCantidadInput(id, nuevaCantidad) {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id === id) {
                    carrito[i].cantidad = Math.max(1, Number(nuevaCantidad));
                    break;
                }
            }
            
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
            actualizarContador();
        }
```

- Funcionalidad de eliminar producto del carrito: Se crea un nuevo carrito en el que se va a introducir todos los productos, después de eliminar los productos y finalmente se muestra el carrito con los datos cambiados

```javascript
// Eliminar producto del carrito
        function eliminarProducto(id) {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const nuevoCarrito = [];
            
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id !== id) {
                    nuevoCarrito.push(carrito[i]);
                }
            }
            
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            mostrarCarrito();
            actualizarContador();
        }
```

### Funcionalidades de Juan Manuel:

- Creacion y listado de pedidos: Creamos los pedidos definiendo sus atributos como los productos que ha pedido o el estado de la entrega, con los productos creados añadimos una funcion en la que nos mostrara los pedidos que hemos creado de antemano y lo mostramos dentro de nuestra pagina de perfil
```javascript
        // Datos para pedidos
        let pedidos = [
            {
                id: 1,
                fecha: '2023-08-15',
                total: 145.97,
                estado: 'Entregado',
                productos: ['CyberQuest 2077', 'The Witcher 3']
            },
            {
                id: 2,
                fecha: '2023-08-10',
                total: 69.99,
                estado: 'En camino',
                productos: ['God of War']
            }
        ];
    
        // Función para mostrar los pedidos
        function mostrarPedidos() {
            const listaPedidos = document.getElementById('ordersList');
            listaPedidos.innerHTML = '';
            
            for (let i = 0; i < pedidos.length; i++) {
                const pedido = pedidos[i];
                listaPedidos.innerHTML += `
                    <div class="order-item bg-dark p-3 mb-3 rounded">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <h6 class="gaming-font">Pedido #${pedido.id}</h6>
                                <small class="text-muted">${pedido.fecha}</small>
                            </div>
                            <span class="badge ${pedido.estado === 'Entregado' ? 'bg-success' : 'bg-warning'}">
                                ${pedido.estado}
                            </span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="mb-0">${pedido.productos.join(', ')}</p>
                            </div>
                            <div>
                                <strong>${pedido.total.toFixed(2)}€</strong>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

````

- Crear un pedido de ejemplo: Creamos una funcion que genere un nuevo pedido de ejemplo, le añadimos atributos nuevos y lo implementamos en la funcion de mostrar los pedidos para que se vea junto a los otros que ya estaban definidos 
```javascript
        // Función para agregar nuevo pedido de ejemplo
        function agregarPedidoEjemplo() {
            const nuevoPedido = {
                id: pedidos.length + 1,
                fecha: new Date().toLocaleDateString(),
                total: Math.random() * 100 + 50,
                estado: 'En camino',
                productos: ['Juego Nuevo ' + (pedidos.length + 1)]
            };
            
            pedidos.unshift(nuevoPedido);
            mostrarPedidos();
        }

````

- Modificar datos del usuario: Creamos una funcion que nos permita modificar los valores del usuario accediendo a la ID de cada atributo, creamos un boton y un alert para avisar que se han aplicado los cambios
```javascript
        // Función para guardar cambios del perfil
        function guardarPerfil(event) {
            event.preventDefault();
            const nombre = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const bio = document.getElementById('bio').value;
            
            document.getElementById('username').textContent = nombre;
            alert('Cambios guardados correctamente');
        }

````

- Funciones adicionales: Aplicamos todas las funciones de la pagina perfil para que funcione correctamente y que se implemente cosas como el carrito de la compra 
```javascript
        // Configurar eventos al cargar la página
        window.addEventListener('DOMContentLoaded', function() {
            // Mostrar pedidos iniciales
            mostrarPedidos();
            
            // Configurar botón de nuevo pedido
            document.getElementById('addOrderBtn').addEventListener('click', agregarPedidoEjemplo);
            
            // Configurar formulario de perfil
            document.getElementById('profileForm').addEventListener('submit', guardarPerfil);
            
            // Actualizar contador del carrito
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            document.getElementById('cartCount').textContent = carrito.length;
        });

````





