let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
let currentRole = null;

// Role selection
function setRole(role) {
  currentRole = role;
  alert("Logged in as " + role);
  renderProfiles();
}

// Display profiles
function renderProfiles() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  profiles.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img || 'https://via.placeholder.com/200'}" alt="Profile Image">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>Age: ${p.age}</p>
        <p>${p.profession}</p>
        <p>${p.city}</p>
        <p>${p.mobile}</p>
        <p>${p.education}</p>
        <p>${p.caste}</p>
        <p>${p.religion}</p>
        ${currentRole === "Admin" ? `
          <button class="btn" onclick="editProfile(${index})">Edit</button>
          <button class="btn" onclick="deleteProfile(${index})">Delete</button>
        ` : ""}
      </div>
    `;
    container.appendChild(card);
  });
}

// Add profile
function addProfile() {
  if (currentRole !== "Admin") {
    alert("Only Admin can add profiles!");
    return;
  }

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const profession = document.getElementById("profession").value;
  const city = document.getElementById("city").value;
  const mobile = document.getElementById("mobile").value;
  const education = document.getElementById("education").value;
  const caste = document.getElementById("caste").value;
  const religion = document.getElementById("religion").value;
  const imgInput = document.getElementById("img");

  if (!name || !age) {
    alert("Please enter required fields");
    return;
  }

  if (imgInput.files && imgInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      saveProfile(name, age, profession, city, mobile, education, caste, religion, e.target.result);
    };
    reader.readAsDataURL(imgInput.files[0]);
  } else {
    saveProfile(name, age, profession, city, mobile, education, caste, religion, "");
  }
}

function saveProfile(name, age, profession, city, mobile, education, caste, religion, img) {
  profiles.push({ name, age, profession, city, mobile, education, caste, religion, img });
  localStorage.setItem("profiles", JSON.stringify(profiles));
  renderProfiles();
  clearForm();
}

// Edit profile
function editProfile(index) {
  if (currentRole !== "Admin") {
    alert("Only Admin can edit profiles!");
    return;
  }

  const p = profiles[index];
  document.getElementById("name").value = p.name;
  document.getElementById("age").value = p.age;
  document.getElementById("profession").value = p.profession;
  document.getElementById("city").value = p.city;
  document.getElementById("mobile").value = p.mobile;
  document.getElementById("education").value = p.education;
  document.getElementById("caste").value = p.caste;
  document.getElementById("religion").value = p.religion;

  deleteProfile(index); // remove old entry before saving updated one
}

// Delete profile
function deleteProfile(index) {
  if (currentRole !== "Admin") {
    alert("Only Admin can delete profiles!");
    return;
  }

  profiles.splice(index, 1);
  localStorage.setItem("profiles", JSON.stringify(profiles));
  renderProfiles();
}

// Clear form
function clearForm() {
  document.querySelectorAll(".form input").forEach(input => input.value = "");
}

// Initial load
renderProfiles();
