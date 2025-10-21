// =============================
//        PRODUCT DATA
// =============================
const products = [
  // MTC & ALFA
  { name:"Card 4.5$", category:"mtc & alfa", description:"30 Days Max. With 4.5$", options:[{name:"MTC", price:6.18},{name:"ALFA", price:6.18}], img:"images/Card 4.5$.png" },
  { name:"Card Start 4.5$ Or Smart 7.5$", category:"mtc & alfa", description:"One Month With 4.5$ or 7.5$", options:[{name:"MTC Start", price:6.18},{name:"MTC Smart", price:9.55}], img:"images/Start & Smart.png" },
  { name:"Card 7.58$", category:"mtc & alfa", description:"One Month With 7.58$", options:[{name:"MTC", price:9.55},{name:"ALFA", price:9.55}], img:"images/Card 7.58$.png" },
  { name:"Card 10$", category:"mtc & alfa", description:"One Month With 10$", options:[{name:"MTC", price:12.36},{name:"ALFA", price:12.36}], img:"images/Card 10$.png" },
  { name:"Card 15.15$", category:"mtc & alfa", description:"Two Months With 15.15$", options:[{name:"MTC", price:19.12},{name:"ALFA", price:19.12}], img:"images/Card 15.15$.png" },
  { name:"Card 22.73$", category:"mtc & alfa", description:"Three Months With 22.73$", options:[{name:"MTC", price:28.01},{name:"ALFA", price:28.01}], img:"images/Card 22.73$.png" },
  { name:"Card 77.28$", category:"mtc & alfa", description:"One Year With 7.58$", options:[{name:"MTC", price:88.77},{name:"ALFA", price:88.77}], img:"images/Card 77.28$.png" },
  { name:"Validity", category:"mtc & alfa", description:"Days & Dollars", options:[{name:"One Month", price:3.37},{name:"One Month & 1$", price:3.94},{name:"One Month & 2$", price:5.06},{name:"Two Months", price:6.74},{name:"Three Months", price:9},{name:"Six Months", price:13.49},{name:"One Year", price:24.72}], img:"images/validity.jpg" },
  { name:"Airtime Dollars", category:"mtc & alfa", description:"Only Dollars", options:[{name:"$ MTC", price:1.24},{name:"$ ALFA", price:1.24}], img:"images/Airtime Dollar.jpg" },

  // SERVICES
  { name:"Netflix", category:"services", description:"Netflix Accounts", options:[{name:"One Month / One User", price:3},{name:"Three Months / One User", price:8},{name:"One Year / One User", price:25},{name:"One Month / Full Account", price:10},{name:"One Year / Full Account", price:100}], img:"images/Netflix Logo.jpg" },
  { name:"Shahid VIP", category:"services", description:"Shahid VIP Accounts", options:[{name:"One Month / One User", price:3},{name:"Three Months / One User", price:4},{name:"One Year / One User", price:10},{name:"One Month / Full Account", price:5},{name:"One Year / Full Account", price:37}], img:"images/Shahid VIP.jpg" },
  { name:"Anghami Plus", category:"services", description:"Just Music", options:[{name:"Three Months", price:10},{name:"Six Months", price:15},{name:"One Year", price:22}], img:"images/Anghami.jpg" },
  { name:"Spotify Premium", category:"services", description:"Go Premium", options:[{name:"One Month", price:6},{name:"One Year", price:25}], img:"images/Spotify.jpg" },
  { name:"OSN Plus", category:"services", description:"Premium Streaming", options:[{name:"One Month / One User", price:5},{name:"One Year / One User", price:25},{name:"One Month / Full Account", price:15},{name:"One Year / Full Account", price:90}], img:"images/OSN Plus.jpg" },
  { name:"Canva PRO", category:"services", description:"Make Your Design Much Proffesional", options:[{name:"LifeTime", price:15}], img:"images/Canva Pro.jpg" },
];

let cart = [];

// =============================
//        DOM ELEMENTS
// =============================
const categoryCards = document.querySelectorAll('.category-card');
const categoriesSection = document.getElementById('categories');
const productsSection = document.getElementById('products-section');
const productList = document.getElementById('product-list');
const categoryTitle = document.getElementById('category-title');
const headerCaption = document.getElementById('header-caption');
const backBtn = document.getElementById('back-btn');
const cartMenu = document.getElementById('cart-menu');
const cartBadge = document.getElementById('cart-qty-badge');
const whatsappBtn = document.querySelector('.whatsapp-btn');

