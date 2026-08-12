// ==========================
// DOM
// ==========================
 
const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-btn");
 
const cartIcon = document.querySelector(".cart");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
 
const cartItems = document.getElementById("cart-items");
const subtotalPrice = document.getElementById("subtotal-price");
const deliveryPrice = document.getElementById("delivery-price");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cart-count");
 
const shopBtn = document.getElementById("shop-btn");
const checkoutBtn = document.getElementById("checkout-btn");
 
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckout = document.getElementById("close-checkout");
const continueCheckout = document.getElementById("continue-checkout");
 
const confirmModal = document.getElementById("confirm-modal");
const cancelOrder = document.getElementById("cancel-order");
const confirmOrder = document.getElementById("confirm-order");
 
const successModal = document.getElementById("success-modal");
const continueShopping = document.getElementById("continue-shopping");
 
 
// ==========================
// VARIABLES
// ==========================
 
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "All";
 
 
// ==========================
// DISPLAY PRODUCTS
// ==========================
 
function displayProducts(list) {
 
    productsContainer.innerHTML = "";
 
    if (list.length === 0) {
 
        productsContainer.innerHTML =
            "<h2>No Products Found</h2>";
 
        return;
    }
 
    list.forEach(product => {
 
        const card = document.createElement("div");
 
        card.className = "product-card";
 
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
 
                <button class="add-cart">
                    Add to Cart
                </button>
 
            </div>
        `;
 
        card.querySelector(".add-cart")
            .addEventListener("click", () => {
 
                addToCart(product.id);
 
            });
 
        productsContainer.appendChild(card);
 
    });
}
 
 
// ==========================
// FILTER + SEARCH
// ==========================
 
function filterProducts() {
 
    const search =
        searchInput.value.toLowerCase();
 
    const result = products.filter(product => {
 
        const name =
            product.name.toLowerCase();
 
        return (
            name.includes(search) &&
            (
                currentCategory === "All" ||
                product.category === currentCategory
            )
        );
 
    });
 
    displayProducts(result);
}
 
searchInput.addEventListener(
    "input",
    filterProducts
);
 
 
filterButtons.forEach(button => {
 
    button.addEventListener("click", () => {
 
        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );
 
        button.classList.add("active");
 
        currentCategory =
            button.dataset.category;
 
        filterProducts();
 
    });
 
});
 
 
// ==========================
// CART OPEN / CLOSE
// ==========================
 
cartIcon.addEventListener("click", () => {
 
    cartSidebar.classList.add("active");
 
});
 
closeCart.addEventListener("click", () => {
 
    cartSidebar.classList.remove("active");
 
});
 
 
// ==========================
// SHOP NOW
// ==========================
 
shopBtn.addEventListener("click", () => {
 
    document.querySelector(".products-section")
        .scrollIntoView({
            behavior: "smooth"
        });
 
});
 
 
// ==========================
// ADD TO CART
// ==========================
 
function addToCart(id) {
 
    const product =
        products.find(item => item.id === id);
 
    const item =
        cart.find(item => item.id === id);
 
    if (item) {
 
        item.quantity++;
 
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
// UPDATE CART
// ==========================
 
function updateCart() {
 
    cartItems.innerHTML = "";
 
    let subtotal = 0;
    let count = 0;
 
    if (cart.length === 0) {
 
        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty 🛒</p>";
 
    }
 
    cart.forEach(item => {
 
        subtotal +=
            item.price * item.quantity;
 
        count += item.quantity;
 
        const div =
            document.createElement("div");
 
        div.className = "cart-item";
 div.innerHTML = `
 
    <img
        src="${item.image}"
        alt="${item.name}"
        style="
            width:65px;
            height:65px;
            object-fit:cover;
            border-radius:8px;
        "
    >
 
    <div>
 
        <h4>${item.name}</h4>
 
        <p>₹${item.price}</p>
 
        <div class="quantity">
 
            <button
                onclick="decreaseQuantity(${item.id})">
                −
            </button>
 
            <span>${item.quantity}</span>
 
            <button
                onclick="increaseQuantity(${item.id})">
                +
            </button>
 
        </div>
 
    </div>
 
    <button
        class="remove-btn"
        onclick="removeItem(${item.id})">
 
        <i class="fa-solid fa-trash"></i>
 
    </button>
 
`;
 
        cartItems.appendChild(div);
 
    });
 
 
    const delivery =
        subtotal > 0 && subtotal < 999
            ? 99
            : 0;
 
    const total =
        subtotal + delivery;
 
 
    subtotalPrice.textContent =
        subtotal.toLocaleString("en-IN");
 
    deliveryPrice.textContent =
        delivery ? "₹99" : "FREE";
 
    totalPrice.textContent =
        total.toLocaleString("en-IN");
 
    cartCount.textContent = count;
 
 
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
 
}
 
 
// ==========================
// QUANTITY
// ==========================
 
function increaseQuantity(id) {
 
    const item =
        cart.find(item => item.id === id);
 
    item.quantity++;
 
    updateCart();
 
}
 
 
function decreaseQuantity(id) {
 
    const item =
        cart.find(item => item.id === id);
 
    if (item.quantity > 1) {
 
        item.quantity--;
 
    } else {
 
        removeItem(id);
 
        return;
 
    }
 
    updateCart();
 
}
 
 
function removeItem(id) {
 
    cart =
        cart.filter(item => item.id !== id);
 
    updateCart();
 
}
 
 
// ==========================
// GET TOTAL
// ==========================
 
function getTotal() {
 
    const subtotal =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );
 
    const delivery =
        subtotal > 0 && subtotal < 999
            ? 99
            : 0;
 
    return subtotal + delivery;
 
}
 
 
// ==========================
// CHECKOUT
// ==========================
 
checkoutBtn.addEventListener("click", () => {
 
    if (cart.length === 0) {
 
        showToast("🛒 Your cart is empty");
 
        return;
 
    }
 
    document.getElementById("checkout-total")
        .textContent =
        getTotal().toLocaleString("en-IN");
 
    checkoutModal.classList.add("active");
 
});
 
 
closeCheckout.addEventListener("click", () => {
 
    checkoutModal.classList.remove("active");
 
});
 
 
// ==========================
// CONTINUE CHECKOUT
// ==========================
 
continueCheckout.addEventListener(
    "click",
    () => {
 
        const name =
            document.getElementById("customer-name")
                .value.trim();
 
        const phone =
            document.getElementById("customer-phone")
                .value.trim();
 
        const address =
            document.getElementById("customer-address")
                .value.trim();
 
 
        if (!name || !phone || !address) {
 
            showToast(
                "Please fill all details"
            );
 
            return;
 
        }
 
 
        if (phone.length !== 10) {
 
            showToast(
                "Enter valid 10-digit phone number"
            );
 
            return;
 
        }
 
 
        document.getElementById("confirm-total")
            .textContent =
            getTotal().toLocaleString("en-IN");
 
 
        checkoutModal.classList.remove("active");
 
        confirmModal.classList.add("active");
 
    }
);
 
 
// ==========================
// CANCEL ORDER
// ==========================
 
cancelOrder.addEventListener("click", () => {
 
    confirmModal.classList.remove("active");
 
    checkoutModal.classList.add("active");
 
});
 
 
// ==========================
// PLACE ORDER
// ==========================
 
confirmOrder.addEventListener("click", () => {
 
    const id =
        "#ORD-" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );
 
 
    document.getElementById("order-id")
        .textContent = id;
 
 
    localStorage.setItem(
        "lastOrder",
        JSON.stringify({
            id: id,
            items: cart,
            total: getTotal(),
            date: new Date().toISOString()
        })
    );
 
 
    cart = [];
 
    updateCart();
 
    confirmModal.classList.remove("active");
 
    cartSidebar.classList.remove("active");
 
    successModal.classList.add("active");
 
});
 
 
// ==========================
// CONTINUE SHOPPING
// ==========================
 
continueShopping.addEventListener("click", () => {
 
    successModal.classList.remove("active");
 
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
 
});
 
 
// ==========================
// TOAST
// ==========================
 
function showToast(message) {
 
    const toast =
        document.createElement("div");
 
    toast.className = "toast";
 
    toast.textContent = message;
 
    document.body.appendChild(toast);
 
    setTimeout(() => {
        toast.remove();
    }, 2000);
 
}
 
 
// ==========================
// INITIAL LOAD
// ==========================
 
displayProducts(products);
 
updateCart();
