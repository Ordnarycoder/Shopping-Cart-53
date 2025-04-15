// Sample product data with updated placeholder URLs from placehold.co (12 products)
const products = [
    {
      id: 1,
      name: "Modern Watch",
      description: "Sleek and stylish wrist watch.",
      price: 199.99,
      image: "https://placehold.co/300x200?text=Watch"
    },
    {
      id: 2,
      name: "Headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: 149.99,
      image: "https://placehold.co/300x200?text=Headphones"
    },
    {
      id: 3,
      name: "Smartphone",
      description: "Latest smartphone with cutting edge features.",
      price: 899.99,
      image: "https://placehold.co/300x200?text=Smartphone"
    },
    {
      id: 4,
      name: "Tablet",
      description: "Lightweight tablet with high resolution display.",
      price: 499.99,
      image: "https://placehold.co/300x200?text=Tablet"
    },
    {
      id: 5,
      name: "Laptop",
      description: "Powerful laptop for everyday tasks and gaming.",
      price: 1299.99,
      image: "https://placehold.co/300x200?text=Laptop"
    },
    {
      id: 6,
      name: "Camera",
      description: "Capture stunning moments with this advanced camera.",
      price: 799.99,
      image: "https://placehold.co/300x200?text=Camera"
    },
    {
      id: 7,
      name: "Smart Speaker",
      description: "Voice-controlled smart speaker with premium sound.",
      price: 99.99,
      image: "https://placehold.co/300x200?text=Speaker"
    },
    {
      id: 8,
      name: "Gaming Console",
      description: "Experience next-gen gaming with this console.",
      price: 399.99,
      image: "https://placehold.co/300x200?text=Console"
    },
    {
      id: 9,
      name: "Fitness Tracker",
      description: "Keep track of your daily activity and health.",
      price: 49.99,
      image: "https://placehold.co/300x200?text=Tracker"
    },
    {
      id: 10,
      name: "Smart TV",
      description: "High-definition Smart TV for an immersive experience.",
      price: 999.99,
      image: "https://placehold.co/300x200?text=TV"
    },
    {
      id: 11,
      name: "Bluetooth Speaker",
      description: "Portable speaker with impressive sound quality.",
      price: 59.99,
      image: "https://placehold.co/300x200?text=BT+Speaker"
    },
    {
      id: 12,
      name: "E-Reader",
      description: "Lightweight e-reader with a glare-free display.",
      price: 129.99,
      image: "https://placehold.co/300x200?text=E-Reader"
    }
  ];
  
  // Cart array to store selected items
  let cart = [];
  
  // Utility to update the cart count in the navbar
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;
  }
  
  // Render product cards into the DOM
  function renderProducts() {
    const container = document.getElementById("productsContainer");
    // Iterate through product list
    products.forEach(product => {
      // Clone the hidden template
      const template = document.getElementById("productTemplate");
      const card = template.cloneNode(true);
      card.style.display = "block";
      card.classList.remove("d-none");
      // Set product image, name, description and price
      card.querySelector("img").src = product.image;
      card.querySelector("img").alt = product.name;
      card.querySelector(".product-name").textContent = product.name;
      card.querySelector(".product-description").textContent = product.description;
      card.querySelector(".product-price").textContent = product.price.toFixed(2);
      // Add event listener for Add to Cart button
      card.querySelector(".add-to-cart").addEventListener("click", () => {
        addToCart(product);
      });
      // Append card to container
      container.appendChild(card);
    });
  }
  
  // Function to add product to the cart
  function addToCart(product) {
    // Check if product is already in the cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    renderCartItems();
  }
  
  // Render cart items in the modal
  function renderCartItems() {
    const tbody = document.getElementById("cartItems");
    tbody.innerHTML = ""; // Clear previous content
    let total = 0;
    cart.forEach(item => {
      const row = document.createElement("tr");
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" class="form-control form-control-sm" style="width: 80px;" onchange="updateQuantity(${item.id}, this.value)" />
        </td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
        </td>
      `;
      tbody.appendChild(row);
    });
    document.getElementById("cartTotal").textContent = total.toFixed(2);
  }
  
  // Update quantity of a product in the cart
  function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = parseInt(newQuantity);
      if (item.quantity <= 0) {
        removeFromCart(productId);
      }
    }
    updateCartCount();
    renderCartItems();
  }
  
  // Remove a product from the cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
  }
  
  // Checkout button handler
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Checkout functionality coming soon!");
      // Here, you could integrate payment processing logic
    }
  });
  
  // Initialize the page by rendering products
  document.addEventListener("DOMContentLoaded", renderProducts);
  