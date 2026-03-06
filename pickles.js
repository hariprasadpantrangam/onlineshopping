// 1. డేటా సెటప్
const defaultPickles = [
    { name: "lemon", price: 130 },
    { name: "mango", price: 120 },
    { name: "gongura", price: 100 },
    { name: "tomato", price: 130 },
    { name: "bitter gourd", price: 130 },
    { name: "amla", price: 150 },
    { name: "karivepaku", price: 130 }
];

let products = JSON.parse(localStorage.getItem('pickles')) || defaultPickles;
let cart = []; // కార్ట్ ఐటమ్స్ నిల్వ చేయడానికి

// 2. సెక్షన్ల మార్పు
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// 3. రిజిస్ట్రేషన్ & లాగిన్
function register() {
    const user = document.getElementById('regUser').value;
    const pass = document.getElementById('regPass').value;
    if (user && pass) {
        localStorage.setItem('storedCreds', JSON.stringify({ user, pass }));
        alert("Account Registered! Please Login.");
        showSection('loginSection');
    } else {
        alert("Please enter details");
    }
}

function login() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    if (user === "admin" && pass === "7799") {
        showSection('adminPanel');
        displayAdminProducts();
    } else {
        showSection('userPanel');
        displayUserProducts();
    }
}

// 4. అడ్మిన్ ప్యానెల్ (Table Format)
function displayAdminProducts() {
    const tbody = document.getElementById('adminBody');
    tbody.innerHTML = "";
    products.forEach((p, index) => {
        tbody.innerHTML += `
            <tr>
                <td style="text-transform: capitalize;">${p.name}</td>
                <td>₹${p.price}</td>
                <td>
                    <button style="background:#f39c12" onclick="editProduct(${index})">Edit</button>
                    <button style="background:#e74c3c" onclick="deleteProduct(${index})">Delete</button>
                </td>
            </tr>`;
    });
}

// 5. యూజర్ ప్యానెల్ (Card Format with Add to Cart)
function displayUserProducts() {
    const container = document.getElementById('userCardContainer');
    container.innerHTML = "";
    products.forEach((p, index) => {
        container.innerHTML += `
            <div class="card">
                <img src="https://via.placeholder.com" alt="pickle" style="width:80px; border-radius:50%">
                <h3 style="text-transform: capitalize;">${p.name}</h3>
                <p>₹${p.price}</p>
                <button class="order-btn" style="background:#2ecc71" onclick="addToCart(${index})">Add to Cart</button>
            </div>`;
    });
    updateCartUI(); // లాగిన్ అవ్వగానే కార్ట్ ని రీఫ్రెష్ చేస్తుంది
}

// 6. కార్ట్ లాజిక్ (Add & Delete)
function addToCart(index) {
    const item = products[index];
    cart.push(item);
    updateCartUI();
}

function removeFromCart(cartIndex) {
    cart.splice(cartIndex, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    
    if (!cartList || !totalSpan) return; // HTML లో ఎలిమెంట్స్ ఉన్నాయో లేదో చెక్ చేస్తుంది

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += parseInt(item.price);
        cartList.innerHTML += `
            <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeFromCart(${index})" style="background:#e74c3c; color:white; border:none; padding: 2px 8px; cursor:pointer; border-radius:3px;">Delete</button>
            </li>`;
    });
    totalSpan.innerText = total;
}

// 7. వాట్సాప్ ఇంటిగ్రేషన్
function sendToWhatsApp() {
    // 1. కార్ట్ ఖాళీగా ఉంటే ఆపుతుంది
    if (cart.length === 0) {
        alert("మీ కార్ట్ ఖాళీగా ఉంది! దయచేసి ఐటమ్స్ యాడ్ చేయండి.");
        return;
    }

    const phoneNumber = "919573572830"; 

    // 2. ప్రస్తుత తేదీ మరియు సమయం
    const now = new Date();
    const date = now.toLocaleDateString(); 
    const time = now.toLocaleTimeString(); 

    // 3. మెసేజ్ హెడర్ (లైన్ బై లైన్ రావడానికి ప్రతి లైన్ చివర \n యాడ్ చేశాను)
    let message = "📦 *NEW PICKLE ORDER*\n";
    message += "--------------------------\n";
    message += `📅 *Date:* ${date}\n`;
    message += `⏰ *Time:* ${time}\n`;
    message += "--------------------------\n";
    message += "*Items Ordered:*\n";
    
    // 4. ప్రతి ఐటమ్‌ను కొత్త లైన్‌లో యాడ్ చేయడం
    cart.forEach((item, index) => {
        // ఇక్కడ చివరన \n ఉండటం వల్ల ప్రతి ఐటమ్ ఒకదాని కింద ఒకటి వస్తుంది
        message += `${index + 1}. ${item.name} - ₹${item.price}\n`;
    });

    // 5. టోటల్ అమౌంట్
    const total = document.getElementById('cartTotal').innerText;
    message += "--------------------------\n";
    message += `💰 *Total Amount: ₹${total}*\n\n`;
    message += "Please confirm my order! 🙏";

    // 6. వాట్సాప్ URL (encodeURIComponent వాడటం వల్ల \n అనేది %0A గా మారి వాట్సాప్ కి వెళ్తుంది)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // 7. వాట్సాప్ విండో ఓపెన్ చేయడం
    window.open(whatsappUrl, '_blank');
}





// 8. అడ్మిన్ CRUD ఆపరేషన్లు
function addProduct() {
    const name = document.getElementById('pName').value;
    const price = document.getElementById('pPrice').value;
    if (name && price) {
        products.push({ name, price });
        saveAndRefresh();
    } else {
        alert("Fill name and price");
    }
}

function deleteProduct(index) {
    if(confirm("Delete this product from shop?")) {
        products.splice(index, 1);
        saveAndRefresh();
    }
}

function editProduct(index) {
    document.getElementById('pName').value = products[index].name;
    document.getElementById('pPrice').value = products[index].price;
    document.getElementById('editIndex').value = index;
    document.getElementById('addBtn').style.display = "none";
    document.getElementById('updateBtn').style.display = "inline";
}

function saveEdit() {
    const index = document.getElementById('editIndex').value;
    products[index].name = document.getElementById('pName').value;
    products[index].price = document.getElementById('pPrice').value;
    document.getElementById('addBtn').style.display = "inline";
    document.getElementById('updateBtn').style.display = "none";
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem('pickles', JSON.stringify(products));
    document.getElementById('pName').value = "";
    document.getElementById('pPrice').value = "";
    displayAdminProducts();
}

function logout() {
    cart = []; // లాగౌట్ అయినప్పుడు కార్ట్ క్లియర్ చేస్తుంది
    showSection('loginSection');
}
