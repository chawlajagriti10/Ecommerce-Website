// ==========================
// DOM Elements
// ==========================
 
const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-btn");
 
const cartIcon = document.querySelector(".cart");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
 
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
 
const shopBtn = document.getElementById("shop-btn");
 
// ==========================
// Variables
// ==========================
 
let cart = JSON.parse(localStorage.getItem("cart")) || [];
 
let currentCategory = "All";
 
// ==========================
// Display Products
// ==========================
 
function displayProducts(productArray){
 
    productsContainer.innerHTML = "";
 
    if(productArray.length === 0){
 
        productsContainer.innerHTML =
        "<h2>No Products Found</h2>";
 
        return;
 
    }
 
    productArray.forEach(product=>{
 
        const card = document.createElement("div");
 
        card.classList.add("product-card");
 
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
 
            <div class="product-info">
 
                <h3>${product.name}</h3>
 
                <p>${product.category}</p>
 
                <div class="rating">
                    ${product.rating}
                </div>
 
                <div class="price">
                    ₹${product.price}
                </div>
 
                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})">
 
                    Add to Cart
 
                </button>
 
            </div>
        `;
 
        productsContainer.appendChild(card);
 
    });
 
}
 
// ==========================
// Search Products
// ==========================
 
searchInput.addEventListener("keyup",()=>{
 
    const searchValue =
    searchInput.value.toLowerCase();
 
    let filteredProducts =
    products.filter(product=>{
 
        const matchName =
        product.name.toLowerCase().includes(searchValue);
 
        const matchCategory =
        currentCategory==="All" ||
        product.category===currentCategory;
 
        return matchName && matchCategory;
 
    });
 
    displayProducts(filteredProducts);
 
});
 
// ==========================
// Category Filter
// ==========================
 
filterButtons.forEach(button=>{
 
    button.addEventListener("click",()=>{
 
        filterButtons.forEach(btn=>{
 
            btn.classList.remove("active");
 
        });
 
        button.classList.add("active");
 
        currentCategory =
        button.dataset.category;
 
        let filteredProducts;
 
        if(currentCategory==="All"){
 
            filteredProducts = products;
 
        }
        else{
 
            filteredProducts =
            products.filter(product=>
 
                product.category===currentCategory
 
            );
 
        }
 
        displayProducts(filteredProducts);
 
    });
 
});
 
// ==========================
// Cart Sidebar
// ==========================
 
cartIcon.addEventListener("click",()=>{
 
    cartSidebar.classList.add("active");
 
});
 
closeCart.addEventListener("click",()=>{
 
    cartSidebar.classList.remove("active");
 
});
 
// ==========================
// Shop Now Button
// ==========================
 
shopBtn.addEventListener("click",()=>{
 
    document.querySelector(".products-section")
    .scrollIntoView({
 
        behavior:"smooth"
 
    });
 
});
 
// ==========================
// Initial Load
// ==========================
 
displayProducts(products);
// ==========================
// Add To Cart
// ==========================
 
function addToCart(id) {
 
    const product = products.find(item => item.id === id);
 
    const existingItem = cart.find(item => item.id === id);
 
    if (existingItem) {
 
        existingItem.quantity++;
 
    } else {
 
        cart.push({
            ...product,
            quantity: 1
        });
 
    }
 
    updateCart();
 
}
 
// ==========================
// Update Cart
// ==========================
 
function updateCart() {
 
    cartItems.innerHTML = "";
 
    let total = 0;
 
    let totalItems = 0;
 
    cart.forEach(item => {
 
        total += item.price * item.quantity;
 
        totalItems += item.quantity;
 
        const cartItem = document.createElement("div");
 
        cartItem.classList.add("cart-item");
 
        cartItem.innerHTML = `
 
            <div>
 
                <h4>${item.name}</h4>
 
                <p>₹${item.price}</p>
 
                <div class="quantity">
 
                    <button onclick="decreaseQuantity(${item.id})">-</button>
 
                    <span>${item.quantity}</span>
 
                    <button onclick="increaseQuantity(${item.id})">+</button>
 
                </div>
 
            </div>
 
            <button
                onclick="removeItem(${item.id})">
 
                ❌
 
            </button>
 
        `;
 
        cartItems.appendChild(cartItem);
 
    });
 
    totalPrice.innerHTML = total;
 
    cartCount.innerHTML = totalItems;
 
    localStorage.setItem("cart", JSON.stringify(cart));
 
}
 
// ==========================
// Increase Quantity
// ==========================
 
function increaseQuantity(id) {
 
    const item = cart.find(product => product.id === id);
 
    item.quantity++;
 
    updateCart();
 
}
 
// ==========================
// Decrease Quantity
// ==========================
 
function decreaseQuantity(id) {
 
    const item = cart.find(product => product.id === id);
 
    if (item.quantity > 1) {
 
        item.quantity--;
 
    } else {
 
        removeItem(id);
 
        return;
 
    }
 
    updateCart();
 
}
 
// ==========================
// Remove Item
// ==========================
 
function removeItem(id) {
 
    cart = cart.filter(item => item.id !== id);
 
    updateCart();
 
}
 
// ==========================
// Load Cart
// ==========================
 
updateCart();
 
// ==========================
// Checkout Button
// ==========================
 
const checkoutBtn = document.getElementById("checkout-btn");
 
checkoutBtn.addEventListener("click", () => {
 
    if (cart.length === 0) {
 
        alert("🛒 Your cart is empty!");
 
        return;
    }
 
    const confirmOrder = confirm(
        "Do you want to place your order?"
    );
 
    if (confirmOrder) {
 
        alert("🎉 Order placed successfully!\nThank you for shopping with ShopEase.");
 
        cart = [];
 
        updateCart();
 
        cartSidebar.classList.remove("active");
 
    }
 
});
 
// ==========================
// Toast Notification
// ==========================
 
function showToast(message) {
 
    const toast = document.createElement("div");
 
    toast.innerHTML = message;
 
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.background = "#2563eb";
    toast.style.color = "#fff";
    toast.style.padding = "15px 20px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "16px";
    toast.style.boxShadow = "0 5px 15px rgba(0,0,0,.2)";
    toast.style.zIndex = "9999";
 
    document.body.appendChild(toast);
 
    setTimeout(() => {
 
        toast.remove();
 
    }, 2000);
 
}
 
// ==========================
// Override Add To Cart
// ==========================
 
function addToCart(id) {
 
    const product = products.find(item => item.id === id);
 
    const existingItem = cart.find(item => item.id === id);
 
    if (existingItem) {
 
        existingItem.quantity++;
 
    } else {
 
        cart.push({
 
            ...product,
 
            quantity: 1
 
        });
 
    }
 
    updateCart();
 
    showToast("✅ Product Added to Cart");
 
}
 
// ==========================
// Cart Persistence
// ==========================
 
window.addEventListener("load", () => {
 
    const savedCart = JSON.parse(localStorage.getItem("cart"));
 
    if (savedCart) {
 
        cart = savedCart;
 
    }
 
    updateCart();
 
});
 
// ==========================
// Smooth Scroll on Logo
// ==========================
 
document.querySelector(".logo").addEventListener("click", () => {
 
    window.scrollTo({
 
        top: 0,
 
        behavior: "smooth"
 
    });
 
});
 
// ==========================
// Keyboard Shortcut
// Press "C" to Open Cart
// ==========================
 
document.addEventListener("keydown", (e) => {
 
    if (e.key === "c" || e.key === "C") {
 
        cartSidebar.classList.toggle("active");
 
    }
 
});
 
// ==========================
// Initial Render
// ==========================
 
displayProducts(products);
 
updateCart();
 