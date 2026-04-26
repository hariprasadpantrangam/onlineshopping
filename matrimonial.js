const defaultProfiles = [
  { name:"Ramesh", age:28, mobile:"9876543210", religion:"Hindu", gender:"Male", raasi:"Mesha", caste:"OC", education:"B.Tech", occupation:"Engineer", city:"Hyderabad", photo:"" },
  { name:"Sita", age:25, mobile:"9123456780", religion:"Hindu", gender:"Female", raasi:"Kanya", caste:"BC", education:"MBA", occupation:"Manager", city:"Chennai", photo:"" }
];
let profiles = JSON.parse(localStorage.getItem('profiles')) || defaultProfiles;
let shortlist = [];

function showSection(id){ document.querySelectorAll('.section').forEach(s=>s.classList.remove('active')); document.getElementById(id).classList.add('active'); }
function login(){ const u=document.getElementById('loginUser').value, p=document.getElementById('loginPass').value; if(u.startsWith("ad")&&p.startsWith("77")){showSection('adminPanel');displayAdminProfiles();} else {showSection('userPanel');displayUserProfiles();} }

function displayAdminProfiles(){
  const tbody=document.getElementById('adminBody'); tbody.innerHTML="";
  profiles.forEach((p,i)=>{ tbody.innerHTML+=`
    <tr>
      <td>${p.name}</td><td>${p.age}</td><td>${p.mobile}</td><td>${p.religion}</td><td>${p.gender}</td>
      <td>${p.raasi}</td><td>${p.caste}</td><td>${p.education}</td><td>${p.occupation}</td><td>${p.city}</td>
      <td>${p.photo?`<img src="${p.photo}" style="width:50px;height:50px;border-radius:5px;">`:"No Photo"}</td>
      <td><button onclick="editProfile(${i})">Edit</button><button onclick="deleteProfile(${i})">Delete</button></td>
    </tr>`; });
}

function addProfile(){
  const name=document.getElementById('pName').value, age=document.getElementById('pAge').value, mobile=document.getElementById('pMobile').value,
        religion=document.getElementById('pReligion').value, gender=document.getElementById('pGender').value, raasi=document.getElementById('pRaasi').value,
        caste=document.getElementById('pCaste').value, education=document.getElementById('pEducation').value, occupation=document.getElementById('pOccupation').value,
        city=document.getElementById('pCity').value, photoInput=document.getElementById('pPhoto');
  if(name&&age&&gender){
    if(photoInput.files[0]){
      const reader=new FileReader();
      reader.onload=e=>{ profiles.push({name,age,mobile,religion,gender,raasi,caste,education,occupation,city,photo:e.target.result}); saveProfiles(); clearForm(); };
      reader.readAsDataURL(photoInput.files[0]);
    } else { profiles.push({name,age,mobile,religion,gender,raasi,caste,education,occupation,city,photo:""}); saveProfiles(); clearForm(); }
  } else alert("Fill mandatory fields");
}

// --- Edit Profile ---
function editProfile(index) {
  const p = profiles[index];
  document.getElementById('pName').value = p.name;
  document.getElementById('pAge').value = p.age;
  document.getElementById('pMobile').value = p.mobile;
  document.getElementById('pReligion').value = p.religion;
  document.getElementById('pGender').value = p.gender;
  document.getElementById('pRaasi').value = p.raasi;
  document.getElementById('pCaste').value = p.caste;
  document.getElementById('pEducation').value = p.education;
  document.getElementById('pOccupation').value = p.occupation;
  document.getElementById('pCity').value = p.city;

  // store index for update
  document.getElementById('editIndex').value = index;

  // show Update button, hide Add button
  document.getElementById('addBtn').style.display = "none";
  document.getElementById('updateBtn').style.display = "inline";

  // show existing photo preview if available
  if (p.photo) {
    const preview = document.getElementById('photoPreview');
    preview.src = p.photo;
    preview.style.display = "block";
  }
}

// --- Save Edited Profile ---
function saveEdit() {
  const index = document.getElementById('editIndex').value;
  const photoInput = document.getElementById('pPhoto');

  if (photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profiles[index] = {
        name: document.getElementById('pName').value,
        age: document.getElementById('pAge').value,
        mobile: document.getElementById('pMobile').value,
        religion: document.getElementById('pReligion').value,
        gender: document.getElementById('pGender').value,
        raasi: document.getElementById('pRaasi').value,
        caste: document.getElementById('pCaste').value,
        education: document.getElementById('pEducation').value,
        occupation: document.getElementById('pOccupation').value,
        city: document.getElementById('pCity').value,
        photo: e.target.result
      };
      saveProfiles();
      clearForm();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    profiles[index] = {
      name: document.getElementById('pName').value,
      age: document.getElementById('pAge').value,
      mobile: document.getElementById('pMobile').value,
      religion: document.getElementById('pReligion').value,
      gender: document.getElementById('pGender').value,
      raasi: document.getElementById('pRaasi').value,
      caste: document.getElementById('pCaste').value,
      education: document.getElementById('pEducation').value,
      occupation: document.getElementById('pOccupation').value,
      city: document.getElementById('pCity').value,
      photo: profiles[index].photo // keep old photo if not changed
    };
    saveProfiles();
    clearForm();
  }
}

// --- Delete Profile ---
function deleteProfile(index) {
  if (confirm("Are you sure you want to delete this profile?")) {
    profiles.splice(index, 1); // remove profile
    saveProfiles();            // update localStorage
  }
}

// --- Save Profiles ---
function saveProfiles() {
  localStorage.setItem('profiles', JSON.stringify(profiles));
  displayAdminProfiles();
  displayUserProfiles();
}

// --- Clear Form ---
function clearForm() {
  document.getElementById('pName').value = "";
  document.getElementById('pAge').value = "";
  document.getElementById('pMobile').value = "";
  document.getElementById('pReligion').value = "";
  document.getElementById('pGender').value = "";
  document.getElementById('pRaasi').value = "";
  document.getElementById('pCaste').value = "";
  document.getElementById('pEducation').value = "";
  document.getElementById('pOccupation').value = "";
  document.getElementById('pCity').value = "";
  document.getElementById('pPhoto').value = "";
  document.getElementById('editIndex').value = "";

  const preview = document.getElementById('photoPreview');
  preview.src = "";
  preview.style.display = "none";

  // reset buttons
  document.getElementById('addBtn').style.display = "inline";
  document.getElementById('updateBtn').style.display = "none";
}


