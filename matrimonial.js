const defaultProfiles = [
  { name: "Anjali", age: 25, profession: "Software Engineer", city: "Hyderabad", mobile:"9573572830", education:"BSc", caste:"SC-Mala", religion:"Hindu", image:"../onlineshopping/public/bigili.jpeg" },
  { name: "Hariprasad", age: 28, profession: "Software Engineer", city: "Chennai", mobile:"9573572830", education:"MSc", caste:"SC-Mala", religion:"Hindu", image:"../onlineshopping/public/hari.jpg" }
];

let profiles = JSON.parse(localStorage.getItem('profiles')) || defaultProfiles;

// Section switching
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Login
function login() {
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;

  if (user === "admin" && pass === "admin7799") {
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
        <td>${p.profession}</td>
        <td>${p.city}</td>
        <td>${p.mobile}</td>
        <td>${p.education}</td>
        <td>${p.caste}</td>
        <td>${p.religion}</td>
        <td><img src="${p.image}" style="width:50px;height:50px;object-fit:cover;"></td>
        <td>
          <button onclick="editProfile(${index})">Edit</button>
          <button onclick="deleteProfile(${index})">Delete</button>
        </td>
      </tr>`;
  });
}

// User Panel
function displayUserProfiles() {
  const container = document.getElementById('userCardContainer');
  container.innerHTML = "";
  profiles.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" style="width:100%;height:150px;object-fit:cover;">
        <h3>${p.name}</h3>
        <p>Age: ${p.age}</p>
        <p>${p.profession}</p>
        <p>${p.city}</p>
        <p>${p.mobile}</p>
        <p>${p.education}</p>
        <p>${p.caste}</p>
        <p>${p.religion}</p>
      </div>`;
  });
}

// CRUD
function addProfile() {
  const profile = {
    name: document.getElementById('pName').value,
    age: document.getElementById('pAge').value,
    profession: document.getElementById('pProfession').value,
    city: document.getElementById('pCity').value,
    mobile: document.getElementById('pMobile').value,
    education: document.getElementById('pEducation').value,
    caste: document.getElementById('pCaste').value,
    religion: document.getElementById('pReligion').value,
    image: document.getElementById('pImage').value
  };
  profiles.push(profile);
  saveAndRefresh();
}

function deleteProfile(index) {
  profiles.splice(index, 1);
  saveAndRefresh();
}

function editProfile(index) {
  const p = profiles[index];

  // Fill form fields with existing profile data
  document.getElementById('pName').value = p.name;
  document.getElementById('pAge').value = p.age;
  document.getElementById('pProfession').value = p.profession;
  document.getElementById('pCity').value = p.city;
  document.getElementById('pMobile').value = p.mobile;
  document.getElementById('pEducation').value = p.education;
  document.getElementById('pCaste').value = p.caste;
  document.getElementById('pReligion').value = p.religion;
  document.getElementById('pImage').value = p.image;

  // Store index for later update
  document.getElementById('editIndex').value = index;

  // Switch buttons: hide Add, show Update
  document.getElementById('addBtn').style.display = "none";
  document.getElementById('updateBtn').style.display = "inline";
}
