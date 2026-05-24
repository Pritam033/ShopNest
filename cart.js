/**
 * cart.js — Cart state management & drawer UI
 * Luma Shop
 */

// ── State ──────────────────────────────────────
// { [productId]: quantity }
let cart = {};

// ── Cart Mutations ─────────────────────────────
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartCount();
  renderProducts();
  renderCart();
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartCount();
  renderProducts();
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  updateCartCount();
  renderProducts();
  renderCart();
}

function clearCart() {
  cart = {};
  updateCartCount();
  renderProducts();
}

// ── Cart Badge ─────────────────────────────────
function updateCartCount() {
  const total = Object.values(cart).reduce((sum, q) => sum + q, 0);
  document.getElementById("cartCount").textContent = total;
}

// ── Drawer Toggle ──────────────────────────────
function toggleCart() {
  document.getElementById("drawer").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("open");
  renderCart();
}

// ── Drawer Render ──────────────────────────────
function renderCart() {
  const items = Object.entries(cart).filter(([, q]) => q > 0);
  const body  = document.getElementById("cartBody");
  const foot  = document.getElementById("cartFoot");

  if (!items.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="ei">🛒</div>
        <p>Your cart is empty</p>
      </div>`;
    foot.style.display = "none";
    return;
  }

  foot.style.display = "block";

  let subtotal = 0;

  body.innerHTML = items.map(([id, qty]) => {
    const p = PRODUCTS.find(x => x.id == id);
    subtotal += p.price * qty;
    return `
      <div class="cart-item">
        <div class="ci-img">${p.emoji}</div>
        <div class="ci-info">
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">₹${p.price.toLocaleString()}</div>
          <div class="ci-qty">
            <button class="qty-btn" onclick="changeQty(${id}, -1)">−</button>
            <span class="qty-num">${qty}</span>
            <button class="qty-btn" onclick="changeQty(${id}, 1)">+</button>
            <button class="rm-btn"  onclick="removeItem(${id})">✕ remove</button>
          </div>
        </div>
      </div>`;
  }).join("");

  document.getElementById("subtotal").textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById("total").textContent     = `₹${subtotal.toLocaleString()}`;
}

// ── Cart Total Helper ──────────────────────────
function getCartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(x => x.id == id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
}
