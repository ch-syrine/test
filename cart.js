const cart = {};
let toastTimer = null;

// Called when user clicks "order now"
function addToCart(btn, name, price) {
    if (cart[name]) {
        cart[name].qty++;
    } else {
        cart[name] = { price: price, qty: 1 };
    }
    updateBadge();
    showToast(name);
    btn.textContent = '✓ Added!';
    btn.style.background = '#2d7a4f';
    setTimeout(function () {
        btn.textContent = 'order now';
        btn.style.background = '';
    }, 1500);
}

// Change quantity inside the drawer
function changeQty(name, delta) {
    if (!cart[name]) return;
    cart[name].qty += delta;
    if (cart[name].qty <= 0) {
        delete cart[name];
    }
    renderCart();
    updateBadge();
}

// Update the number badge on the cart icon
function updateBadge() {
    var total = 0;
    for (var key in cart) {
        total += cart[key].qty;
    }
    var badge = document.getElementById('cart-badge');
    badge.textContent = total;
    if (total > 0) {
        badge.classList.add('visible');
    } else {
        badge.classList.remove('visible');
    }
}

// Show the toast notification
function showToast(name) {
    var toast = document.getElementById('toast');
    document.getElementById('toast-text').textContent = '"' + name + '" added to cart!';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove('show');
    }, 2200);
}

// Open cart drawer
function openCart() {
    renderCart();
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Close cart drawer
function closeCart() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

// Confirm the order
function confirmOrder() {
    // Clear the cart
    for (var key in cart) {
        delete cart[key];
    }
    updateBadge();

    // Show confirmation screen inside the drawer
    var container = document.getElementById('cart-items');
    var footer = document.getElementById('cart-footer');

    footer.style.display = 'none';
    container.innerHTML =
        '<div style="text-align:center; margin-top: 60px; padding: 20px;">' +
        '<div style="font-size: 60px; margin-bottom: 16px;">🎉</div>' +
        '<h3 style="color: #592C34; font-size: 18px; margin-bottom: 10px;">Order Confirmed!</h3>' +
        '<p style="color: #7a4a50; font-size: 14px; line-height: 1.6;">Your order has been placed.<br><strong>Thanks for choosing us!</strong></p>' +
        '<button onclick="closeCart()" style="margin-top: 24px; padding: 10px 24px; background: #592C34; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer;">Close</button>' +
        '</div>';
}

// Build the cart drawer content
function renderCart() {
    var container = document.getElementById('cart-items');
    var footer = document.getElementById('cart-footer');
    var keys = Object.keys(cart);

    if (keys.length === 0) {
        container.innerHTML =
            '<div class="cart-empty">' +
            '<div class="empty-icon">🛒</div>' +
            '<p>Your cart is empty!<br>Add some delicious items.</p>' +
            '</div>';
        footer.style.display = 'none';
        return;
    }

    var html = '';
    var total = 0;

    for (var i = 0; i < keys.length; i++) {
        var name = keys[i];
        var item = cart[name];
        var subtotal = item.price * item.qty;
        total += subtotal;
        var safeName = name.replace(/'/g, "\\'");
        html +=
            '<div class="cart-item">' +
            '<div class="cart-item-name">' + name + '</div>' +
            '<div class="qty-controls">' +
            '<button class="qty-btn" onclick="changeQty(\'' + safeName + '\', -1)">−</button>' +
            '<span class="qty-num">' + item.qty + '</span>' +
            '<button class="qty-btn" onclick="changeQty(\'' + safeName + '\', +1)">+</button>' +
            '</div>' +
            '<div class="cart-item-price">' + subtotal + ' DA</div>' +
            '</div>';
    }

    container.innerHTML = html;
    document.getElementById('cart-total').textContent = total + ' DA';
    footer.style.display = 'block';
}
