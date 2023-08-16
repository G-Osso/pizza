const pizzaIdInput = document.getElementById("pizza-id-input");
const searchButton = document.getElementById("search-button");
const resultContainer = document.getElementById("result-container");

searchButton.addEventListener("click", () => {
  resultContainer.innerHTML = ""; // Limpiar resultados anteriores

  const inputValue = pizzaIdInput.value;

  if (inputValue === "") {
    renderErrorMessage("Por favor, ingresa un número válido.");
    return;
  }

  const pizzaId = parseInt(inputValue);
  const pizza = getPizzaById(pizzaId);

  if (pizza) {
    renderPizzaCard(pizza);
    saveLastSearchedPizza(pizza);
  } else {
    renderErrorMessage("No se encontró una pizza con ese ID.");
  }
});

function getPizzaById(id) {
  
  // Cada pizza tiene las propiedades: ID, NOMBRE, IMAGEN, PRECIO
  const pizzas = [
    { id: 1, nombre: "Pizza de Muzarrella", imagen: "muzzarella.png", precio: 500 },
    { id: 2, nombre: "Pizza de Cebolla", imagen: "cebolla.png", precio: 1500 },
    { id: 3, nombre: "Pizza de 4 Quesos", imagen: "4quesos.png", precio: 1380 },
    { id: 4, nombre: "Pizza Especial", imagen: "especial.png", precio: 1000 },
    { id: 5, nombre: "Pizza de Anana", imagen: "anana.png", precio: 600 },
    
  ];

  return pizzas.find(pizza => pizza.id === id);
}

function renderPizzaCard(pizza) {
  const card = document.createElement("div");
  card.className = "pizza-card";
  card.innerHTML = `
    <h2>${pizza.nombre}</h2>
    <img src="img/${pizza.imagen}" alt="${pizza.nombre}">
    <p>Precio: $${pizza.precio}</p>
  `;
  resultContainer.appendChild(card);
}

function renderErrorMessage(message) {
  const errorDiv = document.createElement("div");
  errorDiv.style.color = "red";
  errorDiv.textContent = message;
  resultContainer.appendChild(errorDiv);
}

function saveLastSearchedPizza(pizza) {
  localStorage.setItem("lastSearchedPizza", JSON.stringify(pizza));
}

function loadLastSearchedPizza() {
  const savedPizza = localStorage.getItem("lastSearchedPizza");
  if (savedPizza) {
    const pizza = JSON.parse(savedPizza);
    renderPizzaCard(pizza);
  }
}

// Cargar la última pizza buscada al recargar la página
window.addEventListener("DOMContentLoaded", loadLastSearchedPizza);
