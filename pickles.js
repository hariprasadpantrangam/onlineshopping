
// 1. డేటా సెటప్

let cart = []; 
const defaultPickles = [
    { name: "lemon", price: 130,image: "../onlineshopping/public/lemon.jpeg"},
    { name: "mango", price: 120,image: "../onlineshopping/public/mango.jpeg"},
    { name: "gongura", price: 100,image: "../onlineshopping/public/gongura.jpeg"},
    { name: "tomato", price: 130,image: "../onlineshopping/public/tomato.jpeg"},
    { name: "bitter gourd", price: 130,image: "../onlineshopping/public/kakara.jpeg"},
    { name: "amla", price: 150,image: "../onlineshopping/public/usiri.jpeg"},
    { name: "tamarind", price: 130,image: "../onlineshopping/public/tamarind.jpeg"},
    { name: "karivepaku", price: 130,image: "../onlineshopping/public/karivepaku.jpeg"},
    { name: "ginger", price: 130,image: "../onlineshopping/public/ginger.jpeg"},
    { name: "garlic", price: 130,image: "../onlineshopping/public/garlic"}

];

let products = JSON.parse(localStorage.getItem('pickles')) || defaultPickles;
 // కార్ట్ ఐటమ్స్ నిల్వ చేయడానికి

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
                <td><img src="${p.image}" style="width:50px; height:50px; object-fit:cover; border-radius:5px;"></td>
                <td>
                    <button style="background:#f39c12; color:white; border:none; padding:5px; cursor:pointer;" onclick="editProduct(${index})">Edit</button>
                    <button style="background:#e74c3c; color:white; border:none; padding:5px; cursor:pointer;" onclick="deleteProduct(${index})">Delete</button>
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
            <div class="card" style="border: 1px solid #ddd; padding: 15px; border-radius: 10px; text-align: center; margin-bottom: 10px;">
                <img src="${p.image}" 
                     alt="${p.name}" 
                     style="width:100%; height:150px; border-radius:8px; object-fit:cover;" 
                     onerror="this.src='https://via.placeholder.com'">
                <h3 style="text-transform: capitalize; margin: 10px 0;">${p.name}</h3>
                <p style="color: #2ecc71; font-weight: bold;">₹${p.price}</p>
                <button class="order-btn" style="background:#2ecc71; color:white; border:none; padding:10px; width:100%; cursor:pointer; border-radius:5px;" onclick="addToCart(${index})">
                    Add to Cart
                </button>
            </div>`;
    });
    updateCartUI();
}



// 6. కార్ట్ లాజిక్ (Add & Delete)
// 1. You must initialize the cart array outside the function


// 6. కార్ట్ లాజిక్ (Add & Delete) - RECTIFIED
// function addToCart(index) {
//     // FIX: Access 'products' because that's what the User Panel displays
//     if (products && products[index]) {
//         const item = products[index];
        
//         // Push a copy of the item to the cart array
//         cart.push({...item}); 
        
//         console.log("Added to cart:", item.name);
        
//         // Important: Update the UI immediately after adding
//         updateCartUI();
        
//         // Optional: Provide feedback to the user
//         alert(`${item.name} added to cart!`);
//     } else {
//         console.error("Could not find product at index:", index);
//     }
// }




function removeFromCart(cartIndex) {
    cart.splice(cartIndex, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    
    if (!cartList || !totalSpan) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += Number(item.price);
        
        cartList.innerHTML += `
            <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${item.image}" style="width:40px; height:40px; object-fit:cover; border-radius:5px;" onerror="this.src='https://via.placeholder.com'">
                    <span style="text-transform: capitalize;">${item.name} - ₹${item.price}</span>
                </div>
                <button onclick="removeFromCart(${index})" style="background:#e74c3c; color:white; border:none; padding: 4px 8px; cursor:pointer; border-radius:3px;">Delete</button>
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

// --- ADD THIS FUNCTION (REQUIRED FOR ADMIN ACTIONS) ---
function saveAndRefresh() {
    // Save updated products to localStorage
    localStorage.setItem('pickles', JSON.stringify(products));
    
    // Refresh both views to keep data in sync
    displayAdminProducts();
    displayUserProducts();
    
    // Clear inputs if they exist
    if(document.getElementById('pName')) document.getElementById('pName').value = "";
    if(document.getElementById('pPrice')) document.getElementById('pPrice').value = "";
}

function logout() {
    cart = []; // లాగౌట్ అయినప్పుడు కార్ట్ క్లియర్ చేస్తుంది
    showSection('loginSection');
}