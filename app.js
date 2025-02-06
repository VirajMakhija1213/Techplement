// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function addToCart(course) {
  cart.push(course);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${course.name} added to cart!`);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const courseElement = button.closest('.course');
      const course = {
        id: courseElement.dataset.id,
        name: courseElement.dataset.name,
        price: courseElement.dataset.price,
      };
      addToCart(course);
    });
  });

  // Dynamically load courses in courses.html
  
});
// Cart page functionality
const cartItemsContainer = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');

function renderCart() {
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;

    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <h4>${item.name}</h4>
        <span>${item.price}/-</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
      totalAmount += parseInt(item.price);
    });

    totalAmountElement.textContent = totalAmount;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Remove item from cart
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  });

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Thank you for your purchase!');
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      updateCartCount();
    });
  }
});