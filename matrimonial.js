const profiles = [
  {
    name: "hariprasad",
    age: 25,
    profession: "Software Engineer",
    city: "Hyderabad",
    mobile:"9573572830",
    education:"msc",
    caste:"sc-mala",
    religion:"hindu",
    img: "../onlineshopping/public/hari.jpg"
  },
  {
    name: "bigili",
    age: 28,
    profession: "Doctor",
    city: "Chennai",
     mobile:"7386618287",
      education:"msc",
    caste:"sc-mala",
    religion:"hindu",
    img: "../onlineshopping/public/bigili.jpeg"
  },

    {
    name: "ramesh",
    age: 28,
    profession: "Doctor",
    city: "Chennai",
     mobile:"7386618287",
      education:"ba",
    caste:"bs-devanga",
    religion:"hindu",
    img: "../onlineshopping/public/avengers.jpg"
  },
    {
    name: "bigili",
    age: 28,
    profession: "actress",
    city: "bangalore",
     mobile:"7386618287",
      education:"msc",
    caste:"bc-b",
    religion:"hindu",
    img: "../onlineshopping/public/anushka.jpg"
  },
    {
    name: "chiranjeevi konidela",
    age: 50,
    profession: "Actor",
    city: "hyd",
     mobile:"7386618287",
      education:"ba",
    caste:"oc-naidu",
    religion:"hindu",
    img: "../onlineshopping/public/chiru.jpg"
  }
];

const container = document.getElementById("cardContainer");

// Display cards
function displayProfiles() {
  container.innerHTML = "";

  profiles.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}" alt="">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>Age: ${p.age}</p>
        <p>${p.profession}</p>
        <p>${p.city}</p>
        <p>${p.mobile}</p>
          <p>${p.education}</p>
            <p>${p.caste}</p>
              <p>${p.religion}</p>
        // <button class="btn" onclick="deleteProfile(${index})">Remove</button>
      </div>
    `;

    container.appendChild(card);
  });
}

//Add profile
function addProfile() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const profession = document.getElementById("profession").value;
  const city = document.getElementById("city").value;
   const mobile = document.getElementById("mobile").value;
    const education = document.getElementById("education").value;
     const caste = document.getElementById("caste").value;
      const religion = document.getElementById("religion").value;
  const img = document.getElementById("img").value;

  if (!name || !age) {
    alert("Please enter required fields");
    return;
  }

  profiles.push({ name, age, profession, city, mobile,education,caste,religion, img });
  displayProfiles();
}

//Delete profile
function deleteProfile(index) {
  profiles.splice(index, 1);
  displayProfiles();
}

// Initial load
displayProfiles();