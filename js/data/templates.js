// ============================================================================
// 22 COMPREHENSIVE SHOP & BUSINESS CATEGORIES WITH REALISTIC DATA
// ============================================================================

window.SHOP_CATEGORIES = {
  Fashion: {
    name: 'Fashion & Apparel',
    icon: '👗',
    theme: 'luxury-premium',
    cur: '₹',
    tag: 'Elegance for Every Season',
    sub: 'Discover premium tailored garments, artisanal footwear, and contemporary accessories.',
    contact: 'Order online with Free Shipping over ₹1,999 or WhatsApp us directly.',
    hours: 'Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 7:00 PM',
    address: '104 Designer Row, High Street Fashion Hub',
    phone: '+91 98765 43210',
    email: 'hello@fashioncraft.com',
    hero: {
      title: 'Timeless Silhouettes, Modern Craft',
      subtitle: 'New Autumn/Winter Collection is now live with sustainably sourced fabrics.',
      cta: 'Explore Collection',
      badge: 'NEW ARRIVALS 2026'
    },
    features: [
      { icon: '✨', title: '100% Organic Fabrics', desc: 'Crafted with premium certified organic cotton and linen.' },
      { icon: '🚚', title: 'Free Express Delivery', desc: 'Complimentary shipping on all prepaid orders nationwide.' },
      { icon: '🔄', title: '7-Day Easy Exchange', desc: 'Hassle-free size and style swaps with doorstep pickup.' }
    ],
    faqs: [
      { q: 'How do I find my accurate size?', a: 'Please check our detailed size chart on each product card or message us on WhatsApp with your measurements.' },
      { q: 'Do you offer international shipping?', a: 'Yes, we ship globally with tracked express couriers within 5-8 business days.' }
    ],
    products: [
      { id: 'f1', n: 'Pure Linen Oversized Shirt', p: '1,499', op: '1,899', c: 'Men', e: '👕', d: 'Breathable European linen in classic ecru with mother-of-pearl buttons.', x: 'BESTSELLER', f: true, rating: 4.9 },
      { id: 'f2', n: 'Tiered Floral Midi Dress', p: '2,299', op: '2,899', c: 'Women', e: '👗', d: 'Airy chiffon with hand-painted botanical motifs and cinched waist.', x: '-20%', f: true, rating: 4.8 },
      { id: 'f3', n: 'Vintage Washed Denim Jacket', p: '2,999', op: '3,499', c: 'Outerwear', e: '🧥', d: '14oz Japanese selvedge denim with antique brass hardware.', x: 'TRENDING', f: true, rating: 5.0 },
      { id: 'f4', n: 'Minimalist Canvas Trainers', p: '1,899', op: '2,199', c: 'Footwear', e: '👟', d: 'Vulcanized rubber sole with memory foam cushioned insole.', x: 'NEW', f: false, rating: 4.7 },
      { id: 'f5', n: 'Structured Leather Crossbody', p: '2,499', op: '2,999', c: 'Bags', e: '👜', d: 'Full-grain pebble leather with gold hardware and magnetic closure.', x: 'HOT', f: true, rating: 4.9 },
      { id: 'f6', n: 'Woven Straw Sun Hat', p: '699', op: '899', c: 'Accessories', e: '👒', d: 'UPF 50+ wide brim with grosgrain ribbon tie.', x: '', f: false, rating: 4.6 }
    ]
  },

  Grocery: {
    name: 'Grocery & Supermarket',
    icon: '🥦',
    theme: 'organic-natural',
    cur: '₹',
    tag: 'Farm-Fresh Daily Essentials',
    sub: 'Organic vegetables, daily dairy, artisanal pantry staples delivered to your door in 30 mins.',
    contact: 'Order before 2 PM for same-day delivery. WhatsApp for instant order.',
    hours: 'Open 7 Days: 7:00 AM - 10:00 PM',
    address: 'Shop 12, Market Square, Green Valley',
    phone: '+91 98111 22334',
    email: 'orders@freshgrocer.in',
    hero: {
      title: 'Farm Fresh Organic Harvest Every Morning',
      subtitle: 'Hand-picked directly from certified local farmers without artificial ripening.',
      cta: 'Shop Fresh Daily',
      badge: 'FARM TO FORK'
    },
    features: [
      { icon: '🌱', title: '100% Certified Organic', desc: 'Zero harmful chemical pesticides or preservatives.' },
      { icon: '⚡', title: '30-Minute Delivery', desc: 'Cold-chain insulated packing guarantees crisp freshness.' },
      { icon: '🛡️', title: 'Quality Guarantee', desc: 'Not satisfied? Instant refund, no questions asked.' }
    ],
    faqs: [
      { q: 'When is produce harvested?', a: 'All green leafy veggies and fruits arrive fresh at 5:00 AM each morning.' },
      { q: 'Is there a minimum order amount?', a: 'Free delivery on all orders above ₹299.' }
    ],
    products: [
      { id: 'g1', n: 'Organic Hass Avocados (Pack of 2)', p: '180', op: '220', c: 'Produce', e: '🥑', d: 'Creamy ripe Mexican variety, perfect for guacamole & toasts.', x: 'FRESH', f: true, rating: 4.9 },
      { id: 'g2', n: 'Farm Fresh A2 Desi Cow Milk 1L', p: '95', op: '110', c: 'Dairy', e: '🥛', d: 'Non-homogenized pure glass-bottled milk from grass-fed cows.', x: 'DAILY', f: true, rating: 5.0 },
      { id: 'g3', n: 'Artisanal Sourdough Boule', p: '190', op: '240', c: 'Bakery', e: '🍞', d: 'Naturally fermented 36-hour slow crusty rustic loaf.', x: 'OVEN FRESH', f: true, rating: 4.8 },
      { id: 'g4', n: 'Cold-Pressed Extra Virgin Olive Oil 500ml', p: '650', op: '750', c: 'Pantry', e: '🫒', d: 'First single-estate cold pressing with rich polyphenol content.', x: '-15%', f: false, rating: 4.9 },
      { id: 'g5', n: 'California Jumbo Almonds 500g', p: '480', op: '550', c: 'Dry Fruits', e: '🥜', d: 'Crisp, unpolished, nutrient-dense raw almonds.', x: '', f: false, rating: 4.7 },
      { id: 'g6', n: 'Fresh Hydroponic Strawberries 250g', p: '160', op: '190', c: 'Produce', e: '🍓', d: 'Sweet, pesticide-free greenhouse berries harvested daily.', x: 'SWEET', f: true, rating: 4.8 }
    ]
  },

  Electronics: {
    name: 'Electronics & Gadgets',
    icon: '🎧',
    theme: 'dark-futuristic',
    cur: '₹',
    tag: 'Next-Gen Smart Gear & Tech',
    sub: 'Flagship audio, smart home devices, gaming peripherals, and high-performance computing.',
    contact: '1-Year Official Replacement Warranty on all gadgets. WhatsApp for tech advice.',
    hours: 'Mon - Sun: 10:00 AM - 9:30 PM',
    address: 'Unit 402, Cyber Tower Tech District',
    phone: '+91 97000 88990',
    email: 'support@gearshift.tech',
    hero: {
      title: 'Audio Engineered Beyond Imagination',
      subtitle: 'Experience true wireless spatial sound with 48dB active hybrid noise cancellation.',
      cta: 'Explore Flagships',
      badge: 'NEW GENERATION 2026'
    },
    features: [
      { icon: '🛡️', title: '1-Year Brand Warranty', desc: 'Direct replacement guarantee with doorstep inspection.' },
      { icon: '⚡', title: 'Same Day Dispatch', desc: 'Orders placed before 4 PM ship with air express courier.' },
      { icon: '💳', title: 'No-Cost EMI Options', desc: 'Flexible 0% interest monthly plans across major banks.' }
    ],
    faqs: [
      { q: 'Are all products authentic?', a: 'We are certified direct authorized distributors with serial-number validation.' },
      { q: 'What is the return policy?', a: '7-day replacement for any technical defect or transit issue.' }
    ],
    products: [
      { id: 'e1', n: 'Apex ANC Wireless Headphones', p: '3,999', op: '5,999', c: 'Audio', e: '🎧', d: '40mm titanium drivers, 65h battery life, LDAC high-res audio.', x: 'HOT DEAL', f: true, rating: 4.9 },
      { id: 'e2', n: 'Titan Ultra Smartwatch OLED', p: '4,499', op: '6,499', c: 'Wearables', e: '⌚', d: '1.96-inch sapphire AMOLED, ECG monitor, built-in dual GPS.', x: 'BESTSELLER', f: true, rating: 4.8 },
      { id: 'e3', n: 'MagSafe Wireless Power Bank 10K', p: '1,899', op: '2,499', c: 'Power', e: '🔋', d: '22.5W bidirectional fast charging with foldable kickstand.', x: 'POPULAR', f: true, rating: 4.9 },
      { id: 'e4', n: 'Storm 360 Bluetooth Speaker 40W', p: '2,899', op: '3,899', c: 'Audio', e: '🔊', d: 'IPX7 waterproof with synchronized RGB party lights and deep bass.', x: '', f: false, rating: 4.7 },
      { id: 'e5', n: 'Aero Ergonomic Laptop Stand', p: '1,299', op: '1,799', c: 'Accessories', e: '💻', d: 'Aviation CNC aluminum with 7-level adjustable height and cooling slots.', x: '', f: false, rating: 4.8 },
      { id: 'e6', n: 'Mechanical RGB Hot-Swap Keyboard', p: '3,299', op: '4,299', c: 'Peripherals', e: '⌨️', d: 'Gateron Pro Yellow switches with sound-dampening silicone foam.', x: 'NEW', f: true, rating: 5.0 }
    ]
  },

  Restaurant: {
    name: 'Restaurants & Dining',
    icon: '🍕',
    theme: 'editorial-magazine',
    cur: '₹',
    tag: 'Artisanal Flavours & Fine Dining',
    sub: 'Authentic stone-baked pizzas, slow-cooked pastas, and handcrafted chef specialties.',
    contact: 'Dine-in reservations & takeaway hotline. Tap WhatsApp to order direct.',
    hours: 'Lunch: 12:00 PM - 3:30 PM | Dinner: 7:00 PM - 11:30 PM',
    address: '44 Olive Grove Courtyard, Culinary Lane',
    phone: '+91 98222 33445',
    email: 'reservations@trattoria.in',
    hero: {
      title: 'Crafted with Passion. Served with Soul.',
      subtitle: 'Experience wood-fired sourdough pizzas made with San Marzano tomatoes and fior di latte.',
      cta: 'View Tasting Menu',
      badge: 'CHEF RECOMMENDED'
    },
    features: [
      { icon: '🔥', title: 'Wood-Fired Oven', desc: 'Neapolitan pizzas baked at 450°C in oak wood ovens.' },
      { icon: '🍝', title: 'Handmade Pasta', desc: 'Fresh semolina dough rolled and shaped daily by our chefs.' },
      { icon: '🍷', title: 'Curated Beverages', desc: 'Mocktails, organic sodas, and artisan roasted coffees.' }
    ],
    faqs: [
      { q: 'Do you offer vegan or gluten-free options?', a: 'Yes! We have dedicated gluten-free crusts and delicious dairy-free vegan cheeses.' },
      { q: 'Can I book a private party?', a: 'We host private tables and catering. Contact us via WhatsApp for arrangements.' }
    ],
    products: [
      { id: 'r1', n: 'Truffle Funghi Wood-Fired Pizza', p: '480', op: '550', c: 'Pizza', e: '🍕', d: 'Wild forest mushrooms, white truffle oil, mozzarella, and thyme.', x: 'SIGNATURE', f: true, rating: 5.0 },
      { id: 'r2', n: 'Classic Truffle Tagliatelle', p: '420', op: '480', c: 'Pasta', e: '🍝', d: 'Hand-rolled egg pasta with aged 24-month Parmigiano Reggiano butter.', x: 'CHEF PICK', f: true, rating: 4.9 },
      { id: 'r3', n: 'Burrata Caprese Garden Salad', p: '340', op: '390', c: 'Starters', e: '🥗', d: 'Pugliese creamy burrata, heirloom tomatoes, and aged balsamic glaze.', x: 'FRESH', f: false, rating: 4.8 },
      { id: 'r4', n: 'Smash Wagyu Cheeseburger', p: '380', op: '440', c: 'Mains', e: '🍔', d: 'Double crispy seared patty, caramelized onions, homemade brioche.', x: 'POPULAR', f: true, rating: 4.9 },
      { id: 'r5', n: 'Traditional Espresso Tiramisu', p: '240', op: '280', c: 'Desserts', e: '🍨', d: 'Savoiardi ladyfingers soaked in single-origin roast espresso with mascarpone.', x: 'MUST TRY', f: true, rating: 5.0 },
      { id: 'r6', n: 'Cold-Brew Citrus Nitro Tonic', p: '160', op: '190', c: 'Beverages', e: '☕', d: '18-hour cold brew infused with Mediterranean tonic and orange peel.', x: '', f: false, rating: 4.7 }
    ]
  },

  Bakery: {
    name: 'Bakeries & Patisserie',
    icon: '🥐',
    theme: 'retro-vintage',
    cur: '₹',
    tag: 'Baked Fresh Every Morning at Dawn',
    sub: 'Golden flaky pastries, sourdough loaves, birthday cakes, and European confections.',
    contact: 'Order birthday cakes 24 hours in advance. WhatsApp us for custom designs.',
    hours: 'Tue - Sun: 7:30 AM - 8:30 PM (Closed Mondays)',
    address: '8 Baker Street, Flour & Butter Corner',
    phone: '+91 98333 44556',
    email: 'orders@buttercroissant.com',
    hero: {
      title: 'Golden Crust, Pillowy Soft Crumb',
      subtitle: 'Pure French butter croissants layered with 27 delicate folds and baked to perfection.',
      cta: 'Explore Bakery Menu',
      badge: 'HOT FROM THE OVEN'
    },
    features: [
      { icon: '🧈', title: '100% Pure Butter', desc: 'Zero margarine or palm oil. Only rich European churned butter.' },
      { icon: '🌾', title: 'Slow Fermentation', desc: 'Our sourdough proofs for 48 hours for optimal digestion.' },
      { icon: '🎂', title: 'Custom Celebration Cakes', desc: 'Bespoke layered sponge cakes for birthdays and weddings.' }
    ],
    faqs: [
      { q: 'Are your items eggless?', a: 'Yes, over 80% of our bakery menu is 100% vegetarian / eggless with clear labels.' },
      { q: 'How early should I order birthday cakes?', a: 'Please place custom cake orders at least 24 hours in advance.' }
    ],
    products: [
      { id: 'b1', n: 'French Butter Croissant', p: '120', op: '150', c: 'Pastry', e: '🥐', d: 'Flaky golden honeycomb interior with Normandy butter aroma.', x: 'FAVOURITE', f: true, rating: 4.9 },
      { id: 'b2', n: 'Artisan Country Sourdough Loaf', p: '260', op: '300', c: 'Breads', e: '🍞', d: 'Crispy blistered crust, open crumb, subtle lactic sour tang.', x: 'FRESH', f: true, rating: 5.0 },
      { id: 'b3', n: 'Belgian Dark Chocolate Ganache Cake', p: '750', op: '900', c: 'Cakes', e: '🍰', d: '70% Valrhona dark chocolate sponge layered with silken ganache.', x: 'BESTSELLER', f: true, rating: 4.9 },
      { id: 'b4', n: 'Blueberry Streusel Crumble Muffin', p: '110', op: '140', c: 'Muffins', e: '🧁', d: 'Loaded with wild blueberries and brown sugar cinnamon crumble.', x: '', f: false, rating: 4.8 },
      { id: 'b5', n: 'Caramel Pecan Cinnamon Roll', p: '140', op: '170', c: 'Pastry', e: '🥯', d: 'Warm brioche dough swirled with Ceylon cinnamon and cream cheese frosting.', x: 'SWEET', f: true, rating: 4.9 },
      { id: 'b6', n: 'Crisp Parisian Baguette', p: '130', op: '160', c: 'Breads', e: '🥖', d: 'Classic French stick, ideal for morning sandwiches and garlic bread.', x: '', f: false, rating: 4.7 }
    ]
  },

  Jewellery: {
    name: 'Jewellery & Watches',
    icon: '💍',
    theme: 'luxury-premium',
    cur: '₹',
    tag: 'Precious Jewels & Fine Horology',
    sub: 'Hallmarked gold, certified natural diamonds, sterling silver, and mastercrafted luxury timepieces.',
    contact: 'Every piece certified with IGI/BIS hallmark. WhatsApp for video consultation.',
    hours: 'Mon - Sat: 11:00 AM - 8:30 PM',
    address: '77 Jewel Palace, Diamond Enclave',
    phone: '+91 98444 55667',
    email: 'concierge@aurumfine.com',
    hero: {
      title: 'Crafted for Eternity. Worn for a Lifetime.',
      subtitle: 'Discover our heirloom fine jewellery collection featuring conflict-free certified stones.',
      cta: 'View Fine Collection',
      badge: 'BIS HALLMARKED 916'
    },
    features: [
      { icon: '💎', title: 'Certified Diamonds', desc: 'IGI and GIA certificates with every solitaire purchase.' },
      { icon: '✨', title: '100% Hallmarked Gold', desc: 'Government verified 18K and 22K pure gold standards.' },
      { icon: '🔄', title: 'Lifetime Exchange', desc: 'Guaranteed 100% metal value buyback on all jewellery.' }
    ],
    faqs: [
      { q: 'Is my shipment insured?', a: 'Yes, 100% of all online shipments are fully transit-insured until signed delivery.' },
      { q: 'Can I customize a design?', a: 'Our master goldsmiths can craft bespoke rings and pendants. Message us on WhatsApp.' }
    ],
    products: [
      { id: 'j1', n: '18K Gold Solitaire Ring (0.75ct)', p: '48,999', op: '56,000', c: 'Rings', e: '💍', d: 'VVS1 clarity brilliant cut diamond set in classic 4-prong tapered band.', x: 'CERTIFIED', f: true, rating: 5.0 },
      { id: 'j2', n: 'Emerald Drop Pendant Necklace', p: '18,499', op: '22,000', c: 'Necklaces', e: '📿', d: 'Colombian natural emerald framed with micro-pave diamond halo.', x: 'EXCLUSIVE', f: true, rating: 4.9 },
      { id: 'j3', n: 'Minimalist Automatic Watch 39mm', p: '24,999', op: '29,999', c: 'Watches', e: '⌚', d: 'Japanese automatic movement, sapphire crystal, hand-stitched leather.', x: 'HOROLOGY', f: true, rating: 4.8 },
      { id: 'j4', n: 'South Sea Pearl Drop Earrings', p: '9,899', op: '12,000', c: 'Earrings', e: '✨', d: 'Lustrous 10mm white pearls on 14k yellow gold leverbacks.', x: '', f: false, rating: 4.9 },
      { id: 'j5', n: 'Sterling Silver Cable Cuff', p: '4,299', op: '5,200', c: 'Bracelets', e: '🪙', d: '925 silver with twisted rope motif and black onyx end caps.', x: 'NEW', f: false, rating: 4.7 },
      { id: 'j6', n: 'Rose Gold Diamond Tennis Bracelet', p: '32,999', op: '38,000', c: 'Bracelets', e: '💎', d: '3.0 carats of matching near-colorless diamonds in 14K rose gold.', x: 'LUXURY', f: true, rating: 5.0 }
    ]
  },

  Cosmetics: {
    name: 'Cosmetics & Skincare',
    icon: '💄',
    theme: 'soft-pastel',
    cur: '₹',
    tag: 'Clean Beauty & Dermatological Care',
    sub: 'Cruelty-free botanical skincare, non-comedogenic serums, and radiant beauty essentials.',
    contact: 'Free skin consultation via WhatsApp. Free cosmetic pouch with every ₹1,499 order.',
    hours: 'Mon - Sun: 9:00 AM - 9:00 PM',
    address: 'Studio 18, Glow Beauty Hub, Avenue Central',
    phone: '+91 98555 66778',
    email: 'glow@botanicskincare.com',
    hero: {
      title: 'Radiant Skin Starts with Clean Science',
      subtitle: 'Formulated with clinically active botanicals without parabens, sulfates, or artificial perfumes.',
      cta: 'Find Your Glow',
      badge: '100% CRUELTY-FREE'
    },
    features: [
      { icon: '🌿', title: 'Clean Formulations', desc: 'Free of parabens, mineral oils, phthalates, and harsh sulfates.' },
      { icon: '🐰', title: 'Cruelty-Free Certified', desc: 'PETA-approved and never tested on animals.' },
      { icon: '🧪', title: 'Dermatologist Tested', desc: 'Hypoallergenic formulas proven safe on sensitive skin.' }
    ],
    faqs: [
      { q: 'Is this suitable for acne-prone skin?', a: 'Yes, our serums are non-comedogenic and formulated with calming niacinamide and zinc.' },
      { q: 'How long until I see results?', a: 'Clinical studies show visible barrier improvement in 14 to 21 days of daily use.' }
    ],
    products: [
      { id: 'c1', n: 'Hydra-Plump Hyaluronic Serum 30ml', p: '899', op: '1,199', c: 'Serums', e: '💧', d: 'Triple molecular weight hyaluronic acid with vitamin B5 for deep hydration.', x: 'BESTSELLER', f: true, rating: 4.9 },
      { id: 'c2', n: 'Vitamin C 15% Glow Day Cream', p: '999', op: '1,299', c: 'Moisturizers', e: '🍊', d: 'Stabilized ethyl ascorbic acid with ferulic acid for brightened complexion.', x: '-20%', f: true, rating: 4.8 },
      { id: 'c3', n: 'Velvet Matte Long-Wear Lipstick', p: '649', op: '799', c: 'Makeup', e: '💄', d: '12-hour weightless transfer-proof formula infused with argan oil.', x: 'HOT', f: true, rating: 4.9 },
      { id: 'c4', n: 'Invisible Mineral Sunscreen SPF 50+', p: '799', op: '950', c: 'Sun Care', e: '☀️', d: 'Zero white cast, non-greasy matte finish with PA++++ broad spectrum.', x: 'MUST HAVE', f: true, rating: 4.9 },
      { id: 'c5', n: 'Gentle Oat Calming Cleanser 150ml', p: '599', op: '720', c: 'Cleansers', e: '🧴', d: 'Sulfate-free gel-to-milk formula that dissolves makeup while nourishing.', x: '', f: false, rating: 4.7 },
      { id: 'c6', n: 'Rose Petal Hydrating Facial Mist', p: '450', op: '550', c: 'Toners', e: '🌹', d: 'Pure damask rose water with aloe vera to refresh skin throughout the day.', x: '', f: false, rating: 4.8 }
    ]
  },

  Furniture: {
    name: 'Furniture & Home Decor',
    icon: '🛋️',
    theme: 'minimal-clean',
    cur: '₹',
    tag: 'Crafted Living for Modern Homes',
    sub: 'Solid teakwood pieces, ergonomic lounge seating, minimalist lighting, and handcrafted decor.',
    contact: 'Free room styling consultation. Free white-glove assembly in metro cities.',
    hours: 'Tue - Sun: 10:30 AM - 8:00 PM',
    address: 'Warehouse 9, Woodcraft Boulevard',
    phone: '+91 98666 77889',
    email: 'homes@nordicwood.in',
    hero: {
      title: 'Serene Aesthetics. Solid Teak Craftsmanship.',
      subtitle: 'Designed with minimalist Scandinavian ergonomics and built to last generations.',
      cta: 'Explore Living Catalog',
      badge: 'SOLID TEAKWOOD'
    },
    features: [
      { icon: '🪵', title: 'Sustainable Hardwood', desc: 'FSC-certified seasoned teak, oak, and sheesham.' },
      { icon: '🛠️', title: 'Free White-Glove Setup', desc: 'Our technicians deliver, assemble, and position your furniture.' },
      { icon: '🛡️', title: '5-Year Structural Warranty', desc: 'Guaranteed warranty against termite, joint, or frame issues.' }
    ],
    faqs: [
      { q: 'Can I customize dimensions or upholstery?', a: 'Yes! We offer 40+ fabric swatches and customized dimensions on all made-to-order pieces.' },
      { q: 'What is the delivery timeline?', a: 'In-stock pieces deliver in 3-5 days. Custom orders take 14-21 business days.' }
    ],
    products: [
      { id: 'fu1', n: 'Nordic Oak Coffee Table Minimal', p: '6,499', op: '8,499', c: 'Tables', e: '🪵', d: 'Sculptural organic rounded edge table in solid white oak finish.', x: 'STAFF PICK', f: true, rating: 4.9 },
      { id: 'fu2', n: 'Boucle Swivel Accent Armchair', p: '14,999', op: '18,500', c: 'Seating', e: '🛋️', d: 'Ultra-soft cream textured boucle fabric with high-density foam core.', x: 'TRENDING', f: true, rating: 5.0 },
      { id: 'fu3', n: 'Ceramic Ribbed Arch Floor Lamp', p: '3,899', op: '4,899', c: 'Lighting', e: '💡', d: 'Hand-thrown terracotta ceramic base with textured linen drum shade.', x: '-20%', f: true, rating: 4.8 },
      { id: 'fu4', n: 'Minimalist Pill Wall Mirror 60x120', p: '2,999', op: '3,999', c: 'Decor', e: '🪞', d: 'Brushed champagne gold metal frame with crystal clear HD glass.', x: 'POPULAR', f: false, rating: 4.8 },
      { id: 'fu5', n: 'Hand-Braided Organic Jute Rug 5x7', p: '3,499', op: '4,299', c: 'Rugs', e: '🌾', d: '100% natural biodegradable jute fibers woven by heritage artisans.', x: '', f: false, rating: 4.7 },
      { id: 'fu6', n: 'Solid Sheesham Bookshelf 5-Tier', p: '9,499', op: '12,000', c: 'Storage', e: '📚', d: 'Open architectural shelving with rich honey walnut stain.', x: 'DURABLE', f: true, rating: 4.9 }
    ]
  },

  Footwear: {
    name: 'Footwear & Shoes',
    icon: '👟',
    theme: 'bold-colourful',
    cur: '₹',
    tag: 'Step into Comfort & High Performance',
    sub: 'Performance sneakers, formal Italian leather shoes, casual loafers, and trail boots.',
    contact: 'Free size exchange on all shoes. WhatsApp our shoe specialists for fitting.',
    hours: 'Mon - Sun: 10:00 AM - 9:00 PM',
    address: 'Shoe District Plaza, 3rd Avenue',
    phone: '+91 98777 88990',
    email: 'kicks@solecraft.in',
    hero: {
      title: 'Engineered for Infinite Comfort',
      subtitle: 'Featuring cloud-foam reactive cushioning that propels every step you take.',
      cta: 'Shop Sneakers',
      badge: 'SPRING DROP 2026'
    },
    features: [
      { icon: '☁️', title: 'Cloud Cushion Insole', desc: 'Absorbs 85% of ground impact to prevent foot fatigue.' },
      { icon: '🔄', title: 'Free Size Replacement', desc: 'Not fitting right? We swap sizes at zero extra charge.' },
      { icon: '🛡️', title: 'Anti-Skid Traction', desc: 'Tested grip outsoles built for both wet streets and trails.' }
    ],
    faqs: [
      { q: 'How do your sizes run?', a: 'Our shoes fit true to UK/India sizing. If between sizes, we recommend sizing up.' },
      { q: 'Are these running shoes machine washable?', a: 'We recommend gentle hand wash with a mild sneaker cleaner.' }
    ],
    products: [
      { id: 'fo1', n: 'AeroGlide Carbon Running Shoes', p: '3,299', op: '4,499', c: 'Athletic', e: '👟', d: 'Breathable flyknit mesh with carbon-infused propulsion plate.', x: 'TOP RATED', f: true, rating: 4.9 },
      { id: 'fo2', n: 'Handcrafted Leather Chelsea Boots', p: '4,199', op: '5,499', c: 'Boots', e: '🥾', d: 'Water-resistant pull-up leather with Goodyear welted rubber sole.', x: 'WINTER FAVORITE', f: true, rating: 5.0 },
      { id: 'fo3', n: 'Classic Penny Loafers Burgundy', p: '2,999', op: '3,800', c: 'Formal', e: '👞', d: 'Polished calfskin leather with padded footbed and stacked heel.', x: 'ELEGANT', f: true, rating: 4.8 },
      { id: 'fo4', n: 'Retro Court Low-Top Sneakers', p: '2,199', op: '2,799', c: 'Casual', e: '👟', d: 'Vintage 80s aesthetic in clean white leather with forest green trim.', x: 'NEW', f: false, rating: 4.7 },
      { id: 'fo5', n: 'Comfort Orthotic Slip-On Mules', p: '1,499', op: '1,899', c: 'Casual', e: '👡', d: 'Anatomical cork footbed that molds to your unique foot arch.', x: '', f: false, rating: 4.8 },
      { id: 'fo6', n: 'All-Terrain Waterproof Trail Boot', p: '4,899', op: '6,200', c: 'Outdoors', e: '🥾', d: 'Vibram deep-lug traction outsole with breathable eVent membrane.', x: 'HEAVY DUTY', f: true, rating: 4.9 }
    ]
  },

  Books: {
    name: 'Books & Stationery',
    icon: '📚',
    theme: 'retro-vintage',
    cur: '₹',
    tag: 'Stories, Wisdom & Crafted Stationery',
    sub: 'Bestselling fiction, rare collector editions, fountain pens, and leatherbound journals.',
    contact: 'Special orders for academic & out-of-print titles. WhatsApp our book concierge.',
    hours: 'Mon - Sat: 9:30 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM',
    address: 'Corner Bookshop, 14 Wisdom Lane',
    phone: '+91 98888 99001',
    email: 'curator@bookloverscorner.com',
    hero: {
      title: 'Escape into a Thousand Worlds',
      subtitle: 'Curated titles from celebrated independent presses, Pulitzer winners, and philosophical classics.',
      cta: 'Explore Staff Picks',
      badge: 'BOOK CLUB SELECTION'
    },
    features: [
      { icon: '📖', title: 'First Editions & Imports', desc: 'Hard-to-find international paperbacks and collector hardbounds.' },
      { icon: '🎁', title: 'Gift Wrap & Bookmark', desc: 'Complimentary archival bookmark and book wrap with every order.' },
      { icon: '✒️', title: 'Fine Writing Instruments', desc: 'Tested fountain pens, archival inks, and 120gsm journals.' }
    ],
    faqs: [
      { q: 'Can you source books not listed in your catalogue?', a: 'Yes! Send the ISBN or title on WhatsApp and we will track it down for you.' },
      { q: 'Are your journals fountain-pen friendly?', a: 'All our paper is bleed-proof 100gsm+ paper with minimal feathering.' }
    ],
    products: [
      { id: 'bk1', n: 'Vintage Leatherbound Journal 240p', p: '799', op: '1,100', c: 'Stationery', e: '📔', d: 'Genuine buffalo leather with handmade Deckle-edge cotton rag paper.', x: 'BESTSELLER', f: true, rating: 5.0 },
      { id: 'bk2', n: 'Modern Classic Fiction Boxset 3-Vol', p: '1,299', op: '1,699', c: 'Books', e: '📚', d: 'Clothbound commemorative collector edition with foil stamped spines.', x: 'BOXSET', f: true, rating: 4.9 },
      { id: 'bk3', n: 'Brass Heavyweight Rollerball Pen', p: '899', op: '1,200', c: 'Writing', e: '✒️', d: 'Solid untreated brass that develops a rich natural patina over time.', x: 'HEIRLOOM', f: true, rating: 4.8 },
      { id: 'bk4', n: 'Visual Arts & Architecture Folio', p: '1,999', op: '2,500', c: 'Coffee Table', e: '🎨', d: 'Over 300 pages of high-resolution full-color archival plates.', x: '', f: false, rating: 4.9 },
      { id: 'bk5', n: 'Pastel Sticky Notes & Index Tabs', p: '249', op: '349', c: 'Office', e: '📑', d: 'Set of 8 muted Morandi color palettes with clean residue-free adhesive.', x: '', f: false, rating: 4.6 },
      { id: 'bk6', n: 'Laser-Cut Brass Botanical Bookmarks', p: '399', op: '499', c: 'Gifts', e: '🔖', d: 'Set of 4 intricate Ginkgo and Fern bookmarks with silk tassels.', x: 'GIFT PACK', f: true, rating: 4.9 }
    ]
  },

  Gifts: {
    name: 'Gifts & Hampers',
    icon: '🎁',
    theme: 'playful-animated',
    cur: '₹',
    tag: 'Thoughtful Surprises & Curated Hampers',
    sub: 'Festive gift boxes, hand-poured scented candles, chocolate hampers, and bespoke cards.',
    contact: 'Custom corporate gifting & personalized cards. WhatsApp us with your greetings.',
    hours: 'Mon - Sun: 9:00 AM - 9:00 PM',
    address: 'Gift Boulevard, Suite 5, Celebration Square',
    phone: '+91 98999 00112',
    email: 'hello@gifthamper.in',
    hero: {
      title: 'Make Every Occasion Truly Unforgettable',
      subtitle: 'Artisanal hampers brimming with gourmet treats, keepsake gifts, and handwritten wax-sealed notes.',
      cta: 'View Gift Hampers',
      badge: 'PERSONALIZED PACKAGING'
    },
    features: [
      { icon: '🎀', title: 'Handcrafted Packaging', desc: 'Delivered in rigid keepsake boxes with satin ribbons.' },
      { icon: '💌', title: 'Free Handwritten Note', desc: 'Include your personal greeting card message at zero extra cost.' },
      { icon: '⏰', title: 'Fixed-Date Delivery', desc: 'Schedule deliveries precisely on birthdays and anniversaries.' }
    ],
    faqs: [
      { q: 'Can I add my own customized message?', a: 'Yes! Simply type your message when ordering or send it on WhatsApp.' },
      { q: 'Do you offer bulk corporate pricing?', a: 'Yes, we provide custom branded boxes and volume discounts for 10+ hampers.' }
    ],
    products: [
      { id: 'gi1', n: 'Royal Celebration Gourmet Hamper', p: '1,899', op: '2,499', c: 'Hampers', e: '🎁', d: 'Belgian truffles, spiced nuts, artisan honey, and scented candle.', x: 'POPULAR', f: true, rating: 5.0 },
      { id: 'gi2', n: 'French Lavender & Vanilla Soy Candle', p: '499', op: '650', c: 'Home', e: '🕯️', d: 'Hand-poured 100% natural soy wax with wood wick (45 hr burn time).', x: 'ORGANIC', f: true, rating: 4.9 },
      { id: 'gi3', n: 'Preserved Forever Rose in Glass Dome', p: '1,299', op: '1,699', c: 'Keepsakes', e: '🌹', d: 'Real Ecuadorian rose that stays vibrant for over 3 years without water.', x: 'ROMANTIC', f: true, rating: 4.8 },
      { id: 'gi4', n: 'Personalized Carved Wood Photo Frame', p: '599', op: '799', c: 'Personalized', e: '🖼️', d: 'Solid beechwood frame engraved with names and milestone date.', x: '', f: false, rating: 4.7 },
      { id: 'gi5', n: 'Plush Huggable Giant Teddy Bear 60cm', p: '799', op: '999', c: 'Toys', e: '🧸', d: 'Hypoallergenic cloud-soft velvet plush with satin necktie.', x: '', f: false, rating: 4.8 },
      { id: 'gi6', n: 'Handmade Foil Birthday Greeting Card', p: '99', op: '149', c: 'Cards', e: '💌', d: 'Letterpress printed on 350gsm Italian linen cardstock with gold foil.', x: '', f: false, rating: 4.9 }
    ]
  },

  Pharmacy: {
    name: 'Pharmacy & Wellness',
    icon: '💊',
    theme: 'corporate-professional',
    cur: '₹',
    tag: 'Licensed Healthcare & Pure Wellness',
    sub: 'Doctor-trusted daily vitamins, organic herbal teas, first aid essentials, and diagnostics.',
    contact: 'Upload doctor prescriptions on WhatsApp. Express 1-hour doorstep delivery.',
    hours: '24/7 Hotline for Emergency First Aid Essentials',
    address: '7 Health Boulevard, MediCare Hub',
    phone: '+91 99000 11223',
    email: 'care@purewellness.in',
    hero: {
      title: 'Certified Wellness for Your Entire Family',
      subtitle: 'GMP certified nutritional supplements, organic herbal remedies, and medical essentials.',
      cta: 'Shop Health Essentials',
      badge: 'GMP & FSSAI CERTIFIED'
    },
    features: [
      { icon: '🩺', title: '100% Genuine Medicines', desc: 'Sourced directly from verified pharmaceutical manufacturers.' },
      { icon: '⚡', title: 'Express Emergency Delivery', desc: 'Delivered in sealed tamper-proof packaging within 60 minutes.' },
      { icon: '🌿', title: 'Clean Wellness Brands', desc: 'Third-party lab tested vitamins with zero heavy metal contaminants.' }
    ],
    faqs: [
      { q: 'How do I submit a prescription?', a: 'Simply take a clear photo of your prescription and WhatsApp it to our team.' },
      { q: 'Are health supplements lab tested?', a: 'Every batch undergoes rigorous HPLC potency and purity testing.' }
    ],
    products: [
      { id: 'ph1', n: 'Complete Daily Multivitamin & Minerals 60ct', p: '499', op: '650', c: 'Supplements', e: '💊', d: '24 bioavailable vitamins with zinc, vitamin D3, and antioxidant blend.', x: 'ESSENTIAL', f: true, rating: 4.9 },
      { id: 'ph2', n: 'Pure 100% Whey Protein Isolate 1kg', p: '2,499', op: '3,100', c: 'Fitness', e: '🥤', d: '27g clean protein per scoop with zero added sugars or artificial fillers.', x: '-20%', f: true, rating: 4.8 },
      { id: 'ph3', n: 'Organic Chamomile & Lavender Sleep Tea', p: '299', op: '399', c: 'Herbal', e: '🫖', d: 'Whole chamomile flowers and valerian root for natural restorative sleep.', x: 'CALMING', f: true, rating: 4.9 },
      { id: 'ph4', n: 'Comprehensive Home First Aid Kit 100pc', p: '699', op: '899', c: 'Emergency', e: '🩹', d: 'Antiseptic wipes, sterile bandages, burn gel, surgical tape & shears.', x: 'MUST HAVE', f: true, rating: 5.0 },
      { id: 'ph5', n: 'Digital Infrared Forehead Thermometer', p: '1,199', op: '1,599', c: 'Devices', e: '🌡️', d: '1-second non-contact reading with color fever warning display.', x: '', f: false, rating: 4.7 },
      { id: 'ph6', n: 'Magnesium Glycinate 500mg 90 Veg Capsules', p: '649', op: '850', c: 'Supplements', e: '✨', d: 'Gentle on stomach, supports muscle recovery and calm nervous system.', x: 'POPULAR', f: false, rating: 4.9 }
    ]
  },

  Hardware: {
    name: 'Hardware & Tools',
    icon: '🛠️',
    theme: 'brutalist',
    cur: '₹',
    tag: 'Industrial Grade Tools for Professionals',
    sub: 'Heavy-duty power drills, mechanics toolsets, precision measuring lasers, and safety gear.',
    contact: 'Trade discounts for contractors. WhatsApp for bulk hardware quotes.',
    hours: 'Mon - Sat: 8:00 AM - 8:00 PM',
    address: 'Plot 44, Industrial Estate Phase 2',
    phone: '+91 99111 22334',
    email: 'sales@prohardtools.com',
    hero: {
      title: 'Power to Build. Precision to Last.',
      subtitle: 'Professional brushless power tools backed by a 3-year commercial warranty.',
      cta: 'Explore Power Tools',
      badge: 'INDUSTRIAL GRADE'
    },
    features: [
      { icon: '⚙️', title: 'Heavy Duty Motors', desc: 'Brushless copper windings deliver 30% more torque and longevity.' },
      { icon: '🛡️', title: '3-Year Trade Warranty', desc: 'Direct repair and replacement support at authorized service centers.' },
      { icon: '📦', title: 'Bulk Contractor Quotes', desc: 'Special wholesale rates on electrical, plumbing, and fasteners.' }
    ],
    faqs: [
      { q: 'Do you carry spare battery packs?', a: 'Yes, all our 20V battery packs are interchangeable across our entire tool line.' },
      { q: 'Is delivery available for heavy machinery?', a: 'We operate flatbed transport for heavy generators, compressors, and tablesaws.' }
    ],
    products: [
      { id: 'hw1', n: '20V Brushless Cordless Drill Kit', p: '3,899', op: '5,200', c: 'Power Tools', e: '🪛', d: 'Includes two 2.0Ah lithium batteries, fast charger, and 30-piece bits.', x: 'BESTSELLER', f: true, rating: 4.9 },
      { id: 'hw2', n: 'Master Mechanics Socket Set 120pc', p: '2,999', op: '3,999', c: 'Hand Tools', e: '🔧', d: 'Chrome vanadium steel with 72-tooth reversible ratchets in blow-mold case.', x: 'HEAVY DUTY', f: true, rating: 5.0 },
      { id: 'hw3', n: 'Self-Leveling 360 Laser Cross Level', p: '2,199', op: '2,899', c: 'Measurement', e: '📐', d: 'High-visibility green beam with magnetic bracket and 30m range.', x: 'PRECISE', f: true, rating: 4.8 },
      { id: 'hw4', n: 'Heavy-Duty 8M Metric/Inch Tape Measure', p: '399', op: '550', c: 'Hand Tools', e: '📏', d: 'Impact-resistant rubberized casing with 3.5m standout blade.', x: '', f: false, rating: 4.7 },
      { id: 'hw5', n: 'Electronic Magnetic Stud Finder Multi-Scan', p: '1,299', op: '1,699', c: 'Sensors', e: '🔍', d: 'Detects AC live wires, metal pipes, and wood studs through drywall.', x: '', f: false, rating: 4.6 },
      { id: 'hw6', n: '2000 Lumen Rechargeable Worksite LED Light', p: '1,499', op: '1,999', c: 'Lighting', e: '🔦', d: 'IP65 waterproof with 360 rotating stand and USB power bank output.', x: 'TOUGH', f: true, rating: 4.9 }
    ]
  },

  Sports: {
    name: 'Sports & Fitness',
    icon: '⚽',
    theme: 'bold-colourful',
    cur: '₹',
    tag: 'Fuel Your Performance & Active Lifestyle',
    sub: 'Gym equipment, yoga mats, resistance bands, athletic apparel, and outdoor accessories.',
    contact: 'Equip your home gym today. WhatsApp us for workout gear recommendations.',
    hours: 'Mon - Sun: 7:00 AM - 9:00 PM',
    address: 'Arena Sports Center, 21 Fitness Hub',
    phone: '+91 99222 33445',
    email: 'athletics@peakfit.in',
    hero: {
      title: 'Train Smarter. Push Past Your Limits.',
      subtitle: 'High-durability gym gear engineered to withstand intense daily training.',
      cta: 'Shop Training Gear',
      badge: 'PRO ATHLETE TESTED'
    },
    features: [
      { icon: '🏋️', title: 'Heavy-Duty Cast Iron', desc: 'Precision-weighed gym plates with chip-resistant coating.' },
      { icon: '🧘', title: 'Non-Slip Grips', desc: 'Sweat-resistant textures provide rock-solid grip during PR sets.' },
      { icon: '⚡', title: 'Quick Nationwide Delivery', desc: 'Home gym equipment delivered straight to your workout space.' }
    ],
    faqs: [
      { q: 'Is the yoga mat toxic-free?', a: 'Yes, our mats are crafted from 100% natural tree rubber and TPE, free of PVC and phthalates.' },
      { q: 'Are dumbbells sold as pairs?', a: 'All our dumbbell listings clearly state whether they are sold as single units or pairs.' }
    ],
    products: [
      { id: 'sp1', n: 'Non-Slip Eco Alignment Yoga Mat 6mm', p: '999', op: '1,499', c: 'Yoga', e: '🧘', d: 'Dual-textured high-density TPE with etched laser alignment grid.', x: 'BESTSELLER', f: true, rating: 4.9 },
      { id: 'sp2', n: 'Adjustable Cast Iron Dumbbells 20kg Set', p: '3,499', op: '4,500', c: 'Strength', e: '🏋️', d: 'Two chrome handles, 4 spinlock collars, and 16kg of weight plates.', x: 'HOT DEAL', f: true, rating: 5.0 },
      { id: 'sp3', n: 'Loop Resistance Bands Heavy Duty 5-Pack', p: '649', op: '899', c: 'Accessories', e: '💪', d: 'Natural Malaysian latex bands ranging from 5 lbs up to 40 lbs resistance.', x: 'POPULAR', f: true, rating: 4.8 },
      { id: 'sp4', n: 'Double-Wall Insulated Steel Bottle 1L', p: '799', op: '1,099', c: 'Hydration', e: '🍶', d: 'Keeps drinks icy cold for 24 hours with leakproof chug lid.', x: '', f: false, rating: 4.9 },
      { id: 'sp5', n: 'High-Speed Bearing Jump Rope Cable', p: '349', op: '499', c: 'Cardio', e: '🪢', d: '360 double ball bearing mechanism with tangle-free steel wire.', x: '', f: false, rating: 4.7 },
      { id: 'sp6', n: 'Deep Tissue High-Density Foam Roller', p: '699', op: '950', c: 'Recovery', e: '🎯', d: 'Trigger-point grid matrix releases tight fascia and sore back muscles.', x: 'RECOVERY', f: true, rating: 4.8 }
    ]
  },

  Toys: {
    name: 'Toys & Kids',
    icon: '🧸',
    theme: 'playful-animated',
    cur: '₹',
    tag: 'Imagination, Learning & Endless Smiles',
    sub: 'Montessori wooden toys, STEM robotics, magnetic tiles, huggable plushies, and board games.',
    contact: 'All toys 100% certified non-toxic (EN71/BIS). WhatsApp for age-based picks.',
    hours: 'Mon - Sun: 10:00 AM - 8:30 PM',
    address: 'Wonderland Toy Store, 10 Sunshine Arcade',
    phone: '+91 99333 44556',
    email: 'play@wonderlandtoys.in',
    hero: {
      title: 'Where Playtime Sparks Brilliant Minds',
      subtitle: 'Safe, sustainable, and educational toys designed to inspire creativity without screen fatigue.',
      cta: 'Explore Toyland',
      badge: '100% SAFE & NON-TOXIC'
    },
    features: [
      { icon: '🌿', title: 'Safe Natural Materials', desc: 'Solid sustainably harvested beechwood and water-based paints.' },
      { icon: '🧠', title: 'STEM & Montessori', desc: 'Promotes spatial reasoning, fine motor dexterity, and problem solving.' },
      { icon: '🛡️', title: 'Safety Certified', desc: 'Strict compliance with European EN71 and BIS safety benchmarks.' }
    ],
    faqs: [
      { q: 'What age group is the magnetic tile set for?', a: 'Magnetic tiles are certified safe for ages 3 and above.' },
      { q: 'Are paints saliva-safe for toddlers?', a: 'Yes! All coatings are certified food-grade, lead-free, and water-based.' }
    ],
    products: [
      { id: 'ty1', n: 'Magnetic Tile 3D Building Set 100pc', p: '1,899', op: '2,599', c: 'Building', e: '🏰', d: 'Ultrasonically welded food-grade ABS with strong neodymium magnets.', x: 'BESTSELLER', f: true, rating: 5.0 },
      { id: 'ty2', n: 'Montessori Natural Wooden Blocks 80pc', p: '999', op: '1,399', c: 'Montessori', e: '🧱', d: 'Sanded velvety-smooth beechwood in sturdy storage bucket with shape sorter.', x: 'CLASSIC', f: true, rating: 4.9 },
      { id: 'ty3', n: 'STEM Solar Robot 12-in-1 Kit', p: '1,299', op: '1,799', c: 'STEM', e: '🤖', d: 'Build 12 working robotic models powered purely by sunlight. No batteries needed.', x: 'CREATIVE', f: true, rating: 4.8 },
      { id: 'ty4', n: 'Huggable Velvet Bunny Plush 40cm', p: '649', op: '850', c: 'Plush', e: '🐰', d: 'Extra-soft cloud plush with embroidered eyes safe for newborns.', x: '', f: false, rating: 4.9 },
      { id: 'ty5', n: 'Kids Washable Tempera Art Set 24pc', p: '599', op: '799', c: 'Arts', e: '🎨', d: 'Vibrant washable paints, brushes, and sponges that wash off skin and fabric.', x: '', f: false, rating: 4.7 },
      { id: 'ty6', n: 'No-Pedal Toddler Balance Bike', p: '2,499', op: '3,200', c: 'Outdoors', e: '🚲', d: 'Lightweight carbon steel frame with puncture-proof EVA quiet tires.', x: 'ACTIVE', f: true, rating: 4.9 }
    ]
  },

  HomeAppliances: {
    name: 'Home Appliances',
    icon: '☕',
    theme: 'modern-saas',
    cur: '₹',
    tag: 'Smart Convenience for Modern Living',
    sub: 'Air fryers, cold-press juicers, robot vacuum cleaners, and espresso machines.',
    contact: 'Free demo and installation in metro areas. 2-Year warranty on all compressors & motors.',
    hours: 'Mon - Sun: 9:30 AM - 9:00 PM',
    address: 'Smart Home Plaza, Sector 15 Tech Hub',
    phone: '+91 99444 55667',
    email: 'support@smarthomeapp.com',
    hero: {
      title: 'Effortless Living Powered by Smart Engineering',
      subtitle: 'Energy-saving, intuitive kitchen and home appliances designed for busy households.',
      cta: 'Browse Appliances',
      badge: '2-YEAR HOME WARRANTY'
    },
    features: [
      { icon: '⭐', title: '5-Star Energy Certified', desc: 'Engineered with digital inverter technology to slash electricity bills.' },
      { icon: '🔧', title: 'Free Home Installation', desc: 'Authorized technician setup and tutorial at your doorstep.' },
      { icon: '🛡️', title: '2-Year Full Warranty', desc: 'Doorstep pickup and repair with genuine replacement parts.' }
    ],
    faqs: [
      { q: 'How does the robot vacuum handle carpets?', a: 'It features automatic ultrasonic carpet detection with boost suction up to 4000Pa.' },
      { q: 'Are spare filters available?', a: 'We maintain lifetime stock of HEPA filters and replacement accessories.' }
    ],
    products: [
      { id: 'ap1', n: 'Digital Touch Air Fryer XL 6.0L', p: '4,499', op: '6,499', c: 'Kitchen', e: '🍟', d: '360 Rapid Air circulation cooks crispy snacks with 90% less oil.', x: 'TOP RATED', f: true, rating: 4.9 },
      { id: 'ap2', n: 'Smart LiDAR Robot Vacuum & Mop', p: '14,999', op: '21,000', c: 'Cleaning', e: '🤖', d: 'Precision laser mapping, 4000Pa suction, app scheduling & voice control.', x: 'SMART', f: true, rating: 4.8 },
      { id: 'ap3', n: '15-Bar Italian Espresso Machine', p: '7,999', op: '10,500', c: 'Coffee', e: '☕', d: 'Thermoblock heating with commercial steam wand for silky microfoam.', x: 'BARISTA', f: true, rating: 4.9 },
      { id: 'ap4', n: 'Slow Cold-Press Masticating Juicer', p: '5,299', op: '6,999', c: 'Kitchen', e: '🧃', d: 'Gentle 60 RPM auger extracts 95% juice yield while preserving enzymes.', x: 'HEALTH', f: false, rating: 4.7 },
      { id: 'ap5', n: 'Ultrasonic Silent Room Humidifier 4L', p: '1,899', op: '2,499', c: 'Climate', e: '💨', d: 'Top-fill design with aroma diffuser tray and auto dry shutoff.', x: '', f: false, rating: 4.8 },
      { id: 'ap6', n: 'Fast-Boil Borosilicate Glass Kettle 1.8L', p: '1,199', op: '1,699', c: 'Kitchen', e: '🫖', d: 'Illuminated blue LED ring with 304 food-grade stainless steel heating base.', x: '', f: false, rating: 4.9 }
    ]
  },

  PetSupplies: {
    name: 'Pet Supplies',
    icon: '🐾',
    theme: 'playful-animated',
    cur: '₹',
    tag: 'Pure Love for Your Furry Family',
    sub: 'Grain-free pet nutrition, orthopaedic beds, interactive toys, and grooming essentials.',
    contact: 'Vet-approved nutrition advice on WhatsApp. Free shipping on pet food subscriptions.',
    hours: 'Mon - Sun: 8:00 AM - 9:00 PM',
    address: 'Paws & Whiskers Corner, 23 Happy Pet Lane',
    phone: '+91 99555 66778',
    email: 'care@pawspet.in',
    hero: {
      title: 'Only the Best for Your Four-Legged Companions',
      subtitle: 'Nutrient-rich natural recipes and veterinarian-tested toys that keep tails wagging.',
      cta: 'Shop Pet Care',
      badge: 'VET APPROVED'
    },
    features: [
      { icon: '🥩', title: 'Real Meat Nutrition', desc: 'Zero fillers, wheat, corn, or artificial by-product meals.' },
      { icon: '🦴', title: 'Chew-Proof Durability', desc: 'Toys built from tear-resistant natural rubber and reinforced seams.' },
      { icon: '⚡', title: 'Same Day Pet Food', desc: 'Never run out of kibble with our fast same-day dispatch.' }
    ],
    faqs: [
      { q: 'Is the kibble suitable for puppies?', a: 'We have dedicated age-specific formulations for puppies, adults, and seniors.' },
      { q: 'Can the pet bed cover be washed?', a: 'Yes! The plush cover unzips easily and is 100% machine washable.' }
    ],
    products: [
      { id: 'pt1', n: 'Orthopaedic Memory Foam Pet Bed L', p: '1,899', op: '2,499', c: 'Beds', e: '🛏️', d: 'High-density memory foam base supports dog joints and eases arthritis.', x: 'BESTSELLER', f: true, rating: 4.9 },
      { id: 'pt2', n: 'Grain-Free Salmon & Sweet Potato 3kg', p: '1,499', op: '1,899', c: 'Food', e: '🐟', d: 'Packed with Omega-3 & 6 fatty acids for shiny coat and healthy skin.', x: 'HEALTH', f: true, rating: 5.0 },
      { id: 'pt3', n: 'Automatic Ceramic Pet Water Fountain 2L', p: '1,299', op: '1,799', c: 'Feeding', e: '💧', d: 'Quiet recirculating filtration removes hair and debris, enticing pets to drink.', x: 'SMART', f: true, rating: 4.8 },
      { id: 'pt4', n: 'No-Pull Padded Dog Harness with Handle', p: '799', op: '1,050', c: 'Walking', e: '🦮', d: 'Reflective nylon with breathable air mesh and front chest leash clip.', x: 'POPULAR', f: false, rating: 4.9 },
      { id: 'pt5', n: 'Natural Sisal Cat Scratching Post 70cm', p: '899', op: '1,199', c: 'Cats', e: '🐱', d: 'Weighted wooden base with hanging plush ball protects home furniture.', x: '', f: false, rating: 4.7 },
      { id: 'pt6', n: 'Oatmeal & Aloe Vera Pet Shampoo 400ml', p: '399', op: '520', c: 'Grooming', e: '🧼', d: 'Tearless, pH-balanced formula that moisturizes dry itchy skin.', x: '', f: false, rating: 4.8 }
    ]
  },

  Handicrafts: {
    name: 'Handicrafts & Artisanal',
    icon: '🏺',
    theme: 'organic-natural',
    cur: '₹',
    tag: 'Preserving Heritage Craft Traditions',
    sub: 'Hand-thrown terracotta pottery, brass dokra artifacts, macrame wall hangings, and carved wood.',
    contact: 'Direct fair-trade collaboration with rural artisan clusters. Custom corporate gifts.',
    hours: 'Mon - Sat: 10:00 AM - 7:30 PM',
    address: 'Heritage Craft Village, 12 Artisan Way',
    phone: '+91 99666 77889',
    email: 'craft@heritageartisans.org',
    hero: {
      title: 'Every Piece Carries an Ancient Story',
      subtitle: 'Slow-made by master rural artisans using indigenous natural materials and time-honored techniques.',
      cta: 'Explore Artifacts',
      badge: '100% HANDMADE'
    },
    features: [
      { icon: '🤝', title: 'Fair Trade Guaranteed', desc: '100% fair wages paid directly to rural artisan families.' },
      { icon: '🏺', title: 'Unique & One-of-a-Kind', desc: 'Subtle artisan variations make each piece truly unique.' },
      { icon: '🌿', title: 'Eco-Friendly Materials', desc: 'Terracotta clay, jute, brass, and non-toxic plant dyes.' }
    ],
    faqs: [
      { q: 'Is ceramic pottery microwave and food safe?', a: 'Yes! All tableware ceramics are glazed with food-safe non-toxic lead-free glaze.' },
      { q: 'How do you pack fragile items?', a: 'We use 5-layer corrugated boxes with biodegradable shock-absorbent honeycomb paper.' }
    ],
    products: [
      { id: 'hc1', n: 'Hand-Thrown Speckled Ceramic Coffee Mug', p: '449', op: '599', c: 'Ceramics', e: '☕', d: 'Earthy stoneware with natural exposed clay bottom and comfortable loop handle.', x: 'FAVOURITE', f: true, rating: 5.0 },
      { id: 'hc2', n: 'Bohemian Woven Macrame Wall Hanging', p: '899', op: '1,299', c: 'Decor', e: '🧶', d: 'Hand-knotted with pure unbleached cotton cord on driftwood branch.', x: 'ARTISAN', f: true, rating: 4.9 },
      { id: 'hc3', n: 'Carved Teakwood Decorative Centerpiece Bowl', p: '1,199', op: '1,650', c: 'Woodwork', e: '🪵', d: 'Carved from single block of reclaimed teak with food-grade walnut oil finish.', x: 'HANDCARVED', f: true, rating: 4.8 },
      { id: 'hc4', n: 'Handwoven Bamboo Storage Basket with Lid', p: '649', op: '850', c: 'Eco Living', e: '🧺', d: 'Woven by Assam artisans using natural seasoned cane and wild bamboo.', x: '', f: false, rating: 4.7 },
      { id: 'hc5', n: 'Brass Dokra Tribal Dancing Figurine', p: '1,499', op: '1,999', c: 'Metals', e: '✨', d: 'Lost-wax casting technique perfected over 4,000 years of tribal heritage.', x: 'HERITAGE', f: true, rating: 5.0 },
      { id: 'hc6', n: 'Hand-Embroidered Kantha Linen Cushion Cover', p: '599', op: '799', c: 'Textiles', e: '🪡', d: 'Intricate running stitch embroidery on pure handspun khadi cotton.', x: '', f: false, rating: 4.8 }
    ]
  },

  Automobile: {
    name: 'Automobile Accessories',
    icon: '🚗',
    theme: 'dark-futuristic',
    cur: '₹',
    tag: 'Upgrades for Safer, Smoother Drives',
    sub: 'Dual dash cams, tire inflators, emergency jump starters, magnetic phone mounts, and car care.',
    contact: 'All electronics backed by 1-year replacement warranty. WhatsApp for car compatibility.',
    hours: 'Mon - Sat: 9:00 AM - 8:30 PM',
    address: 'Speedway Hub, Plot 88 Motor Plaza',
    phone: '+91 99777 88990',
    email: 'gear@autoaccessories.in',
    hero: {
      title: 'Precision Upgrades for Every Journey',
      subtitle: 'Equip your vehicle with smart 4K dash cams, digital tire inflators, and emergency packs.',
      cta: 'Explore Auto Gear',
      badge: 'UNIVERSAL FIT'
    },
    features: [
      { icon: '🛡️', title: '1-Year Auto Warranty', desc: 'Direct replacement guarantee on all electrical accessories.' },
      { icon: '🚗', title: 'Universal Fit Guarantee', desc: 'Compatible with all hatchback, sedan, and SUV vehicle models.' },
      { icon: '⚡', title: 'Plug & Play Setup', desc: 'No wire slicing or voided car warranty. 100% plug & play.' }
    ],
    faqs: [
      { q: 'Will the dash cam record while the car is parked?', a: 'Yes, with our included hardwire kit it provides 24-hour G-sensor parking monitoring.' },
      { q: 'How fast does the tire inflator work?', a: 'It inflates a standard R16 car tire from 0 to 35 PSI in under 4 minutes.' }
    ],
    products: [
      { id: 'au1', n: 'Dual 4K Front + 1080P Rear Dash Cam', p: '4,499', op: '6,200', c: 'Electronics', e: '📹', d: 'Sony STARVIS night vision sensor with built-in GPS and Wi-Fi phone app link.', x: 'BESTSELLER', f: true, rating: 4.9 },
      { id: 'au2', n: 'Digital Cordless Tire Inflator 150 PSI', p: '1,999', op: '2,899', c: 'Tools', e: '🛞', d: 'Auto-shutoff once target pressure is reached with bright emergency LED light.', x: 'ESSENTIAL', f: true, rating: 5.0 },
      { id: 'au3', n: 'Portable 12V Car Jump Starter 1200A', p: '2,999', op: '3,999', c: 'Emergency', e: '🔋', d: 'Jumps all gas engines and up to 6.0L diesel with heavy-duty smart clamps.', x: 'HOT DEAL', f: true, rating: 4.8 },
      { id: 'au4', n: 'MagSafe 15W Fast Wireless Car Charger Mount', p: '1,299', op: '1,799', c: 'Interior', e: '📱', d: 'Military-grade vacuum suction and air vent hook with automatic clamping.', x: 'POPULAR', f: true, rating: 4.8 },
      { id: 'au5', n: 'Ergonomic Memory Foam Driver Seat Cushion', p: '1,199', op: '1,599', c: 'Comfort', e: '💺', d: 'Coccyx contour design relieves lower back numbness on long road trips.', x: '', f: false, rating: 4.7 },
      { id: 'au6', n: 'Ultra-Plush Microfiber Detailing Towels 6pc', p: '499', op: '699', c: 'Cleaning', e: '🧼', d: '800 GSM lint-free edgeless microfiber that prevents swirl marks during waxing.', x: '', f: false, rating: 4.9 }
    ]
  },

  Retail: {
    name: 'General Retail & Variety',
    icon: '🏪',
    theme: 'traditional-retail',
    cur: '₹',
    tag: 'Quality Daily Essentials at Wholesale Rates',
    sub: 'Home storage, electronic accessories, kitchenware, thermal mugs, and travel gear.',
    contact: 'Wholesale prices for everyone. Free home delivery on orders over ₹499.',
    hours: 'Mon - Sun: 8:00 AM - 10:00 PM',
    address: 'Grand Bazaar, 100 Main Market Road',
    phone: '+91 99888 99001',
    email: 'care@generalretail.com',
    hero: {
      title: 'Everything You Need Under One Roof',
      subtitle: 'Unbeatable value on trusted home goods, travel gear, and daily lifestyle essentials.',
      cta: 'Shop Deals',
      badge: 'EVERYDAY LOW PRICE'
    },
    features: [
      { icon: '🏷️', title: 'Best Value Guaranteed', desc: 'Direct sourcing guarantees the lowest prices in town.' },
      { icon: '🚚', title: 'Quick Local Delivery', desc: 'Delivered to your doorstep within 24 hours.' },
      { icon: '🔄', title: 'Hassle-Free Returns', desc: 'Easy 7-day return policy on all non-perishable goods.' }
    ],
    faqs: [
      { q: 'Do you offer bulk purchase discounts?', a: 'Yes! Bulk discounts apply automatically on 5+ quantities.' },
      { q: 'Can I pay via UPI on delivery?', a: 'Yes, we accept Cash, UPI, and all Credit/Debit cards upon delivery.' }
    ],
    products: [
      { id: 're1', n: 'Stainless Steel Thermal Tumbler 750ml', p: '599', op: '899', c: 'Home', e: '🥤', d: 'Double wall vacuum insulation with splash-proof sliding lid.', x: 'HOT', f: true, rating: 4.9 },
      { id: 're2', n: 'All-in-One Worldwide Universal Travel Adapter', p: '499', op: '750', c: 'Travel', e: '🔌', d: 'Covers 150+ countries with dual USB-A and 20W Type-C fast charging.', x: 'BESTSELLER', f: true, rating: 4.8 },
      { id: 're3', n: 'Foldable Windproof Automatic Umbrella', p: '449', op: '599', c: 'Accessories', e: '☂️', d: '10-rib reinforced fiberglass canopy with one-touch open and close button.', x: 'NEW', f: false, rating: 4.7 },
      { id: 're4', n: 'Desk LED Lamp with Wireless Phone Charger', p: '1,199', op: '1,699', c: 'Home', e: '💡', d: '3 color temperatures with smooth touch dimming and 10W wireless pad.', x: '-30%', f: true, rating: 4.9 },
      { id: 're5', n: 'Multi-Compartment Travel Cable Organizer', p: '349', op: '499', c: 'Travel', e: '💼', d: 'Waterproof nylon with elastic loops for chargers, SD cards, and powerbanks.', x: '', f: false, rating: 4.6 },
      { id: 're6', n: 'Microfiber Quick-Dry Hair Towel Wrap 2pc', p: '299', op: '450', c: 'Personal Care', e: '🧖', d: 'Super absorbent microfiber cuts hair blow-drying time in half.', x: '', f: false, rating: 4.8 }
    ]
  },

  Services: {
    name: 'Local Services',
    icon: '💆',
    theme: 'corporate-professional',
    cur: '₹',
    tag: 'Professional Experts at Your Service',
    sub: 'Home deep cleaning, portrait photography, therapeutic massage, and interior styling.',
    contact: 'Book appointments instantly on WhatsApp. Verified & certified professionals.',
    hours: 'Mon - Sun: 8:00 AM - 8:00 PM',
    address: 'City Service Center, Level 2, Metro Arcade',
    phone: '+91 99999 00112',
    email: 'book@localservices.in',
    hero: {
      title: 'Trained Professionals Delivered to Your Door',
      subtitle: 'Background-verified experts with transparent pricing and 100% satisfaction guarantee.',
      cta: 'Book an Appointment',
      badge: 'VERIFIED EXPERTS'
    },
    features: [
      { icon: '⭐', title: 'Vetted & Background Checked', desc: 'Every service provider is thoroughly background verified and trained.' },
      { icon: '⏱️', title: 'On-Time Service Guarantee', desc: 'We value your schedule. On time arrival or ₹200 service discount.' },
      { icon: '🛡️', title: 'Service Insurance', desc: 'Up to ₹10,000 damage coverage on all residential cleaning and repairs.' }
    ],
    faqs: [
      { q: 'Can I reschedule an appointment?', a: 'Yes, reschedule for free up to 2 hours before your scheduled time slot.' },
      { q: 'Do providers bring their own equipment?', a: 'Yes, our professionals bring all necessary commercial supplies and equipment.' }
    ],
    products: [
      { id: 'sv1', n: 'Home Deep Cleaning Complete 2BHK/3BHK', p: '2,499', op: '3,500', c: 'Home Care', e: '🧹', d: 'Full kitchen degreasing, bathroom scrubbing, floor buffing & dust removal.', x: 'TOP RATED', f: true, rating: 5.0 },
      { id: 'sv2', n: '60-Min Restorative Deep Tissue Massage', p: '1,499', op: '2,000', c: 'Wellness', e: '💆', d: 'Certified therapist delivers soothing massage with warm herbal oils.', x: 'RELAX', f: true, rating: 4.9 },
      { id: 'sv3', n: 'Outdoor Portrait Photography Session 1h', p: '3,499', op: '4,500', c: 'Creative', e: '📸', d: 'Includes 25 professionally color-graded high-resolution digital photos.', x: 'POPULAR', f: true, rating: 4.9 },
      { id: 'sv4', n: 'Interior Design Consultation 90-Min', p: '1,999', op: '2,800', c: 'Home Styling', e: '📐', d: 'Personalized room color palettes, furniture layout plan & lighting guide.', x: '', f: false, rating: 4.8 },
      { id: 'sv5', n: 'Guitar Lessons Beginner to Pro 4-Classes', p: '1,200', op: '1,600', c: 'Education', e: '🎸', d: 'One-on-one virtual or in-studio lessons with customized song tabs.', x: '', f: false, rating: 4.9 },
      { id: 'sv6', n: 'Balcony Garden Makeover & Plant Care', p: '1,799', op: '2,400', c: 'Gardening', e: '🌱', d: 'Soil conditioning, repotting, pest control, and selection of 5 air-purifying plants.', x: 'GREEN', f: true, rating: 4.8 }
    ]
  },

  Custom: {
    name: 'Custom / Blank Business',
    icon: '✨',
    theme: 'modern-saas',
    cur: '₹',
    tag: 'Create Your Dream Online Store',
    sub: 'Customize products, layouts, colors, and banners to match your unique brand identity.',
    contact: 'Call or WhatsApp us to place an order or inquire about our offerings.',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    address: 'Your Shop Address, City, Country',
    phone: '+91 90000 00000',
    email: 'info@yourbrand.com',
    hero: {
      title: 'Crafted with Passion & Precision',
      subtitle: 'Browse our complete catalogue of premium offerings and enjoy seamless ordering.',
      cta: 'Explore Products',
      badge: 'WELCOME'
    },
    features: [
      { icon: '⭐', title: 'Premium Quality', desc: 'Crafted with the highest attention to detail and customer care.' },
      { icon: '🚀', title: 'Fast Delivery', desc: 'Reliable dispatch and transparent tracking on every single order.' },
      { icon: '💬', title: 'Dedicated Support', desc: 'We are here to assist with all your questions and inquiries.' }
    ],
    faqs: [
      { q: 'How can I place an order?', a: 'Add items to your cart and click WhatsApp Order or Call Us to complete your request.' },
      { q: 'What payment options do you support?', a: 'We accept UPI, Net Banking, Cards, and Cash on Delivery.' }
    ],
    products: [
      { id: 'cu1', n: 'Signature Featured Item', p: '999', op: '1,299', c: 'Featured', e: '⭐', d: 'Our most popular offering, crafted with care and loved by customers.', x: 'SIGNATURE', f: true, rating: 5.0 },
      { id: 'cu2', n: 'Premium Starter Pack', p: '1,499', op: '1,999', c: 'Packages', e: '📦', d: 'Everything you need to get started with our products in one bundle.', x: 'POPULAR', f: true, rating: 4.9 },
      { id: 'cu3', n: 'Classic Choice Item', p: '699', op: '899', c: 'Standard', e: '🛍️', d: 'A dependable daily favorite designed for long-lasting satisfaction.', x: 'NEW', f: false, rating: 4.8 }
    ]
  }
};
