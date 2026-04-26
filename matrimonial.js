const defaultProfiles = [
    { name: "Ramesh", age: 28, gender: "Male", raasi: "Mesha", caste: "OC", religion: "Hindu", education: "B.Tech", mobile: "9876543210", photo: "" },
    { name: "Sita", age: 25, gender: "Female", raasi: "Kanya", caste: "BC", religion: "Hindu", education: "MBA", mobile: "9123456780", photo: "" }
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
                <td>${p.religion}</td>
                <td>${p.education}</td>
                <td>${p.mobile}</td>
                <td>${p.photo ? `<img src="${p.photo}" style="width:50px;height:50px;border-radius:5px;">` : "No Photo"}</td>
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
    const religion = document.getElementById('pReligion').value;
    const education = document.getElementById('pEducation').value;
    const mobile = document.getElementById('pMobile').value;
    const photoInput = document.getElementById('pPhoto');

    if (name && age && gender) {
        if (photoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profiles.push({ name, age, gender, raasi, caste, religion, education, mobile, photo: event.target.result });
                saveProfiles();
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            profiles.push({ name, age, gender, raasi, caste, religion, education, mobile, photo: "" });
            saveProfiles();
        }
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
    document.getElementById('pReligion').value = p.religion;
    document.getElementById('pEducation').value = p.education;
    document.getElementById('pMobile').value = p.mobile;
    document.getElementById('editIndex').value = index;
}

function saveEdit() {
    const index = document.getElementById('editIndex').value;
    const photoInput = document.getElementById('pPhoto');

    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            profiles[index] = {
                name: document.getElementById('pName').value,
                age: document.getElementById('pAge').value,
                gender: document.getElementById('pGender').value,
                raasi: document.getElementById('pRaasi').value,
                caste: document.getElementById('pCaste').value,
                religion: document.getElementById('pReligion').value,
                education: document.getElementById('pEducation').value,
                mobile: document.getElementById('pMobile').value,
                photo: event.target.result
            };
            saveProfiles();
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        profiles[index] = {
            name: document.getElementById('pName').value,
            age: document.getElementById('pAge').value,
            gender: document.getElementById('pGender').value,
            raasi: document.getElementById('pRaasi').value,
            caste: document.getElementById('pCaste').value,
            religion: document.getElementById('pReligion').value,
            education: document.getElementById('pEducation').value,
            mobile: document.getElementById('pMobile').value,
            photo: profiles[index].photo // keep old photo if not changed
        };
        saveProfiles();
    }
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
                ${p.photo ? `<img src="${p.photo}" style="width:100%;height:150px;object-fit:cover;border-radius:8px;">` : ""}
                <h3>${p.name}, ${p.age}</h3>
                <p>${p.education} | ${p.caste} | ${p.religion} | ${p.raasi}</p>
                <p>📱 ${p.mobile}</p>
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
            <li>${p.name}, ${p.age}, ${p.education}, ${p.mobile}
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
        message += `${i+1}. ${p.name}, ${p.age}, ${p.education}, ${p.caste}, ${p.religion}, ${p.raasi}, 📱 ${p.mobile}\n`;
    });
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
