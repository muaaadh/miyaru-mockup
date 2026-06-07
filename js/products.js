/* =====================================================================
   MIYARU — catalogue data (mock)
   Prices in USD. Imagery: real product photography supplied by the brand.
   Exposed on window.MIYARU for the shop / product / cart scripts.
   ===================================================================== */
(function () {
  "use strict";

  var CATEGORIES = [
    { slug: "oxygen", label: "O₂ Systems", tagline: "Pocket air, anywhere",
      blurb: "Refillable mini cylinders that slip in a BCD pocket — your safety margin and your quick-dip freedom.",
      image: "assets/products/o2-tank.png" },
    { slug: "masks", label: "Masks", tagline: "See the whole reef",
      blurb: "Low-volume and full-face masks with tempered, anti-fog lenses and a leak-free silicone seal.",
      image: "assets/products/fullface-mask-rocks.png" },
    { slug: "fins", label: "Fins", tagline: "More glide, less effort",
      blurb: "Long-blade freediving fins engineered for an efficient kick and easy travel.",
      image: "assets/products/fins-only.png" },
    { slug: "bundles", label: "Kits & Bundles", tagline: "Everything, ready to dive",
      blurb: "Curated kits that pair mask, fins and O₂ so you can step off the boat fully equipped.",
      image: "assets/products/fins-red-masks.png" }
  ];

  var PRODUCTS = [
    {
      id: "o2-pocket",
      name: "Miyaru O₂ Pocket Cylinder",
      category: "oxygen",
      price: 189,
      badge: "Bestseller", badgeType: "aqua",
      rating: 4.9, reviews: 214,
      short: "A refillable mini cylinder for quick dips, safety stops and a confident ascent.",
      desc: "The cylinder that started it all. Filled with standard compressed breathing air — not pure oxygen — the Miyaru O₂ Pocket gives you up to 8–10 minutes at shallow depth in a body small enough to live in a BCD pocket: a margin for quick dips, surface swims and calm, controlled ascents. Anodised aluminium, a stainless valve and a dive-grade regulator you refill yourself from any standard tank or hand pump — no shop visit required.",
      images: ["assets/products/o2-tank.png", "assets/products/mask-black-tank-beach.png", "assets/products/o2-poster.png"],
      options: { label: "Capacity", values: ["0.5 L", "1.0 L"] },
      highlights: [
        "Up to 8–10 minutes of breathing air at shallow depth",
        "Refill yourself — standard tank or hand pump",
        "Aircraft cabin friendly when empty"
      ],
      specs: [
        { k: "Material", v: "6061-T6 anodised aluminium" },
        { k: "Capacity", v: "0.5 L / 1.0 L" },
        { k: "Working pressure", v: "200 bar / 3000 psi" },
        { k: "Weight", v: "510 g (filled)" },
        { k: "Certification", v: "CE EN 250 tested" },
        { k: "Warranty", v: "2-year Miyaru cover" }
      ]
    },
    {
      id: "o2-refill",
      name: "O₂ Refill Pump Kit",
      category: "oxygen",
      price: 59,
      badge: null,
      rating: 4.7, reviews: 86,
      short: "A compact hand pump and adapter set to top up your Pocket Cylinder between dives.",
      desc: "Stay independent of the dive shop. This hand-pump kit refills any Miyaru O₂ cylinder from empty in minutes, with a pressure gauge, dust filter and adapters for standard valves. Folds flat into your gear bag.",
      images: ["assets/products/mask-black-tank-beach.png", "assets/products/o2-tank.png"],
      options: null,
      highlights: [
        "Refills a 0.5 L cylinder in ~4 minutes",
        "Built-in pressure gauge + dust filter",
        "Folds flat for travel"
      ],
      specs: [
        { k: "Type", v: "Two-stage hand pump" },
        { k: "Max pressure", v: "210 bar" },
        { k: "Adapters", v: "DIN + standard valve" },
        { k: "Weight", v: "640 g" },
        { k: "Warranty", v: "2-year Miyaru cover" }
      ]
    },
    {
      id: "mask-frost",
      name: "Reef Mask — Frost White",
      category: "masks",
      price: 59,
      badge: null,
      rating: 4.8, reviews: 137,
      short: "A low-volume, low-profile mask with a crystal field of view and feather-light frame.",
      desc: "Frost White is our everyday low-volume mask: a soft medical-grade silicone skirt that seals on every face, tempered glass lenses with an anti-fog coat, and a frame light enough to forget you're wearing it. Equalise faster and clear in a single breath.",
      images: ["assets/products/mask-white-leaves.png", "assets/products/fullface-mask-rocks.png"],
      options: { label: "Strap", values: ["Silicone", "Comfort fabric"] },
      highlights: [
        "Low-volume — equalises fast, clears easy",
        "Tempered, anti-fog twin lenses",
        "Hypoallergenic silicone skirt"
      ],
      specs: [
        { k: "Lens", v: "Tempered glass, anti-fog" },
        { k: "Skirt", v: "Medical-grade silicone" },
        { k: "Volume", v: "Low (98 cc)" },
        { k: "Field of view", v: "Wide / panoramic" },
        { k: "Weight", v: "168 g" },
        { k: "Warranty", v: "1-year Miyaru cover" }
      ]
    },
    {
      id: "mask-abyss",
      name: "Reef Mask — Abyss Black",
      category: "masks",
      price: 59,
      badge: null,
      rating: 4.8, reviews: 121,
      short: "The Frost mask in a stealth black skirt that kills lens glare on bright reef days.",
      desc: "Same low-volume fit, same crystal optics — finished in a black silicone skirt that blocks side glare and sharpens contrast on sun-soaked reefs. A favourite of underwater photographers and spearos alike.",
      images: ["assets/products/mask-abyss.png", "assets/products/mask-black-tank-beach.png"],
      options: { label: "Strap", values: ["Silicone", "Comfort fabric"] },
      highlights: [
        "Black skirt blocks side glare",
        "Low-volume — equalises fast",
        "Tempered, anti-fog twin lenses"
      ],
      specs: [
        { k: "Lens", v: "Tempered glass, anti-fog" },
        { k: "Skirt", v: "Black medical-grade silicone" },
        { k: "Volume", v: "Low (98 cc)" },
        { k: "Field of view", v: "Wide / panoramic" },
        { k: "Weight", v: "172 g" },
        { k: "Warranty", v: "1-year Miyaru cover" }
      ]
    },
    {
      id: "mask-tide",
      name: "Tide Full-Face Snorkel Mask",
      category: "masks",
      price: 79,
      badge: "New", badgeType: "coral",
      rating: 4.6, reviews: 64,
      short: "180° panoramic full-face mask with a dry-top snorkel and anti-fog airflow.",
      desc: "Breathe naturally through your nose and mouth while a 180° single lens opens up the whole reef. A separated airflow channel keeps the lens fog-free, and the dry-top snorkel seals the moment a wave rolls over. The easiest way to put a first-timer at ease in the water.",
      images: ["assets/products/fullface-mask-rocks.png", "assets/products/mask-black-tank-beach.png"],
      options: { label: "Size", values: ["S / M", "L / XL"] },
      highlights: [
        "180° panoramic single lens",
        "Dry-top snorkel seals out water",
        "Separated airflow — no fog, no CO₂ build-up"
      ],
      specs: [
        { k: "Lens", v: "180° polycarbonate, anti-fog" },
        { k: "Snorkel", v: "Dry-top, detachable" },
        { k: "Sizes", v: "S/M and L/XL" },
        { k: "Camera mount", v: "Integrated action-cam clip" },
        { k: "Weight", v: "320 g" },
        { k: "Warranty", v: "1-year Miyaru cover" }
      ]
    },
    {
      id: "fins-current",
      name: "Current Freediving Fins — Coral",
      category: "fins",
      price: 149,
      was: 169,
      badge: "Save $20", badgeType: "coral",
      rating: 4.9, reviews: 158,
      short: "Long-blade fins tuned for an efficient kick — more glide for every breath you hold.",
      desc: "Current is built for the long, slow kick of freediving and reef cruising. A progressive-flex composite blade transfers every bit of leg power into forward motion, while the anatomical foot pocket spreads load so your calves last the whole session. Coral red, because the ocean should see you coming.",
      images: ["assets/products/fins-only.png", "assets/products/fins-red-masks.png"],
      options: { label: "Size (EU)", values: ["38–39", "40–41", "42–43", "44–45", "46–47"] },
      highlights: [
        "Progressive-flex composite blade",
        "Anatomical, full-foot pocket",
        "Travel-length blade — fits a check-in bag"
      ],
      specs: [
        { k: "Blade", v: "Composite, progressive flex" },
        { k: "Foot pocket", v: "Anatomical full-foot" },
        { k: "Blade length", v: "65 cm (travel)" },
        { k: "Sizes", v: "EU 38 – 47" },
        { k: "Weight", v: "1.3 kg / pair" },
        { k: "Warranty", v: "1-year Miyaru cover" }
      ]
    },
    {
      id: "kit-explorer",
      name: "Miyaru Dive Kit — Mask · Fins · O₂",
      category: "bundles",
      price: 349,
      was: 397,
      badge: "Save $48", badgeType: "coral",
      rating: 5.0, reviews: 73,
      short: "Step off the boat fully equipped: a Reef mask, Current fins and a Pocket O₂ cylinder.",
      desc: "Everything you need to get in the water, bundled and priced to save. The Miyaru Dive Kit pairs a Reef low-volume mask, a set of Current freediving fins and a Miyaru O₂ Pocket Cylinder in a single roll-top dry bag — the cleanest way to gift a diver or kit yourself out in one go.",
      images: ["assets/products/fins-red-masks.png", "assets/products/mask-white-leaves.png", "assets/products/o2-tank.png"],
      options: { label: "Fin size (EU)", values: ["38–39", "40–41", "42–43", "44–45", "46–47"] },
      highlights: [
        "Reef mask + Current fins + O₂ Pocket Cylinder",
        "Packed in a roll-top dry bag",
        "Save $48 versus buying separately"
      ],
      specs: [
        { k: "Includes", v: "Mask, fins, O₂ cylinder, dry bag" },
        { k: "Mask", v: "Reef low-volume" },
        { k: "Fins", v: "Current, your size" },
        { k: "O₂", v: "Pocket Cylinder 0.5 L" },
        { k: "Value", v: "$397 → $349" },
        { k: "Warranty", v: "Full Miyaru cover" }
      ]
    }
  ];

  function find(id) {
    for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].id === id) return PRODUCTS[i]; }
    return null;
  }
  function byCategory(slug) {
    if (!slug || slug === "all") return PRODUCTS.slice();
    return PRODUCTS.filter(function (p) { return p.category === slug; });
  }
  function categoryLabel(slug) {
    for (var i = 0; i < CATEGORIES.length; i++) { if (CATEGORIES[i].slug === slug) return CATEGORIES[i].label; }
    return slug;
  }
  function count(slug) { return byCategory(slug).length; }

  window.MIYARU = {
    products: PRODUCTS,
    categories: CATEGORIES,
    find: find,
    byCategory: byCategory,
    categoryLabel: categoryLabel,
    count: count,
    currency: "$"
  };
})();
