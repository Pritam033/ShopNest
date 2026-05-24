/**
 * login.js — Login / Sign-up modal
 * ShopNest
 */

// ── State ──────────────────────────────────────
let currentUser = null; // { name, email }
let loginMode   = "login"; // "login" | "signup"

// ── Open / Close ───────────────────────────────
function openLogin() {
  if (currentUser) {
    // If already logged in, show account menu
    renderAccountView();
  } else {
    loginMode = "login";
    renderLoginForm();
  }
  document.getElementById("loginOverlay").classList.add("open");
}

function closeLogin() {
  document.getElementById("loginOverlay").classList.remove("open");
}

function closeLoginOutside(event) {
  if (event.target === document.getElementById("loginOverlay")) {
    closeLogin();
  }
}

// ── Tab Switch ─────────────────────────────────
function switchLoginTab(mode) {
  loginMode = mode;
  renderLoginForm();
}

// ── Render Login / Signup Form ─────────────────
function renderLoginForm() {
  const isLogin = loginMode === "login";

  document.getElementById("loginContent").innerHTML = `
    <div class="login-header">
      <div class="login-logo">Shop<span>Nest</span></div>
      <div class="login-tagline">${isLogin ? "Welcome back! Sign in to continue." : "Create your account in seconds."}</div>
    </div>

    <div class="login-tabs">
      <button class="login-tab ${isLogin ? "active" : ""}" onclick="switchLoginTab('login')">Login</button>
      <button class="login-tab ${!isLogin ? "active" : ""}" onclick="switchLoginTab('signup')">Sign Up</button>
    </div>

    <button class="social-btn" onclick="socialAuth('Google')">
      <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
      Continue with Google
    </button>

    <button class="social-btn" onclick="socialAuth('Apple')">
      <svg width="16" height="18" viewBox="0 0 814 1000"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.3-164-39.3c-76.5 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663.1 0 541.8c0-207.3 135.3-317 268.1-317 70.2 0 128.9 46.4 173.1 46.4 42.8 0 109.3-49.1 189.2-49.1 30.8 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
      Continue with Apple
    </button>

    <div class="divider">or</div>

    ${!isLogin ? `
    <div class="form-row">
      <label>Full Name</label>
      <input type="text" id="loginName" placeholder="Rahul Sharma"/>
    </div>` : ""}

    <div class="form-row">
      <label>Email</label>
      <input type="email" id="loginEmail" placeholder="you@email.com"/>
    </div>

    <div class="form-row">
      <label>Password</label>
      <input type="password" id="loginPassword" placeholder="••••••••"/>
    </div>

    ${isLogin ? `<span class="forgot-link" onclick="showForgotPassword()">Forgot password?</span>` : ""}

    <div id="loginError" style="color:var(--accent);font-size:13px;margin-bottom:8px;display:none"></div>

    <button class="btn-primary"
            style="width:100%;padding:13px;font-size:15px;border-radius:100px"
            onclick="${isLogin ? 'submitLogin()' : 'submitSignup()'}">
      ${isLogin ? "Sign In" : "Create Account"}
    </button>

    ${!isLogin ? `<p class="terms-note">By signing up, you agree to our <u>Terms of Service</u> and <u>Privacy Policy</u>.</p>` : ""}
  `;
}

// ── Render Account View ────────────────────────
function renderAccountView() {
  document.getElementById("loginContent").innerHTML = `
    <div class="login-header">
      <div style="font-size:48px;margin-bottom:8px">👋</div>
      <div class="login-logo">Hi, ${currentUser.name.split(" ")[0]}!</div>
      <div class="login-tagline">${currentUser.email}</div>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px">
      <button class="social-btn" style="justify-content:flex-start;gap:12px">
        📦 <span>My Orders</span>
      </button>
      <button class="social-btn" style="justify-content:flex-start;gap:12px">
        ❤️ <span>Wishlist</span>
      </button>
      <button class="social-btn" style="justify-content:flex-start;gap:12px">
        ⚙️ <span>Account Settings</span>
      </button>
    </div>

    <button class="btn-primary"
            style="width:100%;padding:13px;font-size:14px;border-radius:100px;background:#f0ede8;color:var(--text)"
            onclick="logoutUser()">
      Sign Out
    </button>
  `;
}