// =============================
//        CATEGORY CLICK
// =============================
categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    const caption = card.dataset.caption;

    headerCaption.textContent = caption;
    showProducts(category);

    categoriesSection.style.display = 'none';
    productsSection.style.display = 'block';
    categoryTitle.textContent = category.toUpperCase();
  });
});

// =============================
//        BACK TO CATEGORIES
// =============================
backBtn.addEventListener('click', () => {
  productsSection.style.display = 'none';
  categoriesSection.style.display = 'block';
  productList.innerHTML = '';
  headerCaption.textContent = "Choose a category to explore our products & services";
});

// =============================
//        SHOW PRODUCTS
// =============================
function showProducts(category) {
  productList.innerHTML = '';
  const filtered = products.filter(p => p.category === category);

  filtered.forEach((p, idx) => {
    const phoneInput = category === 'mtc & alfa'
      ? `<input id="phone-${idx}" class="phone-input" type="text" placeholder="📱 Enter phone number">`
      : '';

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      ${phoneInput}
      <select id="option-${idx}" class="select-option">
        ${p.options.map((o,i)=>`<option value="${i}">${o.name} - $${o.price}</option>`).join('')}
      </select>

      <div class="qty-wrapper">
        <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
        <input id="qty-${idx}" class="qty-input" type="number" value="1" min="1">
        <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
      </div>

      <button class="add-to-cart-btn" onclick="addToCart(${idx}, '${category}', this)">Add to Cart</button>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
    productList.appendChild(card);
  });
}

// =============================
//        QUANTITY CHANGE
// =============================
function changeQty(idx, delta) {
  const input = document.getElementById(`qty-${idx}`);
  let val = parseInt(input.value) + delta;
  input.value = val < 1 ? 1 : val;
}

// =============================
//        ADD TO CART
// =============================
function addToCart(idx, category, btn) {
  const filtered = products.filter(p => p.category === category);
  const p = filtered[idx];
  const optionIdx = parseInt(document.getElementById(`option-${idx}`).value);
  const qty = parseInt(document.getElementById(`qty-${idx}`).value);
  const opt = p.options[optionIdx];

  // Handle phone number for MTC & ALFA
  let phoneNumber = '';
  if (category === 'mtc & alfa') {
    phoneNumber = document.getElementById(`phone-${idx}`).value.trim();
    if (phoneNumber === '') {
      alert("⚠️ Please enter a phone number to recharge.");
      return;
    }
  }

  // Highlight selected item
  document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
  btn.parentElement.classList.add('selected');

  const itemName = `${p.name} - ${opt.name}${phoneNumber ? ' (' + phoneNumber + ')' : ''}`;
  const existing = cart.find(c => c.name === itemName);

  if (existing) existing.qty += qty;
  else cart.push({ name: itemName, price: opt.price, qty });

  document.getElementById(`qty-${idx}`).value = 1;
  if (category === 'mtc & alfa') document.getElementById(`phone-${idx}`).value = '';

  updateCart();

  // Auto open cart immediately
  cartMenu.classList.add('open');
}

// =============================
//        UPDATE CART
// =============================
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, i) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      ${item.name} x ${item.qty} = $${itemTotal.toFixed(2)}
      <button onclick="removeCart(${i})">Remove</button>
    `;
    cartItems.appendChild(div);
  });

  document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
  updateWhatsApp();
  updateCartBadge();
}

// =============================
//        REMOVE ITEM
// =============================
function removeCart(i) {
  cart.splice(i, 1);
  updateCart();
}

// =============================
//        WHATSAPP LINK
// =============================
function updateWhatsApp() {
  if (cart.length === 0) {
    whatsappBtn.href = 'https://wa.me/96171450495';
    return;
  }

  let msg = "Hello! I want to order:\n\n";
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    msg += `• ${item.name} x ${item.qty} = $${item.price} each → Total: $${itemTotal.toFixed(2)}\n`;
  });

  msg += `\n🧾 Cart Total: $${total.toFixed(2)}`;
  whatsappBtn.href = `https://wa.me/96171450495?text=${encodeURIComponent(msg)}`;
}

// =============================
//        CART BADGE
// =============================
function updateCartBadge() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  if (totalQty > 0) {
    cartBadge.style.display = 'inline-block';
    cartBadge.textContent = totalQty;
    cartBadge.classList.add('pop');
    setTimeout(() => cartBadge.classList.remove('pop'), 300);
  } else {
    cartBadge.style.display = 'none';
  }
}

// =============================
//        CART MENU BUTTONS
// =============================
document.getElementById('open-cart-btn').onclick = () => cartMenu.classList.add('open');
document.getElementById('close-cart').onclick = () => cartMenu.classList.remove('open');
