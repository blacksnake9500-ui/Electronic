document.addEventListener("DOMContentLoaded", function () {
  const log_btn = document.querySelector(".log_btn");
  const sing = document.querySelector(".sing");
  const back = document.querySelector(".back");
  const form = document.querySelector(".sing form");
  const user_name = document.querySelector(".user_name");
  const user_kod = document.querySelector(".user_kod");
  const user_email = document.querySelector(".user_email");
  const user_avatar = document.querySelector(".user_avatar");
  const avatar_preview = document.querySelector(".avatar-preview");
  let avatarData = "";
  let userData = JSON.parse(localStorage.getItem("userData")) || {};

  if (back && sing) {
    back.addEventListener("click", () => {
      sing.classList.remove("show");
    });
  }

  if (user_avatar && avatar_preview) {
    user_avatar.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        avatarData = event.target.result;
        avatar_preview.src = avatarData;
        avatar_preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    });
  }

  const logout_btn = document.querySelector(".logout_btn");
  const userInfo = document.querySelector(".user-info");
  const currentAvatar = document.querySelector(".current-avatar");
  const currentName = document.querySelector(".current-name");
  const lastUser = JSON.parse(localStorage.getItem("lastUser")) || null;
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  function fillLastUser(user) {
    if (!user) return;
    if (user_name) user_name.value = user.name || "";
    if (user_kod) user_kod.value = user.kod || "";
    if (user_email) user_email.value = user.email || "";
    avatarData = user.avatar || "";
    if (avatar_preview && avatarData) {
      avatar_preview.src = avatarData;
      avatar_preview.style.display = "block";
    }
  }

  function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("lastUser", JSON.stringify(user));
    if (logout_btn) logout_btn.style.display = "inline-flex";
    if (userInfo) userInfo.classList.add("show");
    if (currentAvatar && user.avatar) {
      currentAvatar.src = user.avatar;
      currentAvatar.style.display = "block";
    }
    if (currentName) currentName.textContent = user.name;
    if (log_btn) log_btn.textContent = "Account";
  }

  function clearCurrentUser() {
    localStorage.removeItem("currentUser");
    if (logout_btn) logout_btn.style.display = "none";
    if (userInfo) userInfo.classList.remove("show");
    if (currentAvatar) currentAvatar.style.display = "none";
    if (currentName) currentName.textContent = "";
    if (log_btn)
      log_btn.innerHTML = `Sing up now <i class="fa-solid fa-arrow-right"></i>`;
  }

  if (currentUser) {
    setCurrentUser(currentUser);
  }

  if (logout_btn) {
    logout_btn.addEventListener("click", function () {
      clearCurrentUser();
      alert("You have logged out.");
    });
  }

  if (log_btn && sing) {
    log_btn.addEventListener("click", () => {
      sing.classList.add("show");
      fillLastUser(lastUser || currentUser);
    });
  }

  if (form && user_name && user_kod && user_email && sing && log_btn) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = user_name.value.trim();
      const kod = user_kod.value.trim();
      const email = user_email.value.trim();

      const savedUser = userData[name];
      if (savedUser && savedUser.kod === kod && savedUser.email === email) {
        if (avatarData) {
          savedUser.avatar = avatarData;
          userData[name] = savedUser;
          localStorage.setItem("userData", JSON.stringify(userData));
        }
        alert(`Welcome back, ${name}!`);
        setCurrentUser(savedUser);
      } else {
        const newUser = {
          name,
          kod,
          email,
          avatar: avatarData,
        };
        userData[name] = newUser;
        localStorage.setItem("userData", JSON.stringify(userData));
        setCurrentUser(newUser);
        alert("Account created successfully!");
      }

      sing.classList.remove("show");
      form.reset();
      avatarData = "";
      if (avatar_preview) avatar_preview.style.display = "none";
    });
  }

  const cartBtn = document.querySelector(".cart_btn");
  const cartModal = document.getElementById("cartModal");
  const cartBackdrop = document.querySelector(".cart-modal-backdrop");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartScrollUpBtn = document.querySelector(".cart-scroll-up");
  const cartScrollDownBtn = document.querySelector(".cart-scroll-down");
  const cartTotalPriceEl = document.querySelector(".cart-total-price");
  let cartItems = [];

  function formatPrice(value) {
    return `$${value.toFixed(2)}`;
  }

  function updateCartUI() {
    if (!cartItemsContainer || !cartTotalPriceEl) return;

    cartItemsContainer.innerHTML = "";
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    cartTotalPriceEl.textContent = formatPrice(total);

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart">Your cart is empty.</p>';
      return;
    }

    cartItems.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
  }

  function openCartModal() {
    if (!cartModal) return;
    cartModal.classList.add("show");
    updateCartUI();
  }

  function closeCartModal() {
    if (!cartModal) return;
    cartModal.classList.remove("show");
  }

  if (cartBtn) {
    cartBtn.addEventListener("click", openCartModal);
  }

  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      closeCartModal();
    }
  });

  if (cartScrollUpBtn) {
    cartScrollUpBtn.addEventListener("click", function () {
      if (cartItemsContainer) {
        cartItemsContainer.scrollBy({ top: -140, behavior: "smooth" });
      }
    });
  }

  if (cartScrollDownBtn) {
    cartScrollDownBtn.addEventListener("click", function () {
      if (cartItemsContainer) {
        cartItemsContainer.scrollBy({ top: 140, behavior: "smooth" });
        console.log("jcuedhfuhdc");
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      cartModal &&
      cartModal.classList.contains("show")
    ) {
      closeCartModal();
    }
  });

  const productButtons = document.querySelectorAll(".two_card button");
  productButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".two_card");
      if (!card) return;

      const titleEl = card.querySelector(".two_card-info h2");
      const priceSpan = titleEl ? titleEl.querySelector("span") : null;

      const name = titleEl
        ? titleEl.childNodes[0].textContent.trim()
        : "Product";

      const price = priceSpan
        ? parseFloat(priceSpan.textContent.replace(/[^0-9.]/g, ""))
        : 0;

      const descriptionEl = card.querySelector(".two_card-info p");
      const imageEl = card.querySelector("img");

      cartItems.push({
        name,
        price,
        description: descriptionEl ? descriptionEl.textContent.trim() : "",
        image: imageEl ? imageEl.src : "",
      });

      openCartModal();
    });
  });
});

