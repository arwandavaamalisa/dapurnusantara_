// SHARED UTILS
const IDR = n => 'Rp ' + Number(n).toLocaleString('id-ID');

function showNotif(msg) {
  let el = document.getElementById('notif');
  if (!el) {
    el = document.createElement('div');
    el.id = 'notif';
    el.className = 'notif';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

// CART
let cart = JSON.parse(localStorage.getItem('dn_cart') || '[]');

function saveCart() {
  localStorage.setItem('dn_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(product) {
  const existing = cart.find(c => c.id === product.id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...product, qty: 1 }); }
  saveCart();
  showNotif(`✅ ${product.name} ditambahkan!`);
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  saveCart();
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = IDR(total);

  const itemsEl = document.getElementById('cartItems');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><div style="font-size:3.5rem;margin-bottom:12px">🛒</div><div style="font-weight:700;margin-bottom:6px">Keranjang kosong!</div><div style="font-size:0.8rem;color:var(--gray)">Yuk tambah jajanan favoritmu 😋</div></div>`;
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div class="cart-item">
        <div class="cart-item-emoji">${c.emoji}</div>
        <div style="flex:1">
          <div class="cart-item-name">${c.name}</div>
          <div class="cart-item-price">${IDR(c.price)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
          <span class="qty-num">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${c.id},1)">+</button>
        </div>
      </div>
    `).join('');
  }
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function checkoutWA() {
  if (cart.length === 0) { showNotif('⚠️ Keranjang masih kosong!'); return; }
  const items = cart.map(c => `• ${c.name} x${c.qty} = ${IDR(c.price * c.qty)}`).join('\n');
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const msg = `Halo Dapur Nusantara! 🍜\n\nSaya mau order:\n${items}\n\n💰 Total: ${IDR(total)}\n\nMohon info pembayarannya ya! Terima kasih 😊`;
  window.open(`https://wa.me/6281298765432?text=${encodeURIComponent(msg)}`, '_blank');
}

// INIT CART ON LOAD
document.addEventListener('DOMContentLoaded', updateCartUI);

// PRODUCTS DATA (shared)
const PRODUCTS = [
  { id:1, emoji:'🍪', name:'Keripik Singkong Pedas', desc:'Renyah, gurih, pedas nendang! Dari singkong pilihan lokal', price:25000, weight:'200gr', label:'hot', cat:'snack' },
  { id:2, emoji:'🍩', name:'Nastar Keju Premium', desc:'Nastar lembut isi selai nanas dengan topping keju cheddar', price:85000, weight:'300gr', label:'best', cat:'snack' },
  { id:3, emoji:'🧋', name:'Minuman Rempah Jahe', desc:'Hangat, segar, kaya rempah. Bagus untuk imunitas tubuh', price:35000, weight:'500ml', label:'new', cat:'drink' },
  { id:4, emoji:'🌶️', name:'Sambal Bajak Bu Sari', desc:'Sambal autentik resep turun-temurun. Pedas mantap!', price:45000, weight:'250gr', label:'hot', cat:'sambal' },
  { id:5, emoji:'🍘', name:'Kripik Tempe Kriuk', desc:'Tempe berkualitas digoreng kriuk dengan bumbu rahasia', price:22000, weight:'150gr', label:'', cat:'snack' },
  { id:6, emoji:'🥤', name:'Es Teh Mangga Segar', desc:'Perpaduan teh segar dengan mangga harum, manis alami', price:18000, weight:'350ml', label:'new', cat:'drink' },
  { id:7, emoji:'🍡', name:'Klepon Gula Jawa', desc:'Klepon tradisional isi gula merah, berbalut kelapa parut', price:30000, weight:'10 pcs', label:'', cat:'snack' },
  { id:8, emoji:'🍫', name:'Brownies Kukus Viral', desc:'Brownies lembut, coklat intense, tekstur moist sempurna', price:65000, weight:'400gr', label:'hot', cat:'snack' },
  { id:9, emoji:'🥜', name:'Kacang Telur Krispy', desc:'Kacang tanah dibalut tepung bumbu, renyah tahan lama', price:20000, weight:'200gr', label:'', cat:'snack' },
  { id:10, emoji:'🍵', name:'Wedang Uwuh Sachet', desc:'Minuman rempah khas Jogja, hangat dan menyehatkan', price:28000, weight:'10 sachet', label:'new', cat:'drink' },
  { id:11, emoji:'🌰', name:'Serundeng Kelapa Pedas', desc:'Serundeng gurih pedas, cocok untuk lauk atau camilan', price:38000, weight:'200gr', label:'', cat:'sambal' },
  { id:12, emoji:'🍬', name:'Dodol Garut Original', desc:'Dodol legit khas Garut, dibuat dari bahan pilihan', price:42000, weight:'250gr', label:'', cat:'snack' },
];