// ── Forgot Password ────────────────────────────
function showForgotPassword() {
  document.getElementById("loginContent").innerHTML = `
    <div class="login-header">
      <div style="font-size:36px;margin-bottom:8px">🔑</div>
      <div class="login-logo" style="font-size:20px">Reset Password</div>
      <div class="login-tagline">Enter your email and we'll send a reset link.</div>
    </div>

    <div class="form-row">
      <label>Email</label>
      <input type="email" id="resetEmail" placeholder="you@email.com"/>
    </div>

    <div id="loginError" style="color:var(--accent);font-size:13px;margin-bottom:8px;display:none"></div>

    <button class="btn-primary"
            style="width:100%;padding:13px;font-size:15px;border-radius:100px"
            onclick="submitReset()">
      Send Reset Link
    </button>

    <p style="text-align:center;margin-top:14px;font-size:13px;color:var(--sub);cursor:pointer"
       onclick="switchLoginTab('login')">
      ← Back to Login
    </p>
  `;
}

// ── Auth Actions ───────────────────────────────
function submitLogin() {
  const email    = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;

  if (!email || !password) {
    showLoginError("Please fill in all fields.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showLoginError("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    showLoginError("Password must be at least 6 characters.");
    return;
  }

  // Simulate login success
  const name = email.split("@")[0].replace(/[._]/g, " ")
    .split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  loginSuccess({ name, email });
}

function submitSignup() {
  const name     = document.getElementById("loginName")?.value.trim();
  const email    = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;

  if (!name || !email || !password) {
    showLoginError("Please fill in all fields.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showLoginError("Please enter a valid email address.");
    return;
  }
  if (password.length < 6) {
    showLoginError("Password must be at least 6 characters.");
    return;
  }

  loginSuccess({ name, email });
}

function submitReset() {
  const email = document.getElementById("resetEmail")?.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showLoginError("Please enter a valid email address.");
    return;
  }

  document.getElementById("loginContent").innerHTML = `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:48px;margin-bottom:16px">📧</div>
      <div class="login-logo" style="font-size:20px;margin-bottom:8px">Check your inbox</div>
      <p style="color:var(--sub);font-size:14px;line-height:1.6">
        We've sent a reset link to<br/><strong>${email}</strong>
      </p>
      <button class="btn-primary" style="margin-top:24px;padding:12px 28px;border-radius:100px;font-size:14px"
              onclick="closeLogin()">Done</button>
    </div>
  `;
}

function socialAuth(provider) {
  // Simulate social auth
  const mockUser = {
    name: provider === "Google" ? "Google User" : "Apple User",
    email: provider === "Google" ? "user@gmail.com" : "user@icloud.com"
  };
  loginSuccess(mockUser);
}

function loginSuccess(user) {
  currentUser = user;
  const btn = document.querySelector(".login-btn");
  if (btn) {
    btn.textContent = user.name.split(" ")[0];
    btn.classList.add("logged-in");
  }
  closeLogin();

  // Show brief welcome toast
  showToast(`Welcome, ${user.name.split(" ")[0]}! 👋`);
}

function logoutUser() {
  currentUser = null;
  const btn = document.querySelector(".login-btn");
  if (btn) {
    btn.textContent = "Login";
    btn.classList.remove("logged-in");
  }
  closeLogin();
  showToast("You've been signed out.");
}

function showLoginError(msg) {
  const el = document.getElementById("loginError");
  if (el) { el.textContent = msg; el.style.display = "block"; }
}

// ── Toast Notification ─────────────────────────
function showToast(msg) {
  const existing = document.getElementById("sn-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "sn-toast";
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:var(--text); color:#fff; padding:12px 22px;
    border-radius:100px; font-size:14px; font-family:'DM Sans',sans-serif;
    z-index:9999; opacity:0; transition:opacity 0.3s;
    box-shadow:0 4px 20px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.style.opacity = "1");
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
