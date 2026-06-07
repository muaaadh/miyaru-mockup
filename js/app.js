/* =====================================================================
   MIYARU — application script
   Shared chrome injection + cart + page controllers.
   Depends on js/products.js (window.MIYARU).
   ===================================================================== */
(function () {
  "use strict";

  var M = window.MIYARU || { products: [], categories: [], currency: "$" };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Icons ---------------- */
  var ICONS = {
    cart: '<path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUR: '<path d="M7 17 17 7M8 7h9v9"/>',
    check: '<path d="M5 12.5 10 17.5 19 6.5"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z" fill="currentColor" stroke="none"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    refresh: '<path d="M4 12a8 8 0 0 1 13.7-5.7L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 16"/><path d="M4 20v-4h4"/>',
    plane: '<path d="M21 15l-7-2-3 6-2-1 1-5-5 1-1-2 6-3-2-7 2-1 3 6 7-2 1 2-6 3z"/>',
    droplet: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    truck: '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v13M5 13a7 7 0 0 0 14 0M3 13h2M19 13h2"/>',
    wave: '<path d="M2 9c2.5 0 2.5 3 5 3s2.5-3 5-3 2.5 3 5 3 2.5-3 5-3"/><path d="M2 15c2.5 0 2.5 3 5 3s2.5-3 5-3 2.5 3 5 3 2.5-3 5-3"/>',
    leaf: '<path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1z"/><path d="M5 19C9 14 13 12 17 11"/>',
    lightning: '<path d="M13 3 5 13h6l-1 8 8-10h-6z" fill="currentColor" stroke="none"/>',
    gauge: '<path d="M12 13l4-3"/><path d="M5 18a8 8 0 1 1 14 0"/><circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none"/>',
    heart: '<path d="M12 20s-7-4.5-9.2-9C1.3 8 3 4.5 6.3 4.5c2 0 3.2 1.2 3.7 2 0.5-.8 1.7-2 3.7-2C17 4.5 18.7 8 17.2 11 15 15.5 12 20 12 20z"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 8h2V5h-2c-2 0-3 1.2-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.5c0-.3.2-.5.5-.5z" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M11 9.5l4 2.5-4 2.5z" fill="currentColor" stroke="none"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    bag: '<path d="M6 8h12l-1 12H7z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
  };
  function icon(name, cls) {
    return '<svg class="ico ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }
  function starsHTML(rating) {
    var full = Math.round(rating);
    var s = "";
    for (var i = 0; i < 5; i++) s += '<svg viewBox="0 0 24 24" style="opacity:' + (i < full ? 1 : 0.25) + '" aria-hidden="true">' + ICONS.star + "</svg>";
    return '<span class="stars">' + s + "</span>";
  }

  /* ---------------- Utils ---------------- */
  function money(n) { return M.currency + Number(n).toLocaleString("en-US"); }
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function elFrom(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function param(name) { return new URLSearchParams(window.location.search).get(name); }

  /* ---------------- Shared chrome ---------------- */
  var NAV = [
    { label: "Shop", href: "shop.html", key: "shop" },
    { label: "O₂ Systems", href: "shop.html?cat=oxygen", key: "oxygen" },
    { label: "Masks", href: "shop.html?cat=masks", key: "masks" },
    { label: "Fins", href: "shop.html?cat=fins", key: "fins" },
    { label: "Story", href: "index.html#story", key: "story" }
  ];

  function activeKey() {
    var page = document.body.dataset.page;
    if (page === "shop") return param("cat") || "shop";
    return "";
  }

  function headerHTML() {
    var ak = activeKey();
    var links = NAV.map(function (n) {
      var cur = (n.key === ak) ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + ">" + n.label + "</a>";
    }).join("");
    return (
      '<div class="announce">' +
        '<div class="container">' +
          '<span class="a-item">' + icon("truck") + " Free delivery across the Maldives</span>" +
          '<span class="a-sep">·</span>' +
          '<span class="a-item hide-sm">' + icon("refresh") + " Refill your O₂ yourself</span>" +
          '<span class="a-sep">·</span>' +
          '<span class="a-item">' + icon("shield") + " 2-year cover</span>" +
        "</div>" +
      "</div>" +
      '<header class="site-header" id="siteHeader">' +
        '<div class="container wide bar">' +
          '<a class="brand" href="index.html" aria-label="Miyaru home">' +
            '<img src="assets/logo.jpg" alt="Miyaru" width="120" height="38">' +
          "</a>" +
          '<nav class="nav" aria-label="Primary">' + links + "</nav>" +
          '<div class="header-actions">' +
            '<button class="icon-btn" id="navSearch" aria-label="Search">' + icon("search") + "</button>" +
            '<button class="icon-btn" id="cartOpen" aria-label="Open cart">' + icon("cart") + '<span class="cart-count" id="cartCount">0</span></button>' +
            '<button class="icon-btn hamburger" id="navToggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
          "</div>" +
        "</div>" +
      "</header>" +
      '<div class="nav-overlay" id="navOverlay">' +
        "<nav aria-label=\"Mobile\">" +
          NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + icon("arrowUR") + "</a>"; }).join("") +
        "</nav>" +
        '<div class="ov-foot">' +
          '<a class="btn btn-block" href="shop.html">Shop all gear' + icon("arrow") + "</a>" +
          '<div class="ov-social">' + socialHTML() + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function socialHTML() {
    return ["instagram", "facebook", "youtube"].map(function (s) {
      return '<a href="#" aria-label="' + s + '" class="social-link">' + icon(s) + "</a>";
    }).join("");
  }

  function footerHTML() {
    var year = document.body.dataset.year || "2026";
    return (
      '<footer class="site-footer">' +
        '<div class="container wide">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<a class="brand" href="index.html" aria-label="Miyaru home"><img src="assets/logo.jpg" alt="Miyaru" width="130" height="40"></a>' +
              "<p>Dive equipment born in the Maldives. Refillable O₂, low-volume masks and long-blade fins — built by divers, for the blue.</p>" +
              '<div class="social">' + socialHTML() + "</div>" +
            "</div>" +
            '<div class="footer-col"><h4>Shop</h4>' +
              '<a href="shop.html?cat=oxygen">O₂ Systems</a>' +
              '<a href="shop.html?cat=masks">Masks</a>' +
              '<a href="shop.html?cat=fins">Fins</a>' +
              '<a href="shop.html?cat=bundles">Kits &amp; Bundles</a>' +
              '<a href="shop.html">All gear</a>' +
            "</div>" +
            '<div class="footer-col"><h4>Company</h4>' +
              '<a href="index.html#story">Our story</a>' +
              '<a href="index.html#reef">Reef pledge</a>' +
              '<a href="index.html#newsletter">Dispatches</a>' +
              '<a href="#">Stockists</a>' +
              '<a href="#">Contact</a>' +
            "</div>" +
            '<div class="footer-col"><h4>Support</h4>' +
              '<a href="#">Shipping &amp; delivery</a>' +
              '<a href="#">Returns</a>' +
              '<a href="#">O₂ refilling guide</a>' +
              '<a href="#">Warranty</a>' +
              '<a href="#">FAQ</a>' +
            "</div>" +
          "</div>" +
          '<div class="footer-bottom">' +
            "<span>© " + year + " Miyaru Dive Co. · Malé, Maldives. All rights reserved.</span>" +
            '<div class="pays"><span>VISA</span><span>MC</span><span>AMEX</span><span>BML</span></div>' +
          "</div>" +
        "</div>" +
      "</footer>"
    );
  }

  function chromeOverlaysHTML() {
    return (
      '<div class="backdrop" id="backdrop"></div>' +
      '<aside class="cart-drawer" id="cartDrawer" aria-label="Shopping cart" aria-hidden="true">' +
        '<div class="cart-head"><h3>' + icon("bag") + ' Your cart <span id="cartHeadCount" class="muted" style="font-weight:400;font-size:.8em"></span></h3>' +
          '<button class="c-close" id="cartClose" aria-label="Close cart">' + icon("close") + "</button></div>" +
        '<div class="cart-items" id="cartItems"></div>' +
        '<div class="cart-foot" id="cartFoot"></div>' +
      "</aside>" +
      '<div class="toast-wrap" id="toastWrap" aria-live="polite"></div>' +
      '<div class="mockup-banner">Concept mockup · Miyaru × Dheemi</div>'
    );
  }

  function mountChrome() {
    var frag = document.createElement("div");
    frag.innerHTML = headerHTML();
    var nodes = Array.prototype.slice.call(frag.childNodes);
    var first = document.body.firstChild;
    nodes.forEach(function (n) { document.body.insertBefore(n, first); });

    document.body.insertAdjacentHTML("beforeend", footerHTML());
    document.body.insertAdjacentHTML("beforeend", chromeOverlaysHTML());
  }

  /* ---------------- Cart ---------------- */
  var CART_KEY = "miyaru_cart_v1";
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveCart(c) { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {} }
  function lineKey(id, opt) { return id + "|" + (opt || ""); }

  function addToCart(id, qty, opt) {
    var p = M.find(id); if (!p) return;
    qty = qty || 1;
    var cart = getCart();
    var key = lineKey(id, opt);
    var found = null;
    for (var i = 0; i < cart.length; i++) if (lineKey(cart[i].id, cart[i].opt) === key) found = cart[i];
    if (found) found.qty += qty; else cart.push({ id: id, qty: qty, opt: opt || "" });
    saveCart(cart);
    renderAll();
    bumpCount();
    toast(p.name + (opt ? " · " + opt : "") + " added to cart");
  }
  function setQty(key, qty) {
    var cart = getCart();
    cart = cart.filter(function (l) { if (lineKey(l.id, l.opt) === key) { l.qty = qty; return qty > 0; } return true; });
    saveCart(cart); renderAll();
  }
  function removeLine(key) {
    var cart = getCart().filter(function (l) { return lineKey(l.id, l.opt) !== key; });
    saveCart(cart); renderAll();
  }
  function cartCount() { return getCart().reduce(function (s, l) { return s + l.qty; }, 0); }
  function cartSubtotal() { return getCart().reduce(function (s, l) { var p = M.find(l.id); return s + (p ? p.price * l.qty : 0); }, 0); }

  function bumpCount() {
    var c = qs("#cartCount");
    if (!c) return;
    c.classList.remove("bump");
    void c.offsetWidth;
    c.classList.add("bump");
  }

  function renderBadge() {
    var c = qs("#cartCount"); if (!c) return;
    var n = cartCount();
    c.textContent = n;
    c.classList.toggle("show", n > 0);
    var hc = qs("#cartHeadCount"); if (hc) hc.textContent = n ? "(" + n + ")" : "";
  }

  function renderDrawer() {
    var wrap = qs("#cartItems"); var foot = qs("#cartFoot");
    if (!wrap || !foot) return;
    var cart = getCart();
    if (!cart.length) {
      wrap.innerHTML = '<div class="cart-empty">' + icon("bag") + "<div><strong>Your cart is quiet</strong><br><span class=\"muted\">Like the sea at dawn. Add some gear to get going.</span></div>" +
        '<a class="btn" href="shop.html">Browse the shop' + icon("arrow") + "</a></div>";
      foot.innerHTML = "";
      return;
    }
    wrap.innerHTML = cart.map(function (l) {
      var p = M.find(l.id); if (!p) return "";
      var key = lineKey(l.id, l.opt);
      return '<div class="cart-line" data-key="' + key + '">' +
        '<a class="cl-img" href="product.html?id=' + p.id + '"><img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy"></a>' +
        "<div>" +
          '<div class="cl-name">' + p.name + "</div>" +
          (l.opt ? '<div class="cl-meta">' + l.opt + "</div>" : "") +
          '<div class="qty" data-key="' + key + '"><button class="q-dec" aria-label="Decrease">' + icon("minus") + "</button><span>" + l.qty + "</span><button class=\"q-inc\" aria-label=\"Increase\">" + icon("plus") + "</button></div>" +
        "</div>" +
        '<div style="text-align:right"><div class="cl-price">' + money(p.price * l.qty) + "</div>" +
          '<button class="cl-remove" data-key="' + key + '">Remove</button></div>' +
      "</div>";
    }).join("");

    var sub = cartSubtotal();
    foot.innerHTML =
      '<div class="ship-note">' + icon("truck") + " Free delivery across the Maldives</div>" +
      '<div class="cart-row"><span>Subtotal</span><span>' + money(sub) + "</span></div>" +
      '<div class="cart-row total"><span>Total</span><span>' + money(sub) + "</span></div>" +
      '<a class="btn btn-block btn-lg" href="checkout.html">Checkout' + icon("arrow") + "</a>" +
      '<button class="link-arrow" id="cartContinue" style="justify-content:center">Continue browsing</button>';
  }

  function renderAll() { renderBadge(); renderDrawer(); }

  function openCart() {
    var d = qs("#cartDrawer"), b = qs("#backdrop");
    if (!d) return;
    d.classList.add("open"); d.setAttribute("aria-hidden", "false");
    b.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    var d = qs("#cartDrawer"), b = qs("#backdrop");
    if (!d) return;
    d.classList.remove("open"); d.setAttribute("aria-hidden", "true");
    b.classList.remove("show");
    if (!document.body.classList.contains("nav-open")) document.body.style.overflow = "";
  }

  /* ---------------- Toast ---------------- */
  function toast(msg) {
    var wrap = qs("#toastWrap"); if (!wrap) return;
    var t = elFrom('<div class="toast"><span class="t-ico">' + icon("check") + "</span><span>" + msg + "</span></div>");
    wrap.appendChild(t);
    setTimeout(function () {
      t.classList.add("hide");
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 450);
    }, 2600);
  }

  /* ---------------- Product card ---------------- */
  function productCardHTML(p) {
    var badge = p.badge ? '<span class="badge ' + (p.badgeType || "aqua") + '">' + p.badge + "</span>" : "";
    var defOpt = p.options ? p.options.values[0] : "";
    var wasHTML = p.was ? ' <span class="was">' + money(p.was) + "</span>" : "";
    return '<article class="product-card reveal">' +
      '<div class="p-media">' + badge +
        '<a href="product.html?id=' + p.id + '" aria-label="' + p.name + '"><img src="' + p.images[0] + '" alt="' + p.name + '" loading="lazy"></a>' +
        '<div class="p-quick"><button class="btn btn-block btn-sm add-quick" data-id="' + p.id + '" data-opt="' + defOpt + '">' + icon("cart") + " Add to cart</button></div>" +
      "</div>" +
      '<div class="p-body">' +
        '<span class="p-cat">' + M.categoryLabel(p.category) + "</span>" +
        '<h3 class="p-name"><a href="product.html?id=' + p.id + '">' + p.name + "</a></h3>" +
        '<p class="p-desc">' + p.short + "</p>" +
        '<div class="rating-row">' + starsHTML(p.rating) + "<span>" + p.rating.toFixed(1) + " · " + p.reviews + " reviews</span></div>" +
        '<div class="p-foot"><span class="price">' + money(p.price) + wasHTML + "</span>" +
          '<button class="add-btn add-quick" data-id="' + p.id + '" data-opt="' + defOpt + '" aria-label="Add ' + p.name + ' to cart">' + icon("plus") + "</button></div>" +
      "</div>" +
    "</article>";
  }

  function wireAddButtons(scope) {
    qsa(".add-quick", scope).forEach(function (b) {
      if (b.dataset.wired) return; b.dataset.wired = "1";
      b.addEventListener("click", function (e) {
        e.preventDefault();
        addToCart(b.dataset.id, 1, b.dataset.opt || "");
        openCart();
      });
    });
  }

  /* ---------------- Reveal ---------------- */
  function initReveal() {
    var items = qsa(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach(function (i) { i.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (i) { io.observe(i); });
  }
  function observeNewReveals(scope) {
    if (reduceMotion) { qsa(".reveal", scope).forEach(function (i) { i.classList.add("in"); }); return; }
    requestAnimationFrame(function () { qsa(".reveal", scope).forEach(function (i) { i.classList.add("in"); }); });
  }

  /* ---------------- Bubbles ---------------- */
  function initBubbles() {
    if (reduceMotion) return;
    qsa(".bubbles").forEach(function (layer) {
      var count = parseInt(layer.dataset.count || "14", 10);
      for (var i = 0; i < count; i++) {
        var size = 4 + Math.random() * 22;
        var b = document.createElement("span");
        b.className = "bubble";
        b.style.width = size + "px";
        b.style.height = size + "px";
        b.style.left = (Math.random() * 100) + "%";
        b.style.animationDuration = (9 + Math.random() * 12) + "s";
        b.style.animationDelay = (-Math.random() * 14) + "s";
        b.style.opacity = (0.25 + Math.random() * 0.4).toFixed(2);
        layer.appendChild(b);
      }
    });
  }

  /* ---------------- Parallax ---------------- */
  function initParallax() {
    if (reduceMotion) return;
    var layers = qsa("[data-parallax]");
    if (!layers.length) return;
    var ticking = false;
    function update() {
      var y = window.pageYOffset;
      layers.forEach(function (l) {
        var speed = parseFloat(l.dataset.parallax) || 0.2;
        l.style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0) scale(1.08)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------------- Count up ---------------- */
  function initCountUp() {
    var nums = qsa("[data-count]");
    if (!nums.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) { nums.forEach(function (n) { n.textContent = (n.dataset.prefix || "") + n.dataset.count + (n.dataset.suffix || ""); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var n = en.target; io.unobserve(n);
        var target = parseFloat(n.dataset.count);
        var dec = (n.dataset.count.indexOf(".") > -1) ? 1 : 0;
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var prog = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - prog, 3);
          var val = (target * eased).toFixed(dec);
          n.textContent = (n.dataset.prefix || "") + Number(val).toLocaleString("en-US") + (n.dataset.suffix || "");
          if (prog < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---------------- Marquee ---------------- */
  function initMarquee() {
    qsa(".marquee-track").forEach(function (track) {
      if (track.dataset.doubled) return;
      track.dataset.doubled = "1";
      track.innerHTML = track.innerHTML + track.innerHTML;
    });
  }

  /* ---------------- Header behaviour ---------------- */
  function initHeaderBehaviour() {
    var header = qs("#siteHeader");
    function onScroll() { if (header) header.classList.toggle("scrolled", window.pageYOffset > 24); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var toggle = qs("#navToggle"), overlay = qs("#navOverlay");
    function closeNav() {
      document.body.classList.remove("nav-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      if (!qs("#cartDrawer.open")) document.body.style.overflow = "";
    }
    if (toggle) toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    if (overlay) qsa("a", overlay).forEach(function (a) { a.addEventListener("click", closeNav); });

    // Cart wiring
    var cartOpenBtn = qs("#cartOpen"), cartCloseBtn = qs("#cartClose"), backdrop = qs("#backdrop");
    if (cartOpenBtn) cartOpenBtn.addEventListener("click", openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
    if (backdrop) backdrop.addEventListener("click", closeCart);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeCart(); closeNav(); } });
    qs("#navSearch") && qs("#navSearch").addEventListener("click", function () { window.location.href = "shop.html"; });

    // Drawer delegated controls
    var items = qs("#cartItems"), foot = qs("#cartFoot");
    if (items) items.addEventListener("click", function (e) {
      var inc = e.target.closest(".q-inc"), dec = e.target.closest(".q-dec"), rem = e.target.closest(".cl-remove");
      if (inc || dec) {
        var qrow = e.target.closest(".qty"); var key = qrow.dataset.key;
        var cart = getCart(); var line = null;
        cart.forEach(function (l) { if (lineKey(l.id, l.opt) === key) line = l; });
        if (line) setQty(key, line.qty + (inc ? 1 : -1));
      } else if (rem) { removeLine(rem.dataset.key); }
    });
    if (foot) foot.addEventListener("click", function (e) { if (e.target.closest("#cartContinue")) closeCart(); });
  }

  /* ---------------- Newsletter ---------------- */
  function initNewsletter() {
    var form = qs("#newsletterForm"); if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input[type=email]");
      if (input && !input.checkValidity()) { input.reportValidity(); return; }
      var note = qs("#newsletterNote");
      if (note) { note.textContent = "Thanks — check your inbox to confirm your subscription."; note.style.color = "var(--aqua)"; }
      form.reset();
      toast("You're on the list — welcome aboard");
    });
  }

  /* ---------------- Home: featured ---------------- */
  function initFeatured() {
    qsa("[data-featured]").forEach(function (host) {
      var ids = (host.dataset.featured || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      var list = ids.length ? ids.map(function (id) { return M.find(id); }).filter(Boolean) : M.products.slice(0, 4);
      host.innerHTML = list.map(productCardHTML).join("");
      wireAddButtons(host);
      observeNewReveals(host);
    });
  }

  /* ---------------- Shop ---------------- */
  function initShop() {
    var grid = qs("#shopGrid"); if (!grid) return;
    var pills = qs("#filterPills"), sortSel = qs("#sortSelect"), countEl = qs("#resultCount"), titleEl = qs("#shopTitle"), descEl = qs("#shopDesc");
    var state = { cat: param("cat") || "all", sort: "featured" };

    var cats = [{ slug: "all", label: "All gear" }].concat(M.categories.map(function (c) { return { slug: c.slug, label: c.label }; }));
    if (pills) {
      pills.innerHTML = cats.map(function (c) {
        return '<button class="filter-pill' + (c.slug === state.cat ? " active" : "") + '" data-cat="' + c.slug + '">' + c.label + "</button>";
      }).join("");
      pills.addEventListener("click", function (e) {
        var b = e.target.closest(".filter-pill"); if (!b) return;
        state.cat = b.dataset.cat;
        qsa(".filter-pill", pills).forEach(function (x) { x.classList.toggle("active", x === b); });
        syncUrl(); render();
      });
    }
    if (sortSel) sortSel.addEventListener("change", function () { state.sort = sortSel.value; render(); });

    function syncUrl() {
      var url = state.cat === "all" ? "shop.html" : "shop.html?cat=" + state.cat;
      window.history.replaceState({}, "", url);
    }
    function headings() {
      var meta = M.categories.filter(function (c) { return c.slug === state.cat; })[0];
      if (titleEl) titleEl.textContent = meta ? meta.label : "All dive gear";
      if (descEl) descEl.textContent = meta ? meta.blurb : "Refillable O₂, low-volume masks and long-blade fins — the full Miyaru range, built by divers for the blue.";
    }
    function render() {
      var list = M.byCategory(state.cat);
      if (state.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
      grid.style.opacity = 0;
      setTimeout(function () {
        grid.innerHTML = list.map(productCardHTML).join("");
        wireAddButtons(grid);
        observeNewReveals(grid);
        grid.style.opacity = 1;
      }, 120);
      if (countEl) countEl.textContent = list.length + (list.length === 1 ? " product" : " products");
      headings();
    }
    grid.style.transition = "opacity .25s ease";
    render();
  }

  /* ---------------- Product detail ---------------- */
  function initProduct() {
    var host = qs("#pdp"); if (!host) return;
    var id = param("id");
    var p = M.find(id) || M.products[0];
    document.title = p.name + " · Miyaru";

    var selOpt = p.options ? p.options.values[0] : "";
    var qty = 1;
    var activeImg = 0;

    var optHTML = "";
    if (p.options) {
      optHTML = '<div class="opt-group"><div class="opt-label"><span>' + p.options.label + '</span></div><div class="opt-row" id="optRow">' +
        p.options.values.map(function (v, i) { return '<button class="opt-chip' + (i === 0 ? " active" : "") + '" data-val="' + v + '">' + v + "</button>"; }).join("") +
        "</div></div>";
    }
    var wasHTML = p.was ? '<span class="was">' + money(p.was) + "</span>" : "";
    var badge = p.badge ? '<span class="chip"><span class="dot"></span>' + p.badge + "</span>" : "";

    host.innerHTML =
      '<nav class="breadcrumb" style="margin-bottom:1.4rem;font-size:var(--fs-xs)"><a href="index.html">Home</a> ' + icon("chevron", "") + ' <a href="shop.html">Shop</a> ' + icon("chevron") + " <a href=\"shop.html?cat=" + p.category + "\">" + M.categoryLabel(p.category) + "</a></nav>" +
      '<div class="pdp">' +
        '<div class="pdp-gallery">' +
          '<div class="pdp-main"><img id="pdpMain" src="' + p.images[0] + '" alt="' + p.name + '"></div>' +
          (p.images.length > 1 ? '<div class="pdp-thumbs" id="pdpThumbs">' + p.images.map(function (im, i) {
            return '<button class="' + (i === 0 ? "active" : "") + '" data-i="' + i + '"><img src="' + im + '" alt="' + p.name + ' view ' + (i + 1) + '"></button>';
          }).join("") + "</div>" : "") +
        "</div>" +
        '<div class="pdp-info">' +
          '<span class="p-cat">' + M.categoryLabel(p.category) + "</span>" +
          "<h1>" + p.name + "</h1>" +
          '<div class="rating-row">' + starsHTML(p.rating) + "<span>" + p.rating.toFixed(1) + " · " + p.reviews + " reviews</span> " + badge + "</div>" +
          '<div class="pdp-price"><span class="price">' + money(p.price) + " " + wasHTML + "</span></div>" +
          '<p class="pdp-desc">' + p.desc + "</p>" +
          '<ul class="tick-list">' + p.highlights.map(function (h) { return '<li><span class="tk">' + icon("check") + "</span><span>" + h + "</span></li>"; }).join("") + "</ul>" +
          optHTML +
          '<div class="pdp-buy">' +
            '<div class="qty" id="pdpQty"><button class="q-dec" aria-label="Decrease">' + icon("minus") + '</button><span id="pdpQtyVal">1</span><button class="q-inc" aria-label="Increase">' + icon("plus") + "</button></div>" +
            '<button class="btn btn-lg" id="pdpAdd">' + icon("cart") + " Add to cart · " + money(p.price) + "</button>" +
          "</div>" +
          '<ul class="pdp-assure">' +
            "<li>" + icon("truck") + " Free delivery across the Maldives, 2–4 days</li>" +
            "<li>" + icon("shield") + " 2-year Miyaru cover &amp; easy returns</li>" +
            "<li>" + icon("refresh") + " Refill your O₂ yourself — no shop visit</li>" +
          "</ul>" +
          '<div class="specs">' + p.specs.map(function (s) { return '<div class="spec"><div class="sp-k">' + s.k + '</div><div class="sp-v">' + s.v + "</div></div>"; }).join("") + "</div>" +
        "</div>" +
      "</div>";

    // Gallery thumbs
    var main = qs("#pdpMain"), thumbs = qs("#pdpThumbs");
    if (thumbs) thumbs.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      activeImg = parseInt(b.dataset.i, 10);
      main.src = p.images[activeImg];
      qsa("button", thumbs).forEach(function (x) { x.classList.toggle("active", x === b); });
    });
    // Options
    var optRow = qs("#optRow");
    if (optRow) optRow.addEventListener("click", function (e) {
      var b = e.target.closest(".opt-chip"); if (!b) return;
      selOpt = b.dataset.val;
      qsa(".opt-chip", optRow).forEach(function (x) { x.classList.toggle("active", x === b); });
    });
    // Qty
    var qtyVal = qs("#pdpQtyVal");
    qs("#pdpQty").addEventListener("click", function (e) {
      if (e.target.closest(".q-inc")) qty++;
      else if (e.target.closest(".q-dec")) qty = Math.max(1, qty - 1);
      qtyVal.textContent = qty;
    });
    // Add
    qs("#pdpAdd").addEventListener("click", function () { addToCart(p.id, qty, selOpt); openCart(); });

    // Related
    var rel = qs("#relatedGrid");
    if (rel) {
      var related = M.products.filter(function (x) { return x.id !== p.id; });
      related = related.filter(function (x) { return x.category === p.category; }).concat(related.filter(function (x) { return x.category !== p.category; })).slice(0, 4);
      rel.innerHTML = related.map(productCardHTML).join("");
      wireAddButtons(rel);
      observeNewReveals(rel);
    }
    observeNewReveals(host);
  }

  /* ---------------- Checkout ---------------- */
  function initCheckout() {
    var host = qs("#checkout"); if (!host) return;
    var cart = getCart();
    var summaryHost = qs("#coSummary");

    function renderSummary() {
      cart = getCart();
      if (!summaryHost) return;
      if (!cart.length) {
        summaryHost.innerHTML = '<h3>Order summary</h3><p class="muted">Your cart is empty.</p><a class="btn btn-block" href="shop.html" style="margin-top:1rem">Browse the shop' + icon("arrow") + "</a>";
        return;
      }
      var sub = cartSubtotal();
      var lines = cart.map(function (l) {
        var p = M.find(l.id); if (!p) return "";
        return '<div class="sum-line"><div class="sl-img"><img src="' + p.images[0] + '" alt="' + p.name + '"></div>' +
          '<div><div class="sl-name">' + p.name + '</div><div class="sl-meta">' + (l.opt ? l.opt + " · " : "") + "Qty " + l.qty + '</div></div>' +
          '<div class="sl-price">' + money(p.price * l.qty) + "</div></div>";
      }).join("");
      summaryHost.innerHTML = "<h3>Order summary</h3>" + lines +
        '<div class="promo"><div class="field">' + icon("lightning") + '<input type="text" placeholder="Promo code" aria-label="Promo code"></div><button class="btn btn-dark btn-sm">Apply</button></div>' +
        '<div class="sum-totals">' +
          '<div class="cart-row"><span>Subtotal</span><span>' + money(sub) + "</span></div>" +
          '<div class="cart-row"><span>Delivery</span><span style="color:var(--aqua)">Free</span></div>' +
          '<div class="cart-row total"><span>Total</span><span>' + money(sub) + "</span></div>" +
        "</div>";
    }
    renderSummary();

    // Payment selection
    var payWrap = qs("#payMethods");
    if (payWrap) payWrap.addEventListener("click", function (e) {
      var opt = e.target.closest(".pay-opt"); if (!opt) return;
      qsa(".pay-opt", payWrap).forEach(function (x) { x.classList.toggle("active", x === opt); });
      var radio = opt.querySelector("input"); if (radio) radio.checked = true;
    });

    // Place order
    var form = qs("#checkoutForm");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!getCart().length) { toast("Your cart is empty"); return; }
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var orderNo = "MYR-" + String(100000 + Math.floor(((Date.now ? Date.now() : 524000) % 900000))).slice(0, 6);
      saveCart([]); renderAll();
      var page = qs("#checkoutPage");
      page.innerHTML =
        '<div class="confirm reveal in">' +
          '<div class="check-ring">' + icon("check") + "</div>" +
          "<h1>You're all set.</h1>" +
          '<p class="lede" style="margin:1rem auto 1.4rem">Thank you — your Miyaru gear is on its way. We\'ve sent a confirmation to your inbox with tracking once it ships.</p>' +
          '<p>Order <span class="order-no">' + orderNo + '</span></p>' +
          '<div class="hero-cta" style="justify-content:center;margin-top:2rem"><a class="btn" href="shop.html">Continue shopping' + icon("arrow") + '</a><a class="btn btn-ghost" href="index.html">Back to home</a></div>' +
        "</div>";
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    mountChrome();
    initHeaderBehaviour();
    renderAll();
    initMarquee();
    initBubbles();
    initParallax();
    initReveal();
    initCountUp();

    var page = document.body.dataset.page;
    initFeatured();
    initNewsletter();
    if (page === "shop") initShop();
    else if (page === "product") initProduct();
    else if (page === "checkout") initCheckout();

    // Wire any static add buttons present in markup
    wireAddButtons(document);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  // expose a tiny API for inline handlers if needed
  window.MiyaruApp = { addToCart: addToCart, openCart: openCart };
})();
