'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// =========================================================
// PORTFOLIO: DYNAMIC RENDER & CATEGORY FILTERING
// =========================================================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Render Portfolio projects from liveProjects array (defined in projects-data.js)
const renderPortfolioProjects = function () {
  const portfolioList = document.querySelector(".project-list");
  if (!portfolioList || typeof liveProjects === "undefined" || !Array.isArray(liveProjects)) return;

  portfolioList.innerHTML = "";

  liveProjects.forEach(project => {
    const rawType = (project.type || "fullstack").toLowerCase().replace(/\s+|-/g, "");
    const isWp = rawType.includes("word") || rawType.includes("wp");
    const categoryKey = isWp ? "wordpress" : "fullstack";
    const categoryDisplay = isWp ? "WordPress" : "Full Stack";
    const href = project.liveLink || "#";

    const li = document.createElement("li");
    li.className = "project-item active";
    li.setAttribute("data-filter-item", "");
    li.setAttribute("data-category", categoryKey);

    li.innerHTML = `
      <a href="${href}" target="_blank" rel="noopener noreferrer">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="open-outline"></ion-icon>
          </div>
          <img src="${project.image}" alt="${project.name}" loading="lazy">
        </figure>

        <h3 class="project-title">${project.name}</h3>

        <p class="project-category">${categoryDisplay}</p>
      </a>
    `;

    portfolioList.appendChild(li);
  });
};

// Filter items based on selected tab/category
const filterFunc = function (selectedValue) {
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const cleanSelected = selectedValue.toLowerCase().replace(/\s+|-/g, "");

  for (let i = 0; i < filterItems.length; i++) {
    const itemCat = (filterItems[i].dataset.category || "").toLowerCase().replace(/\s+|-/g, "");

    if (cleanSelected === "all") {
      filterItems[i].classList.add("active");
    } else if (cleanSelected === itemCat) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// Initialize portfolio projects
renderPortfolioProjects();

// Custom select dropdown toggle
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Add event in all select items for mobile
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText;
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Add event in all filter button items for desktop
let lastClickedBtn = filterBtn.length > 0 ? filterBtn[0] : null;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText;
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// submit contact form directly to WhatsApp
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullnameInput = form.querySelector('[name="fullname"]');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');

    const fullname = fullnameInput ? fullnameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    const whatsappNumber = "917983889813";

    const text = `Hello Chandrakant,\n\nI contacted you through your portfolio website:\n\n*Name:* ${fullname}\n*Email:* ${email}\n*Message:* ${message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");

    form.reset();
    if (formBtn) formBtn.setAttribute("disabled", "");
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// =========================================================
// LIVE PROJECTS: DYNAMIC RENDER & TAB FILTERING
// =========================================================
const clientsList = document.querySelector("[data-clients-list]");
const clientsNavBtnLeft = document.querySelector(".clients-nav-btn-left");
const clientsNavBtnRight = document.querySelector(".clients-nav-btn-right");
const liveTabBtns = document.querySelectorAll("[data-live-tab]");
const fullstackCountElem = document.querySelector("[data-live-count='fullstack']");
const wordpressCountElem = document.querySelector("[data-live-count='wordpress']");

// Render cards dynamically from liveProjects array (defined in projects-data.js)
const renderLiveProjects = function () {
  if (!clientsList || typeof liveProjects === "undefined" || !Array.isArray(liveProjects)) return;

  clientsList.innerHTML = "";

  liveProjects.forEach(project => {
    const rawType = (project.type || "fullstack").toLowerCase().replace(/\s+|-/g, "");
    const normalizedType = rawType.includes("word") || rawType.includes("wp") ? "wordpress" : "fullstack";
    const href = project.liveLink || "#";

    const li = document.createElement("li");
    li.className = "clients-item";
    li.dataset.projectType = normalizedType;

    li.innerHTML = `
      <a href="${href}" target="_blank" rel="noopener noreferrer" class="client-card">
        <div class="client-card-inner">
          <div class="client-logo-box">
            <img src="${project.image}" alt="${project.name} Logo" loading="lazy">
          </div>
          <div class="client-card-info">
            <h4 class="client-project-title">${project.name}</h4>
            <span class="client-live-btn">
              <span>View</span>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </span>
          </div>
        </div>
      </a>
    `;

    clientsList.appendChild(li);
  });
};

// Helper: Update counts on the tab badges
const updateLiveProjectCounters = function () {
  if (typeof liveProjects === "undefined" || !Array.isArray(liveProjects)) return;

  let fsCount = 0;
  let wpCount = 0;

  liveProjects.forEach(project => {
    const rawType = (project.type || "fullstack").toLowerCase().replace(/\s+|-/g, "");
    if (rawType.includes("word") || rawType.includes("wp")) {
      wpCount++;
    } else {
      fsCount++;
    }
  });

  if (fullstackCountElem) fullstackCountElem.textContent = fsCount;
  if (wordpressCountElem) wordpressCountElem.textContent = wpCount;
};

// Helper: Filter live projects based on selected tab ('fullstack' or 'wordpress')
const filterLiveProjects = function (targetTab) {
  const items = document.querySelectorAll(".clients-item");

  items.forEach(item => {
    const itemType = (item.dataset.projectType || "fullstack").toLowerCase();

    if (itemType === targetTab) {
      item.classList.remove("hidden");
      item.classList.add("active");
    } else {
      item.classList.add("hidden");
      item.classList.remove("active");
    }
  });

  if (clientsList) {
    clientsList.scrollTo({
      left: 0,
      behavior: "smooth"
    });
  }
};

// Initialize projects
if (clientsList) {
  renderLiveProjects();
  updateLiveProjectCounters();
  filterLiveProjects("fullstack");
}

// Add click listeners to tab buttons
if (liveTabBtns.length > 0) {
  liveTabBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedTab = this.dataset.liveTab;

      liveTabBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      this.classList.add("active");
      this.setAttribute("aria-selected", "true");

      filterLiveProjects(selectedTab);
    });
  });
}

// Carousel scroll navigation
if (clientsList && clientsNavBtnLeft && clientsNavBtnRight) {
  const scrollAmount = 310;

  clientsNavBtnLeft.addEventListener("click", function () {
    clientsList.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
  });

  clientsNavBtnRight.addEventListener("click", function () {
    clientsList.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  });
}