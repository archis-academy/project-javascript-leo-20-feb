// Sebile/PR-3 Beginning of browse by category
const categoryContents = [
  {
    image: "images/Category-CellPhone.svg",
    title: "Phones",
  },
  {
    image: "images/Category-Computer.svg",
    title: "Computers",
  },
  {
    image: "images/Category-SmartWatch.svg",
    title: "SmartWatch",
  },
  {
    image: "images/Category-Camera.svg",
    title: "Camera",
  },
  {
    image: "images/Category-Headphone.svg",
    title: "Headphones",
  },
  {
    image: "images/Category-Gamepad.svg",
    title: "Gaming",
  },
  {
    image: "images/Category-CellPhone.svg",
    title: "Phones",
  },
  {
    image: "images/Category-Computer.svg",
    title: "Computers",
  },
];

const categoryBoxes = document.querySelector(".category-boxes");
const movetoLeftIcon = document.querySelector(".move-to-left-icon");
const movetoRightIcon = document.querySelector(".move-to-right-icon");
let currIndex = 0;

function renderCategories() {
  categoryBoxes.innerHTML = "";
  for (let i = currIndex; i < currIndex + 6; i++) {
    let category = categoryContents[i];

    let categoryBox = document.createElement("div");
    categoryBox.classList.add("category-box");

    categoryBox.innerHTML = `<img src=${category.image} alt=${category.title}/>
        <p>${category.title}`;
    categoryBoxes.appendChild(categoryBox);
  }
}
renderCategories();

function movetoLeftCategories() {
  if (currIndex > 0) {
    currIndex--;
    renderCategories();
  }
}
function movetoRightCategories() {
  if (currIndex < categoryContents.length - 6) {
    currIndex++;
    renderCategories();
  }
}

movetoLeftIcon.addEventListener("click", () => {
  movetoLeftCategories();
});
movetoRightIcon.addEventListener("click", () => {
  movetoRightCategories();
});
//Sebile/PR-3 Beginning of browse by category
