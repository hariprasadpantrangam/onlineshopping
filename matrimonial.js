const defaultProfiles = [
    { name: "Ramesh", age: 28, gender: "Male", raasi: "Mesha", caste: "OC", education: "B.Tech", photo: "ramesh.jpg" },
    { name: "Sita", age: 25, gender: "Female", raasi: "Kanya", caste: "BC", education: "MBA", photo: "sita.jpg" }
];

let profiles = JSON.parse(localStorage.getItem('profiles')) || defaultProfiles;
let shortlist = [];

// Section toggle
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Login
function login() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    if (user.startsWith("ad") && pass.startsWith("77")) {
        showSection('adminPanel');
        displayAdminProfiles();
    } else {
        showSection('userPanel');
        displayUserProfiles();
    }
}

// Admin Panel
function displayAdminProfiles() {
    const tbody = document.getElementById('adminBody');
    tbody.innerHTML = "";
    profiles.forEach((p, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.gender}</td>
                <td>${p.raasi}</td>
                <td>${p.caste}</td>
                <td>${p.education}</td>
                <td><img src="${p.photo}" style="width:50px;height:50px;border-radius:5px;"></td>
                <td>
                    <button onclick="editProfile(${index})">Edit</button>
                    <button onclick="deleteProfile(${index})">Delete</button>
                </td>
            </tr>`;
    });
}

function addProfile() {
    const name = document.getElementById('pName').value;
    const age = document.getElementById('pAge').value;
    const gender = document.getElementById('pGender').value;
    const raasi = document.getElementById('pRaasi').value;
    const caste = document.getElementById('pCaste').value;
    const education = document.getElementById('pEducation').value;
    const photo = document.getElementById('pPhoto').value;

    if (name && age && gender) {
        profiles.push({ name, age, gender, raasi, caste, education, photo });
        saveProfiles();
    } else {
        alert("Fill all mandatory fields");
    }
}

function editProfile(index) {
    const p = profiles[index];
    document.getElementById('pName').value = p.name;
    document.getElementById('pAge').value = p.age;
    document.getElementById('pGender').value = p.gender;
    document.getElementById('pRaasi').value = p.raasi;
    document.getElementById('pCaste').value = p.caste;
    document.getElementById('pEducation').value = p.education;
    document.getElementById('pPhoto').value = p.photo;
    document.getElementById('editIndex').value = index;
}

function saveEdit() {
    const index = document.getElementById('editIndex').value;
    profiles[index] = {
        name: document.getElementById('pName').value,
        age: document.getElementById('pAge').value,
        gender: document.getElementById('pGender').value,
        raasi: document.getElementById('pRaasi').value,
        caste: document.getElementById('pCaste').value,
        education: document.getElementById('pEducation').value,
        photo: document.getElementById('pPhoto').value
    };
    saveProfiles();
}

function deleteProfile(index) {
    if (confirm("Delete this profile?")) {
        profiles.splice(index, 1);
        saveProfiles();
    }
}

function saveProfiles() {
    localStorage.setItem('profiles', JSON.stringify(profiles));
    displayAdminProfiles();
}

// User Panel
function displayUserProfiles() {
    const container = document.getElementById('userCardContainer');
    container.innerHTML = "";
    profiles.forEach((p, index) => {
        container.innerHTML += `
            <div class="card">
                <img src="${p.photo}" style="width:100%;height:150px;object-fit:cover;border-radius:8px;">
                <h3>${p.name}, ${p.age}</h3>
                <p>${p.education} | ${p.caste} | ${p.raasi}</p>
                <button onclick="shortlistProfile(${index})">Shortlist</button>
            </div>`;
    });
}

function shortlistProfile(index) {
    shortlist.push(profiles[index]);
    updateShortlistUI();
}

function updateShortlistUI() {
    const list = document.getElementById('cartItems');
    list.innerHTML = "";
    shortlist.forEach((p, i) => {
        list.innerHTML += `
            <li>${p.name}, ${p.age}, ${p.education}
                <button onclick="removeShortlist(${i})">Remove</button>
            </li>`;
    });
}

function removeShortlist(i) {
    shortlist.splice(i, 1);
    updateShortlistUI();
}

// WhatsApp Integration
function sendToWhatsApp() {
    if (shortlist.length === 0) {
        alert("No profiles shortlisted!");
        return;
    }
    const phoneNumber = "919573572830";
    let message = "💍 *Shortlisted Profiles*\n";
    shortlist.forEach((p, i) => {
        message += `${i+1}. ${p.name}, ${p.age}, ${p.education}, ${p.caste}, ${p.raasi}\n`;
    });
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
