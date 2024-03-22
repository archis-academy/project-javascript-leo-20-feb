//sebile/PR-13 Founders start
const employeeInformations = [
  {
    image: "images/Tom-Cruise.png",
    name: "Tom Cruise",
    position: "Founder & Chairman",
    instagram: "https://www.instagram.com/tomcruise?igsh=b2NjOXBnOHVwZjl2",
    twitter: "https://x.com/tomcruise?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Emma-Watson.png",
    name: "Emma Watson",
    position: "Managing Director",
    instagram: "https://www.instagram.com/emmawatson?igsh=bzJncWEyeHo0cHdw",
    twitter: "https://x.com/emmawatson?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Will-Smith.png",
    name: "Will Smith",
    position: "Product Designer",
    instagram: "https://www.instagram.com/willsmith?igsh=MXM3OTNlb3RzaG9haw==",
    twitter: "https://x.com/teamwilldaily?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Will-Smith.png",
    name: "Max Verstappen",
    position: "Data Analyst",
    instagram:
      "https://www.instagram.com/maxverstappen1?igsh=MXYwcnp2a3EzYjg1eA==",
    twitter: "https://x.com/max33verstappen?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Tom-Cruise.png",
    name: "Charles Leclerc",
    position: "Digital Marketing Specialist",
    instagram:
      "https://www.instagram.com/charles_leclerc?igsh=MWNnNWhzOHh0MmR3eQ==",
    twitter: "https://x.com/charles_leclerc?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
  {
    image: "images/Emma-Watson.png",
    name: "Anya Taylor-Joy",
    position: "Logistics Coordinator",
    instagram: "https://www.instagram.com/anyataylorjoy?igsh=bGx5YTlnMDYxOTA2",
    twitter: "https://x.com/anyajoynews?s=21&t=xJ9BZGywG-kvR4l7Us4d4w",
  },
];

const employeeCards = document.querySelector(".employee-cards");

let currIndex = 0;

function renderCards() {
  employeeCards.innerHTML = "";
  for (let i = currIndex; i < currIndex + 3; i++) {
    let employee = employeeInformations[i];

    let cardBox = document.createElement("div");
    cardBox.classList.add("card-box");

    cardBox.innerHTML = `<img src=${employee.image} alt=${employee.name}/>
        <h3>${employee.name}</h3><p>${employee.position}</p><div><a href=${employee.twitter} target="_blank"><img src="images/Vector-twitter.svg"/></a><a href=${employee.instagram} target="_blank"><img src="images/Vector-instagram.svg"/></a></div>`;
    employeeCards.appendChild(cardBox);
  }
}
renderCards();
const carouselDots = document.querySelectorAll(".dot");
function handleDotClick(index) {
  carouselDots.forEach((dot, i) => {
    dot.classList.toggle("active-dot", i === index);
  });
  if (currIndex === 0) {
    currIndex += 3;
  } else {
    currIndex -= 3;
  }
  renderCards();
}

carouselDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    handleDotClick(index);
  });
});

setInterval(() => {
  let activeDotIndex = 0;
  carouselDots.forEach((dot, index) => {
    if (dot.classList.contains("active-dot")) {
      activeDotIndex = index;
    }
  });
  activeDotIndex = (activeDotIndex + 1) % carouselDots.length;
  handleDotClick(activeDotIndex);
}, 3000);
//sebile/PR-13 Founders end
