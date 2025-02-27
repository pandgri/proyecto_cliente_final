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

#### Funcionalidades de Sergio : 

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







