// Efecto de Navbar al hacer scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Cargar juegos dinámicamente
document.addEventListener("DOMContentLoaded", function () {
    const gamesList = document.getElementById("games-list");
    const games = [
        { title: "The Legend of Zelda", price: 30, image: "zelda.jpg" },
        { title: "Super Mario Odyssey", price: 25, image: "mario.jpg" },
        { title: "Cyberpunk 2077", price: 40, image: "cyberpunk.jpg" },
        { title: "Elden Ring", price: 50, image: "elden-ring.jpg" },
    ];

    games.forEach(game => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${game.image}" class="card-img-top" alt="${game.title}">
                    <div class="card-body">
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text">${game.price}€</p>
                        <a href="product.html" class="btn btn-primary">Ver Detalles</a>
                    </div>
                </div>
            </div>
        `;
        gamesList.innerHTML += card;
    });
});

// Función para comprar un juego
document.getElementById("buy-button").addEventListener("click", function () {
    alert("¡Gracias por tu compra! El vendedor se pondrá en contacto contigo.");
    window.location.href = "index.html";
});

// Almacenamiento local para juegos publicados
let games = JSON.parse(localStorage.getItem("games")) || [];

// Función para publicar un juego
document.getElementById("sell-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").files[0];

    // Convertir la imagen a base64
    const reader = new FileReader();
    reader.onload = function () {
        const newGame = {
            title,
            price,
            description,
            image: reader.result,
            seller: "Usuario123", // Aquí podrías usar el usuario logueado
        };
        games.push(newGame);
        localStorage.setItem("games", JSON.stringify(games));

        alert("Juego publicado con éxito.");
        window.location.href = "index.html";
    };
    reader.readAsDataURL(image);
});

// Almacenamiento local para usuarios registrados
let users = JSON.parse(localStorage.getItem("users")) || [];

// Función para registrar un nuevo usuario
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validar si el usuario ya existe
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("El correo electrónico ya está registrado.");
        return;
    }

    // Crear nuevo usuario
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
});