/// VANTA.NET({
VANTA.NET({
  el: "body",
  mouseControls: true,
  touchControls: true,
  color: 0x6c3cff,
  backgroundColor: 0x080818,
  points: 10,
  maxDistance: 20,
});

document.addEventListener("DOMContentLoaded", function () {
  const moveBtns = document.querySelectorAll(".two_title .move-btns button");
  if (!moveBtns || moveBtns.length < 2) return;
  const prevBtn = moveBtns[0];
  const nextBtn = moveBtns[1];
  const slider = document.querySelector(".two_box");
  if (!slider) return;
  const card = slider.querySelector(".two_card");
  const gap = parseInt(getComputedStyle(slider).gap) || 30;
  const scrollAmount =
    (card ? card.offsetWidth : slider.clientWidth * 0.8) + gap;

  nextBtn.addEventListener("click", function () {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", function () {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
});
///

const cartItemsContainer = document.querySelector(".cart-items");

let isDown = false;
let startY;
let scrollTop;

cartItemsContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  cartItemsContainer.style.cursor = "grabbing";

  startY = e.pageY - cartItemsContainer.offsetTop;
  scrollTop = cartItemsContainer.scrollTop;
});

cartItemsContainer.addEventListener("mouseleave", () => {
  isDown = false;
  cartItemsContainer.style.cursor = "grab";
});

cartItemsContainer.addEventListener("mouseup", () => {
  isDown = false;
  cartItemsContainer.style.cursor = "grab";
});

cartItemsContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  e.preventDefault();

  const y = e.pageY - cartItemsContainer.offsetTop;
  const walk = (y - startY) * 2;

  cartItemsContainer.scrollTop = scrollTop - walk;
});
