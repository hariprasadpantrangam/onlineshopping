const profiles = [
  {
    name: "Anjali",
    age: 25,
    profession: "Software Engineer",
    city: "Hyderabad",
    mobile:"9573572830",
    education:"bsc",
    caste:"sc-mala",
    religion:"hindu",
    img: "../onlineshopping/public/bigili.jpeg"
  },
  {
    name: "hariprasad",
    age: 28,
    profession: "software engineer",
    city: "Chennai",
    mobile:"9573572830",
    education:"msc",
    caste:"sc-mala",
    religion:"hindu",
    img: "../onlineshopping/public/hari.jpg"
  },
    {
    name: "haritha",
    age: 28,
    profession: "software engineer",
    city: "Chennai",
    mobile:"9573572830",
    education:"msc",
    caste:"sc-mala",
    religion:"hindu",
    img: "../onlineshopping/public/anushka.jpg"
  },
    {
    name: "prasad",
    age: 28,
    profession: "engineer",
    city: "bangalore",
    mobile:"9989706991",
    education:"bsc",
    caste:"sc-mala",
    religion:"hindu",
    img: "../onlineshopping/public/hari.jpg"
  },
    {
    name: "ramesh",
    age: 28,
    profession: "civil engineer",
    city: "Chennai",
    mobile:"9973572830",
    education:"msc",
    caste:"sc-madiga",
    religion:"hindu",
    img: "../onlineshopping/public/avengers.jpg"
  },
    {
    name: "saiteja pakala",
    age: 26,
    profession: "software engineer",
    city: "hyd",
    mobile:"6304316761",
    education:"b.tech",
    caste:"sc-mala",
    religion:"hindu",
    img: "../onlineshopping/public/saiteja.jpg"
  },
   {
    name: "chenchu lakshmi",
    age: 26,
    profession: "home maker",
    city: "hyd",
    mobile:"9553317460",
    education:"tenth",
    caste:"bc-devanga",
    religion:"hindu",
    img: "../onlineshopping/public/baahubali.jpeg"
  }
];

const container = document.getElementById("cardContainer");

// Display cards
function displayProfiles() {
  container.innerHTML = "";

  profiles.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}"  width="300" height="300" alt="">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>Age: ${p.age}</p>
        <p>${p.profession}</p>
        <p>${p.city}</p>
        <p>${p.mobile}</p>
        <p>${p.education}</p>
        <p>${p.caste}</p>
        <p>${p.religion}</p>
        <button class="btn" onclick="deleteProfile(${index})">Remove</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Add profile
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

  profiles.push({ name, age, profession, city,mobile,education,caste,religion, img });
  displayProfiles();
}

// Delete profile
function deleteProfile(index) {
  profiles.splice(index, 1);
  displayProfiles();
}

// Initial load
displayProfiles();