/**
 * checkout.js — Checkout modal, form & order confirmation
 * Luma Shop
 */

// ── Open / Close ───────────────────────────────
function openCheckout() {
  renderCheckoutForm();
  document.getElementById("modalOverlay").classList.add("open");
}

function closeCheckout() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}

function closeCheckoutOutside(event) {
  if (event.target === document.getElementById("modalOverlay")) {
    closeCheckout();
  }
}

// ── Checkout Form ──────────────────────────────
function renderCheckoutForm() {
  document.getElementById("checkoutContent").innerHTML = `
    <div class="modal-title">Checkout</div>

    <div class="form-row">
      <label>Full Name</label>
      <input type="text" id="chkName" placeholder="Rahul Sharma"/>
    </div>

    <div class="form-row">
      <label>Email</label>
      <input type="email" id="chkEmail" placeholder="rahul@email.com"/>
    </div>

    <div class="form-row">
      <label>Phone</label>
      <input type="tel" id="chkPhone" placeholder="+91 9876543210"/>
    </div>

    <div class="form-row">
      <label>Address</label>
      <input type="text" id="chkAddress" placeholder="Street, Area"/>
    </div>

    <div class="form-grid">
      <div class="form-row">
        <label>City</label>
        <input type="text" id="chkCity" placeholder="Kolkata"/>
      </div>
      <div class="form-row">
        <label>PIN Code</label>
        <input type="text" id="chkPin" placeholder="700001"/>
      </div>
    </div>

    <div class="form-row">
      <label>State</label>
      <select id="chkState">
        <option>West Bengal</option>
        <option>Maharashtra</option>
        <option>Karnataka</option>
        <option>Tamil Nadu</option>
        <option>Delhi</option>
        <option>Gujarat</option>
        <option>Rajasthan</option>
        <option>Uttar Pradesh</option>
      </select>
    </div>

    <div style="border-top:1px solid var(--border);margin:20px 0 16px;padding-top:16px;
                font-family:'Playfair Display',serif;font-size:16px;font-weight:600">
      Payment
    </div>

    <div class="form-row">
      <label>Card Number</label>
      <input type="text" id="chkCard" placeholder="4242 4242 4242 4242" maxlength="19"
             oninput="formatCard(this)"/>
    </div>

    <div class="form-grid">
      <div class="form-row">
        <label>Expiry</label>
        <input type="text" id="chkExpiry" placeholder="MM/YY" maxlength="5"
               oninput="formatExpiry(this)"/>
      </div>
      <div class="form-row">
        <label>CVV</label>
        <input type="password" id="chkCvv" placeholder="•••" maxlength="4"/>
      </div>
    </div>

    <div id="chkError" style="color:var(--accent);font-size:13px;margin-bottom:8px;display:none"></div>

    <button class="btn-primary"
            style="width:100%;padding:14px;font-size:15px;border-radius:100px;margin-top:8px"
            onclick="placeOrder()">
      Place Order — ₹${getCartTotal().toLocaleString()}
    </button>
  `;
}

// ── Input Formatters ───────────────────────────
function formatCard(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = v.match(/.{1,4}/g)?.join(" ") || v;
}

function formatExpiry(input) {
  let v = input.value.replace(/\D/g, "").substring(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
  input.value = v;
}

// ── Validation ─────────────────────────────────
function validateCheckout() {
  const required = ["chkName", "chkEmail", "chkPhone", "chkAddress", "chkCity", "chkPin", "chkCard", "chkExpiry", "chkCvv"];
  for (const id of required) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      showCheckoutError("Please fill in all fields.");
      el?.focus();
      return false;
    }
  }
  const email = document.getElementById("chkEmail").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showCheckoutError("Please enter a valid email address.");
    return false;
  }
  return true;
}

function showCheckoutError(msg) {
  const el = document.getElementById("chkError");
  if (el) { el.textContent = msg; el.style.display = "block"; }
}

// ── Place Order ────────────────────────────────
function placeOrder() {
  if (!validateCheckout()) return;

  const orderId = "LM" + Math.floor(Math.random() * 900000 + 100000);
  const name    = document.getElementById("chkName").value.trim();

  document.getElementById("checkoutContent").innerHTML = `
    <div class="success-screen">
      <div class="success-icon">🎉</div>
      <h2>Order Placed!</h2>
      <p>Thanks, ${name}! We'll send a confirmation to your email shortly.</p>
      <div class="order-num">Order #${orderId}</div>
      <p style="font-size:13px;color:var(--sub);margin-top:6px">
        Estimated delivery: 3–5 business days
      </p>
      <button class="btn-primary" style="margin-top:20px" onclick="closeCheckout()">
        Continue Shopping
      </button>
    </div>`;

  clearCart();
}
