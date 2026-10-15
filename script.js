/* ============================================================
   SUMANTH ESSENTIALS — Interactivity Engine v2
   Fully functional: Search, Cart, Account, Scroll, Filters
   ============================================================ */

(function () {
  "use strict";

  // ── Product Data (for search + cart) ──
  const PRODUCTS = [
    { name: "Basic Long Sleeve T-Shirt", price: 1750, originalPrice: 3999, category: "man", image: "assets/hmgoepprod9.jpg" },
    { name: "Ribbed T-Shirt with Buttons", price: 2000, originalPrice: 2500, category: "women", image: "assets/hmgoepprod12.jpg" },
    { name: "Jacket with Side Strips", price: 3000, originalPrice: 4000, category: "man", image: "assets/hmgoepprod13.jpg" },
    { name: "High-Heel Tubular Sandals", price: 1500, originalPrice: 2000, category: "shoes", image: "assets/musthave-4.png" },
    { name: "Coral Fabric Belt Bag", price: 1000, originalPrice: 1500, category: "bag", image: "assets/hmgoepprod 17.jpeg" },
    { name: "Basic White Shirt", price: 750, originalPrice: 1000, category: "man", image: "assets/hmgoepprod 8.jpeg" },
    { name: "White Shoes", price: 1500, originalPrice: 2500, category: "shoes", image: "assets/instagram-5.jpg" },
    { name: "Sweater Vest with Sleeves", price: 800, originalPrice: 1000, category: "man", image: "assets/image55.jpg" },
    { name: "Slim Fit Pants", price: 1100, originalPrice: 1999, category: "man", image: "assets/hmgoepprod 11.jpeg" },
    { name: "Gray Backpack", price: 1500, originalPrice: 2000, category: "bag", image: "assets/musthave-10.png" },
    { name: "Women Sweatshirt", price: 499, originalPrice: 899, category: "women", image: "assets/hmgoepprod 16.jpeg" },
    { name: "Hooded Nautical Jacket", price: 499, originalPrice: 899, category: "man", image: "assets/hmgoepprod 10.jpeg" },
  ];

  // ── Cart State ──
  let cart = [];

  // ── Scroll Reveal ──
  function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // ── Navbar Scroll (always visible, slides up with announcement bar) ──
  function initNavScroll() {
    const nav = document.getElementById("mainNav");
    const accountDropdown = document.getElementById("accountDropdown");
    if (!nav) return;

    let ticking = false;

    function handleScroll() {
      const scrollY = window.scrollY;

      if (scrollY > 40) {
        nav.classList.add("scrolled");
        if (accountDropdown) accountDropdown.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("scrolled");
        if (accountDropdown) accountDropdown.classList.remove("nav-scrolled");
      }
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Run immediately
    handleScroll();
  }

  // ── Mobile Drawer ──
  function initMobileDrawer() {
    const toggle = document.getElementById("navToggle");
    const drawer = document.getElementById("mobileDrawer");
    const overlay = document.getElementById("mobileOverlay");
    const closeBtn = document.getElementById("drawerClose");

    if (!toggle || !drawer || !overlay) return;

    function openDrawer() {
      drawer.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", openDrawer);
    overlay.addEventListener("click", closeDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });
  }

  // ── Search Overlay ──
  function initSearch() {
    const searchBtn = document.getElementById("navSearch");
    const overlay = document.getElementById("searchOverlay");
    const input = document.getElementById("searchInput");
    const closeBtn = document.getElementById("searchClose");
    const resultsContainer = document.getElementById("searchResults");
    const suggestionsContainer = document.getElementById("searchSuggestions");
    const tags = document.querySelectorAll(".search-tag");

    if (!searchBtn || !overlay || !input) return;

    function openSearch() {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
      setTimeout(() => input.focus(), 100);
    }

    function closeSearch() {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
      input.value = "";
      resultsContainer.innerHTML = "";
      suggestionsContainer.style.display = "";
    }

    function performSearch(query) {
      query = query.toLowerCase().trim();

      if (!query) {
        resultsContainer.innerHTML = "";
        suggestionsContainer.style.display = "";
        return;
      }

      suggestionsContainer.style.display = "none";

      const results = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );

      if (results.length === 0) {
        resultsContainer.innerHTML = `
          <div class="search-overlay__no-results">
            <p>No results found for "${query}"</p>
          </div>`;
        return;
      }

      resultsContainer.innerHTML = results
        .map(
          (p) => `
          <div class="search-result-item" data-product="${p.name}" data-price="${p.price}">
            <img src="${p.image}" alt="${p.name}" />
            <div class="search-result-item__info">
              <h4>${p.name}</h4>
              <p>₹${p.price.toLocaleString("en-IN")} <span style="text-decoration:line-through;color:#86868b;margin-left:4px;">₹${p.originalPrice.toLocaleString("en-IN")}</span></p>
            </div>
          </div>`
        )
        .join("");

      // Make search results clickable (add to cart)
      resultsContainer.querySelectorAll(".search-result-item").forEach((item) => {
        item.addEventListener("click", () => {
          const product = PRODUCTS.find((p) => p.name === item.dataset.product);
          if (product) {
            addToCart(product.name, product.price, product.image);
            closeSearch();
          }
        });
      });
    }

    searchBtn.addEventListener("click", openSearch);
    closeBtn.addEventListener("click", closeSearch);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active")) closeSearch();
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (overlay.classList.contains("active")) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    });

    input.addEventListener("input", (e) => performSearch(e.target.value));

    tags.forEach((tag) => {
      tag.addEventListener("click", () => {
        const searchTerm = tag.dataset.search;
        input.value = searchTerm;
        performSearch(searchTerm);
      });
    });
  }

  // ── Account Dropdown ──
  function initAccountDropdown() {
    const userBtn = document.getElementById("navUser");
    const dropdown = document.getElementById("accountDropdown");

    if (!userBtn || !dropdown) return;

    let isOpen = false;

    function toggleDropdown() {
      isOpen = !isOpen;
      dropdown.classList.toggle("active", isOpen);
    }

    function closeDropdown() {
      isOpen = false;
      dropdown.classList.remove("active");
    }

    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && e.target !== userBtn) {
        closeDropdown();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDropdown();
    });
  }

  // ── Cart System ──
  function initCart() {
    const cartBtn = document.getElementById("navCart");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartClose = document.getElementById("cartClose");
    const cartShopBtn = document.getElementById("cartShopBtn");

    if (!cartBtn || !cartDrawer || !cartOverlay) return;

    function openCart() {
      cartDrawer.classList.add("active");
      cartOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeCart() {
      cartDrawer.classList.remove("active");
      cartOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    cartBtn.addEventListener("click", openCart);
    cartOverlay.addEventListener("click", closeCart);
    if (cartClose) cartClose.addEventListener("click", closeCart);
    if (cartShopBtn) {
      cartShopBtn.addEventListener("click", () => {
        closeCart();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && cartDrawer.classList.contains("active")) closeCart();
    });

    // Quick Add buttons
    document.querySelectorAll(".product-card__quick-add").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productName = btn.dataset.product;
        const price = parseInt(btn.dataset.price, 10);
        const product = PRODUCTS.find((p) => p.name === productName);
        const image = product ? product.image : "";
        addToCart(productName, price, image);
      });
    });

    // Checkout button
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        showToast("Checkout coming soon!");
      });
    }
  }

  function addToCart(name, price, image) {
    const existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, image, qty: 1 });
    }

    updateCartUI();
    showToast(`${name} added to bag!`);

    // Bump badge animation
    const badge = document.getElementById("cartBadge");
    if (badge) {
      badge.classList.remove("bump");
      void badge.offsetWidth; // trigger reflow
      badge.classList.add("bump");
    }
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
  }

  function updateCartQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  }

  function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartFooter = document.getElementById("cartFooter");
    const cartBadge = document.getElementById("cartBadge");
    const cartTotal = document.getElementById("cartTotal");

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Update badge
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      cartBadge.style.display = totalItems > 0 ? "flex" : "none";
    }

    if (cart.length === 0) {
      if (cartItems) cartItems.style.display = "none";
      if (cartEmpty) cartEmpty.style.display = "flex";
      if (cartFooter) cartFooter.style.display = "none";
      return;
    }

    if (cartItems) cartItems.style.display = "block";
    if (cartEmpty) cartEmpty.style.display = "none";
    if (cartFooter) cartFooter.style.display = "block";

    if (cartTotal) cartTotal.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

    if (cartItems) {
      cartItems.innerHTML = cart
        .map(
          (item, index) => `
          <div class="cart-item">
            <img class="cart-item__image" src="${item.image}" alt="${item.name}" />
            <div class="cart-item__info">
              <p class="cart-item__name">${item.name}</p>
              <p class="cart-item__price">₹${(item.price * item.qty).toLocaleString("en-IN")}</p>
              <div class="cart-item__qty">
                <button onclick="window.__cartQty(${index}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="window.__cartQty(${index}, 1)">+</button>
              </div>
            </div>
            <button class="cart-item__remove" onclick="window.__cartRemove(${index})" title="Remove">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>`
        )
        .join("");
    }
  }

  // Expose cart functions globally for inline onclick handlers
  window.__cartQty = updateCartQty;
  window.__cartRemove = removeFromCart;

  // ── Toast Notification ──
  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // ── Product Filter ──
  function initProductFilter() {
    const buttons = document.querySelectorAll(".products__filter-btn");
    const cards = document.querySelectorAll(".product-card");

    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach((card, index) => {
          const category = card.dataset.category;
          const shouldShow = filter === "all" || category === filter;

          card.style.transition = `opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s`;

          if (shouldShow) {
            card.style.display = "";
            requestAnimationFrame(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1) translateY(0)";
            });
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // ── Hero Parallax ──
  function initHeroParallax() {
    const heroImage = document.querySelector(".hero__image img");
    if (!heroImage) return;

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 800) {
            heroImage.style.transform = `translateY(${scrollY * 0.12}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Image lazy fade-in ──
  function initImageFadeIn() {
    const images = document.querySelectorAll("img[loading='lazy']");
    images.forEach((img) => {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)";

      if (img.complete) {
        img.style.opacity = "1";
      } else {
        img.addEventListener("load", () => { img.style.opacity = "1"; });
      }
    });
  }

  // ── Newsletter ──
  function initNewsletter() {
    const input = document.getElementById("newsletterInput");
    const btn = document.getElementById("newsletterBtn");

    if (!input || !btn) return;

    btn.addEventListener("click", () => {
      const email = input.value.trim();
      if (!email || !email.includes("@")) {
        showToast("Please enter a valid email address");
        return;
      }
      showToast(`Subscribed with ${email}!`);
      input.value = "";
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") btn.click();
    });
  }

  // ── Smooth scroll for anchor links ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80; // nav height
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
    });
  }

  // ── Shop Now buttons scroll to products ──
  function initShopButtons() {
    const shopBtns = [
      "heroShopBtn", "collectionShopBtn",
      "saleBtn1", "saleBtn2", "saleBtn3"
    ];

    shopBtns.forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => {
          const products = document.getElementById("products");
          if (products) {
            const offset = 80;
            const top = products.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        });
      }
    });
  }

  // ── Button press feedback ──
  function initButtonEffects() {
    document.querySelectorAll(".btn--primary, .btn--outline, .btn--white").forEach((btn) => {
      btn.addEventListener("mousedown", function () { this.style.transform = "scale(0.97)"; });
      btn.addEventListener("mouseup", function () { this.style.transform = ""; });
      btn.addEventListener("mouseleave", function () { this.style.transform = ""; });
    });
  }

  // ── Init ──
  function init() {
    initScrollReveal();
    initNavScroll();
    initMobileDrawer();
    initSearch();
    initAccountDropdown();
    initCart();
    initProductFilter();
    initHeroParallax();
    initImageFadeIn();
    initNewsletter();
    initSmoothScroll();
    initShopButtons();
    initButtonEffects();
    updateCartUI(); // initial render
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
