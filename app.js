const container = document.querySelector(".section-center");
const breakfastBtn = document.querySelector("#breakfast-btn");
const lunchBtn = document.querySelector("#lunch-btn");
const shakesBtn = document.querySelector("#shakec-btn");
const allBtn = document.querySelector("#all-btn");
const loaderEl = document.querySelector("#loader");

const loading = (loader) => {
  if (loader) {
    loaderEl.classList.remove("hidden");
  } else {
    loaderEl.classList.add("hidden");
  }
};

const API = "https://msshohruh.github.io/menu-api/data.json";

let mainData;

const fetchApi = async (url) => {
  loading(true);
  const request = await fetch(url);

  if (request.status != 200) {
    throw new Error("Something went wrong !");
  }

  const data = await request.json();
  loading(false);
  mainData = data.menu;
  return [...data.menu];
};

fetchApi(API)
  .then((data) => {
    createMenu(data);
  })
  .catch((err) => {
    alert(err.message);
    loading(true);
  });

function createMenu(recipes) {
  recipes.forEach((recipe) => {
    const { title, price, img, desc } = recipe;
    const div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = `
    <div class="foots">
        <img
            src="${img}"
            alt="${title}"
            class="photo"
        />
    </div>
    <div class="item-info">
        <header>
            <h4>${title}</h4>
            <h4 class="price">$${price}</h4>
        </header>
        <p class="item-text">
            ${desc}
        </p>
    </div>
        `;
    container.appendChild(div);
  });
}

breakfastBtn.addEventListener("click", () => {
  filterData("breakfast");
});
lunchBtn.addEventListener("click", () => {
  filterData("lunch");
});
shakesBtn.addEventListener("click", () => {
  filterData("shakes");
});
allBtn.addEventListener("click", () => {
  filterData("all");
});

function filterData(param) {
  container.innerHTML = "";
  if (param === "all") {
    createMenu(mainData);
  } else {
    const newData = mainData.filter((item) => {
      return item.category == param;
    });
    createMenu(newData);
  }
}
