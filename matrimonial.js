let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function login(){
  const u=document.getElementById('loginUser').value;
  const p=document.getElementById('loginPass').value;
  if(u.startsWith("ad") && p.startsWith("77")){
    showSection('adminPanel');
    displayAdminProfiles();
  } else {
    showSection('userPanel');
    displayUserProfiles();
  }
}

function addProfile(){
  const name=document.getElementById('pName').value;
  const dob=document.getElementById('pDob').value;
  const gender=document.getElementById('pGender').value;
  const caste=document.getElementById('pCaste').value;
  const religion=document.getElementById('pReligion').value;
  const star=document.getElementById('pStar').value;
  const education=document.getElementById('pEducation').value;
  const occupation=document.getElementById('pOccupation').value;
  const mobile=document.getElementById('pMobile').value;
  const photoInput=document.getElementById('pPhoto');

  if(name && dob && gender && mobile){
    if(photoInput.files[0]){
      const reader=new FileReader();
      reader.onload=e=>{
        profiles.push({name,dob,gender,caste,religion,star,education,occupation,mobile,photo:e.target.result});
        saveProfiles(); clearForm();
      };
      reader.readAsDataURL(photoInput.files[0]);
    } else {
      profiles.push({name,dob,gender,caste,religion,star,education,occupation,mobile,photo:""});
      saveProfiles(); clearForm();
    }
  } else alert("Fill mandatory fields");
}

function displayAdminProfiles(){
  const tbody=document.getElementById('adminBody');
  tbody.innerHTML="";
  profiles.forEach((p,i)=>{
    tbody.innerHTML+=`
      <tr>
        <td>${p.name}</td><td>${p.dob}</td><td>${p.gender}</td><td>${p.caste}</td><td>${p.religion}</td>
        <td>${p.star}</td><td>${p.education}</td><td>${p.occupation}</td><td>${p.mobile}</td>
        <td>${p.photo?`<img src="${p.photo}" style="width:50px;height:50px;border-radius:5px;">`:"No Photo"}</td>
        <td><button onclick="editProfile(${i})">Edit</button><button onclick="deleteProfile(${i})">Delete</button></td>
      </tr>`;
  });
}

function displayUserProfiles() {
  const container = document.getElementById('userCardContainer');
  container.innerHTML = "";
  profiles.forEach((p, i) => {
    container.innerHTML += `
      <div class="card">
        ${p.photo ? `<img src="${p.photo}">` : "<img src='https://via.placeholder.com/150'>"}
        <h3>${p.name}</h3>
        <p><b>DOB:</b> ${p.dob}</p>
        <p><b>Gender:</b> ${p.gender}</p>
        <p><b>Caste:</b> ${p.caste}</p>
        <p><b>Religion:</b> ${p.religion}</p>
        <p><b>Star:</b> ${p.star}</p>
        <p><b>Education:</b> ${p.education}</p>
        <p><b>Occupation:</b> ${p.occupation}</p>
        <p><b>Mobile:</b> ${p.mobile}</p>
        <button class="delete-btn" onclick="deleteProfile(${i})">Delete</button>
      </div>`;
  });
}
function deleteProfile(index) {
  if (confirm("Delete this profile?")) {
    profiles.splice(index, 1);        // remove from array
    localStorage.setItem('profiles', JSON.stringify(profiles)); // persist change
    displayAdminProfiles();           // refresh admin table
    displayUserProfiles();            // refresh user cards
  }
}
  
  
    