/**
 * products.js — Product catalogue data & rendering
 * Luma Shop
 */

// ── Data ───────────────────────────────────────
const PRODUCTS = [
  { id:  1, name: "Wireless Noise-Cancelling Headphones", cat: "Electronics", price: 2999, old: 4499,  emoji: "🎧", tag: "Best Seller" },
  { id:  2, name: "Ergonomic Office Chair",               cat: "Furniture",   price: 8999, old: 12999, emoji: "🪑", tag: "Popular"    },
  { id:  3, name: "Stainless Steel Water Bottle 1L",      cat: "Kitchen",     price:  599, old:   899, emoji: "🧴", tag: "Eco"        },
  { id:  4, name: "LED Desk Lamp with USB",               cat: "Electronics", price: 1299, old:  1899, emoji: "💡", tag: ""           },
  { id:  5, name: "Running Shoes – Lightweight",          cat: "Fashion",     price: 2499, old:  3499, emoji: "👟", tag: "New"        },
  { id:  6, name: "Bamboo Cutting Board Set",             cat: "Kitchen",     price:  799, old:  1099, emoji: "🪵", tag: "Eco"        },
  { id:  7, name: "Portable Bluetooth Speaker",           cat: "Electronics", price: 1799, old:  2499, emoji: "🔊", tag: ""           },
  { id:  8, name: "Cotton Bath Towel Set (3pc)",          cat: "Home",        price:  999, old:  1499, emoji: "🛁", tag: ""           },
  { id:  9, name: "Indoor Plant – Peace Lily",            cat: "Home",        price:  449, old:   599, emoji: "🌿", tag: "Trending"   },
  { id: 10, name: "Mechanical Keyboard TKL",              cat: "Electronics", price: 3499, old:  4999, emoji: "⌨️", tag: ""           },
  { id: 11, name: "Linen Throw Pillow Cover",             cat: "Home",        price:  349, old:   499, emoji: "🛋️", tag: ""           },
  { id: 12, name: "Stainless Cookware Set 5pc",           cat: "Kitchen",     price: 4999, old:  7499, emoji: "🍳", tag: "Deal"       },
  { id: 13, name: "Yoga Mat Non-Slip",                    cat: "Sports",      price:  899, old:  1299, emoji: "🧘", tag: ""           },
  { id: 14, name: "Men's Formal Slim Fit Shirt",          cat: "Fashion",     price:  799, old:  1199, emoji: "👔", tag: ""           },
  { id: 15, name: "Smart LED Bulbs Pack (4)",             cat: "Electronics", price: 1199, old:  1799, emoji: "💡", tag: "Smart Home" },
  { id: 16, name: "Dumbbell Set Adjustable 10kg",         cat: "Sports",      price: 2199, old:  2999, emoji: "🏋️", tag: ""           },
  { id: 17, name: "Ceramic Coffee Mug 350ml",             cat: "Kitchen",     price:  299, old:   449, emoji: "☕", tag: ""           },
  { id: 18, name: "Wall Clock Minimalist",                cat: "Home",        price:  699, old:   999, emoji: "🕐", tag: ""           },
  { id: 19, name: "Sunglasses UV400",                     cat: "Fashion",     price:  599, old:   899, emoji: "🕶️", tag: "Summer"     },
  { id: 20, name: "USB-C Hub 7-in-1",                    cat: "Electronics", price: 1599, old:  2299, emoji: "🔌", tag: ""           },
  { id: 21, name: "Resistance Bands Set",                 cat: "Sports",      price:  499, old:   749, emoji: "💪", tag: ""           },
  { id: 22, name: "Wooden Bookshelf 5-Tier",              cat: "Furniture",   price: 5999, old:  8499, emoji: "📚", tag: ""           },
  { id: 23, name: "Travel Backpack 40L",                  cat: "Fashion",     price: 1999, old:  2999, emoji: "🎒", tag: ""           },
  { id: 24, name: "Scented Soy Candle Set",               cat: "Home",        price:  649, old:   899, emoji: "🕯️", tag: "Gift Idea"  },
];

const CATEGORIES = ["All", "Electronics", "Kitchen", "Home", "Fashion", "Sports", "Furniture"];

// ── State ──────────────────────────────────────
let activeCategory = "All";
let searchQuery    = "";

// ── Category Tabs ──────────────────────────────
function renderCats() {
  document.getElementById("cats").innerHTML = CATEGORIES.map(c => `
    <button class="cat ${c === activeCategory ? "active" : ""}" onclick="selectCat('${c}')">
      ${c}
    </button>
  `).join("");
}

function selectCat(c) {
  activeCategory = c;
  renderCats();
  renderProducts();
}

// ── Search ─────────────────────────────────────
function filterProducts() {
  searchQuery = document.getElementById("searchInput").value.toLowerCase();
  renderProducts();
}

// ── Product Grid ───────────────────────────────
function renderProducts() {
  let list = PRODUCTS;

  if (activeCategory !== "All") {
    list = list.filter(p => p.cat === activeCategory);
  }
  if (searchQuery) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.cat.toLowerCase().includes(searchQuery)
    );
  }

  document.getElementById("sectionTitle").textContent =
    activeCategory === "All" ? "All Products" : activeCategory;
  document.getElementById("sectionSub").textContent =
    `${list.length} item${list.length !== 1 ? "s" : ""}`;

  document.getElementById("productGrid").innerHTML = list.map(p => {
    const inCart = (cart[p.id] || 0) > 0;
    const discount = Math.round((1 - p.price / p.old) * 100);
    return `
      <div class="card">
        <div class="card-img">${p.emoji}</div>
        <div class="card-body">
          <span class="card-tag">
            ${p.cat}${p.tag ? `<span class="badge">${p.tag}</span>` : ""}
          </span>
          <div class="card-name">${p.name}</div>
          <div class="card-price-row">
            <div>
              <span class="card-price">₹${p.price.toLocaleString()}</span>
              <span class="card-old">₹${p.old.toLocaleString()}</span>
            </div>
            <button class="add-btn ${inCart ? "added" : ""}" onclick="addToCart(${p.id})">
              ${inCart ? "✓ Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}
