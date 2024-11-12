
let cartItems = [];

function message() {
    var x = document.getElementById("message");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function buy() {
    var x = document.getElementById("buy");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function addToCart(itemName, itemPrice) {
    let existingItem = cartItems.find(function (item) {
        return item.name == itemName;
    });
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCartCount();
    updateTotalPrice();
    message();
}

function removeFromCart(itemName) {
    let itemIndex;
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == itemName) {
            itemIndex = i;
            break;
        }
    }
    if (itemIndex != -1) {
        cartItems.splice(itemIndex, 1);
        updateCartModal();
        updateCartCount();
        updateTotalPrice();
    }
}

function increaseQuantity(index) {
    cartItems[index].quantity++;
    updateCartModal();
    updateTotalPrice();
    updateCartCount();
}

function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        updateCartModal();
        updateTotalPrice();
        updateCartCount();
    }
}

function updateCartModal() {
    let cartContent = document.getElementById("cartContent");
    cartContent.innerHTML = "";
    let img = "images/";
    let totalPrice = 0;

    for (let index = 0; index < cartItems.length; index++) {
        let item = cartItems[index];
        let price = item.price * item.quantity;
        totalPrice += price;

        let cartItemHTML = `
            <div class="cart-item-details">
                <img src="${img}${item.name}.png" alt="${item.name}">
                <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
                <button class="decrease-quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                <button class="increase-quantity-btn" onclick="increaseQuantity(${index})">+</button>
                <button class="remove-btn" onclick="removeFromCart('${item.name}')">
                    <img src="images/delete.png" alt="Delete" style="height: 30px;width:80%;background:white;">
                </button>
            </div>
        `;
        cartContent.innerHTML += cartItemHTML;
    }
}

function updateCartCount() {
    let cartCountElement = document.getElementById('cartCount');
    let totalQuantity = 0;

    for (let i = 0; i < cartItems.length; i++) {
        totalQuantity += cartItems[i].quantity;
    }

    cartCountElement.textContent = totalQuantity;
}


function updateTotalPrice() {
    let totalPrice = 0;

    for (let i = 0; i < cartItems.length; i++) {
        totalPrice += cartItems[i].price * cartItems[i].quantity;
    }

    let totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

var menuIcon = document.querySelector('.menu-icon');
var navLinks = document.querySelector('.navlinks');
menuIcon.addEventListener('click', function () {
    navLinks.classList.toggle('navlinks-active');
});

document.querySelector('.cart-icon').addEventListener('click', () => {
    updateCartModal();
    $('#cartModal').modal('show');
});

function confirmOrder() {
    if (cartItems.length == 0) {
        alert("Please add items to your cart first!");
        return;
    }
    buy();
    cartItems = [];
    updateCartCount();
    updateTotalPrice();
    updateCartModal();
}
