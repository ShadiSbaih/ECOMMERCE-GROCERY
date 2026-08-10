import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import Category from "./models/category.model.js";
import Product from "./models/product.model.js";

dotenv.config();

const sampleCategories = [
  { name: "Fruits", image: "fruits.webp" },
  { name: "Vegetables", image: "vegetable.webp" },
  { name: "Dry Fruits", image: "dry_fruit.webp" },
  { name: "Fresh Juices", image: "juice.webp" },
  { name: "Spices", image: "spices.webp" },
  { name: "Rice", image: "rice.webp" },
  { name: "Eggs", image: "eggs.webp" },
  { name: "Flakes", image: "flakes.webp" },
  { name: "Organic Produce", image: "organic_vegetables.webp" }
];

const sampleProducts = [
  // --- FRUITS (15 items) ---
  {
    name: "Organic Hass Avocados",
    price: 5.99,
    offerPrice: 4.49,
    smallDesc: "Creamy, nutrient-rich 100% organic Hass avocados.",
    longDesc: "Hand-picked from certified sustainable organic orchards. These ripe Hass avocados are rich in potassium, healthy monounsaturated fats, and essential vitamins.",
    weight: "2 Pack (approx 400g)",
    categoryName: "Fruits",
    images: ["organic_avocado.png"]
  },
  {
    name: "Fresh Organic Strawberries",
    price: 6.99,
    offerPrice: 5.29,
    smallDesc: "Sweet, juicy pesticide-free fresh farm organic strawberries.",
    longDesc: "Vibrant red berries grown naturally under full sunshine without synthetic fertilizers. Rich in antioxidants and vitamin C.",
    weight: "400g Clamshell",
    categoryName: "Fruits",
    images: ["organic_strawberries.png"]
  },
  {
    name: "Crisp Royal Gala Apples",
    price: 3.99,
    offerPrice: 2.99,
    smallDesc: "Sweet, crunchy orchard-fresh Gala apples.",
    longDesc: "Crisp and refreshing apples harvested at peak ripeness. Perfect for daily snacking, baking, or fresh fruit salads.",
    weight: "1 kg (approx 6 pcs)",
    categoryName: "Fruits",
    images: ["gala_apples.png"]
  },
  {
    name: "Organic Cavendish Bananas",
    price: 2.49,
    offerPrice: 1.79,
    smallDesc: "Naturally sweet and rich in potassium.",
    longDesc: "Ethically sourced organic bananas, perfect for breakfast cereal, morning smoothies, or healthy power snacks.",
    weight: "1 Bunch (approx 1 kg)",
    categoryName: "Fruits",
    images: ["cavendish_bananas.png"]
  },
  {
    name: "Golden Alphonso Mangoes",
    price: 8.99,
    offerPrice: 6.99,
    smallDesc: "King of mangoes with rich aromatic sweet nectar.",
    longDesc: "Hand-harvested premium Alphonso mangoes known for their silky texture, intense sweetness, and heavenly aroma.",
    weight: "1 kg Box",
    categoryName: "Fruits",
    images: ["alphonso_mangoes.png"]
  },
  {
    name: "Fresh Blackberries",
    price: 4.99,
    offerPrice: 3.99,
    smallDesc: "Plump, juicy berries packed with antioxidants.",
    longDesc: "Wild-harvested fresh blackberries with a perfect sweet-tart balance. Excellent for baking, desserts, or snacking.",
    weight: "250g Pack",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Juicy Navel Oranges",
    price: 4.50,
    offerPrice: 3.20,
    smallDesc: "Seedless, bursting with refreshing citrus juice.",
    longDesc: "Sun-ripened Florida navel oranges, full of vitamin C and immune-boosting natural sweetness.",
    weight: "1.5 kg Net Bag",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Organic Blueberries",
    price: 5.99,
    offerPrice: 4.49,
    smallDesc: "Sweet superfood berries for healthy breakfast bowls.",
    longDesc: "Organically grown blueberries packed with anthocyanins, dietary fiber, and essential minerals.",
    weight: "300g Clamshell",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Sweet Seedless Watermelon",
    price: 6.50,
    offerPrice: 4.99,
    smallDesc: "Ultra-hydrating sweet red watermelon.",
    longDesc: "Fresh farm watermelon with crisp, juicy red flesh. Ideal for summer cooling and fruit platters.",
    weight: "1 Whole (approx 3 kg)",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Honey Crisp Pears",
    price: 3.80,
    offerPrice: 2.90,
    smallDesc: "Tender, juicy pears with subtle honey undertones.",
    longDesc: "Locally grown pears with a soft texture and delicate natural sweetness. Great paired with cheese or eaten raw.",
    weight: "1 kg",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Organic Red Seedless Grapes",
    price: 4.99,
    offerPrice: 3.79,
    smallDesc: "Crisp and sweet organic red table grapes.",
    longDesc: "Vine-ripened red grapes cultivated without synthetic sprays. High in resveratrol and dietary fiber.",
    weight: "500g Pack",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Fresh Sweet Pineapple",
    price: 4.20,
    offerPrice: 3.10,
    smallDesc: "Tropical golden pineapple with vibrant flavor.",
    longDesc: "Ripe golden pineapple with a juicy, sweet flavor profile. Rich in bromelain digestive enzymes.",
    weight: "1 Whole (approx 1.2 kg)",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Fresh Pomegranate",
    price: 5.00,
    offerPrice: 3.80,
    smallDesc: "Ruby red arils bursting with polyphenol antioxidants.",
    longDesc: "Hand-selected fresh pomegranates filled with crunchy, tart-sweet juicy seeds.",
    weight: "2 Large Pcs",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Organic Kiwi Fruit",
    price: 3.50,
    offerPrice: 2.50,
    smallDesc: "Zesty green kiwis packed with vitamin C.",
    longDesc: "Nutrient-dense green kiwifruits grown organically. Supercharged with dietary fiber and digestive support.",
    weight: "500g Pack",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },
  {
    name: "Fresh Green Figs",
    price: 6.20,
    offerPrice: 4.80,
    smallDesc: "Soft, sweet honey-flavored fresh figs.",
    longDesc: "Delicate heirloom figs with a lush, jammy center. Perfect for charcuterie boards and gourmet appetizers.",
    weight: "350g Pack",
    categoryName: "Fruits",
    images: ["fruits.webp"]
  },

  // --- VEGETABLES (20 items) ---
  {
    name: "Fresh Organic Broccoli",
    price: 6.99,
    offerPrice: 5.50,
    smallDesc: "Crisp green organic broccoli crowns packed with nutrients.",
    longDesc: "Locally harvested organic broccoli heads, rich in sulforaphane, fiber, and iron. Perfectly tender when steamed or roasted.",
    weight: "400g",
    categoryName: "Vegetables",
    images: ["organic_broccoli1.webp", "organic_broccoli2.webp"]
  },
  {
    name: "Sweet Corn",
    price: 3.99,
    offerPrice: 2.99,
    smallDesc: "Golden sweet organic corn ears, non-GMO verified.",
    longDesc: "Naturally sweet and crunchy organic corn, harvested at peak ripeness. Great for grilling, boiling, or adding to summer salads.",
    weight: "500g (4 Ears)",
    categoryName: "Vegetables",
    images: ["corn1.webp", "corn2.webp"]
  },
  {
    name: "Fresh Garlic",
    price: 4.50,
    offerPrice: 3.50,
    smallDesc: "Aromatic non-GMO organic garlic bulbs.",
    longDesc: "Full-flavored heirloom organic garlic bulbs with high allicin content. Enhances any culinary dish naturally.",
    weight: "250g Mesh Bag",
    categoryName: "Vegetables",
    images: ["garlic1.webp", "garlic2.webp"]
  },
  {
    name: "Bottle Gourd",
    price: 2.50,
    offerPrice: 1.99,
    smallDesc: "Light and refreshing hydration-rich vegetable.",
    longDesc: "Farm fresh organic bottle gourd, rich in water content and essential minerals for healthy digestion.",
    weight: "1 kg",
    categoryName: "Vegetables",
    images: ["gourd1.webp", "gourd2.webp"]
  },
  {
    name: "Button Mushrooms",
    price: 5.99,
    offerPrice: 4.50,
    smallDesc: "Plump white mushrooms perfect for stir-fry & pizza.",
    longDesc: "Farm-fresh white button mushrooms with firm texture and earthy flavor. Great source of B vitamins and selenium.",
    weight: "200g Pack",
    categoryName: "Vegetables",
    images: ["mushrooms1.webp", "mushrooms2.webp"]
  },
  {
    name: "Green Peas",
    price: 3.99,
    offerPrice: 2.99,
    smallDesc: "Sweet, tender green peas rich in plant protein.",
    longDesc: "Freshly picked organic green peas in pods, packed with vitamins K, C, and plant-based protein.",
    weight: "500g",
    categoryName: "Vegetables",
    images: ["peas1.webp", "pease2.webp"]
  },
  {
    name: "Fresh Farm Potatoes",
    price: 2.99,
    offerPrice: 1.99,
    smallDesc: "High-quality versatile kitchen staple potatoes.",
    longDesc: "High-quality farm fresh potatoes. Ideal for baking, frying, mashing, and traditional home-cooked curries.",
    weight: "2 kg Bag",
    categoryName: "Vegetables",
    images: ["potatos1.webp", "potatos2.webp"]
  },
  {
    name: "Organic Pumpkin",
    price: 4.50,
    offerPrice: 3.50,
    smallDesc: "Golden orange pumpkin rich in beta carotene.",
    longDesc: "Fresh organic pumpkin, great for creamy autumn soups, pies, roasting, and savory curries.",
    weight: "1 kg Slice",
    categoryName: "Vegetables",
    images: ["pumpkin1.webp", "pumpkin2.webp"]
  },
  {
    name: "Red Cabbage",
    price: 5.50,
    offerPrice: 4.50,
    smallDesc: "Crunchy and colorful purple-red cabbage head.",
    longDesc: "Farm fresh red cabbage packed with anthocyanins and vitamin C. Its vibrant purple-red leaves add crunch and nutrition to salads.",
    weight: "1 kg Head",
    categoryName: "Vegetables",
    images: ["red_cabbage1.webp", "red_cabbage2.webp"]
  },
  {
    name: "Fresh Crisp Carrots",
    price: 2.49,
    offerPrice: 1.89,
    smallDesc: "Sweet, crunchy carrots rich in Vitamin A.",
    longDesc: "Farm-harvested orange carrots, crisp and naturally sweet. Excellent for fresh salads, juices, and roasting.",
    weight: "1 kg Net Bag",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Baby Spinach Leaves",
    price: 3.20,
    offerPrice: 2.40,
    smallDesc: "Pre-washed tender organic baby spinach.",
    longDesc: "Nutrient-dense tender baby spinach leaves loaded with iron, folate, and vitamins A and C.",
    weight: "250g Clamshell",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Vine-Ripened Red Tomatoes",
    price: 3.75,
    offerPrice: 2.75,
    smallDesc: "Juicy, aromatic tomatoes ripened naturally on the vine.",
    longDesc: "Plump red tomatoes packed with lycopene antioxidant. Essential for fresh sauces, caprese salads, and cooking.",
    weight: "1 kg",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Crisp Romaine Lettuce",
    price: 2.99,
    offerPrice: 2.19,
    smallDesc: "Fresh, crunchy romaine heart heads for Caesar salads.",
    longDesc: "Hydrating, crisp green romaine lettuce heads harvested daily for maximum freshness.",
    weight: "3 Hearts Pack",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Organic Bell Peppers Mix",
    price: 4.99,
    offerPrice: 3.99,
    smallDesc: "Trio of red, yellow, and green sweet bell peppers.",
    longDesc: "Vibrant sweet peppers packed with colorful antioxidants, perfect for fajitas, roasting, or raw snacks.",
    weight: "3 Pack",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Fresh English Cucumbers",
    price: 2.20,
    offerPrice: 1.60,
    smallDesc: "Thin-skinned, seedless crisp green cucumbers.",
    longDesc: "Cooling and refreshing cucumbers with delicate sweet flavor. Ideal for tzatziki, salads, and cucumber water.",
    weight: "2 Pcs",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Red Globe Onions",
    price: 2.80,
    offerPrice: 1.99,
    smallDesc: "Pungent, flavorful cooking staple red onions.",
    longDesc: "Firm red onions with bold savory aroma. Essential base for savory curries, soups, and raw burger toppings.",
    weight: "1.5 kg Net Bag",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Fresh Green Zucchini",
    price: 3.10,
    offerPrice: 2.30,
    smallDesc: "Tender summer squash ideal for grilling and zoodles.",
    longDesc: "Low-calorie tender green zucchini squash. Great for spiralizing into zoodles, roasting, or baking.",
    weight: "750g Pack",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Organic White Cauliflower",
    price: 4.20,
    offerPrice: 3.20,
    smallDesc: "Compact, creamy white cauliflower head.",
    longDesc: "Versatile low-carb cauliflower head perfect for cauliflower rice, roasting, or creamy soups.",
    weight: "1 Whole Head",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Fresh Beetroots",
    price: 2.90,
    offerPrice: 2.10,
    smallDesc: "Earthy deep-red beetroots rich in nitrates.",
    longDesc: "Nutrient-packed deep red beetroots that promote healthy blood flow. Perfect for roasting, pickling, or juicing.",
    weight: "1 kg",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },
  {
    name: "Organic Purple Eggplants",
    price: 3.60,
    offerPrice: 2.70,
    smallDesc: "Glossy, tender eggplants for ratatouille & grilling.",
    longDesc: "Silky-textured purple eggplants that absorb garlic and olive oil flavors beautifully.",
    weight: "800g",
    categoryName: "Vegetables",
    images: ["vegetable.webp"]
  },

  // --- DRY FRUITS (15 items) ---
  {
    name: "Organic Cashews",
    price: 15.99,
    offerPrice: 12.99,
    smallDesc: "Crunchy and healthy raw jumbo cashews.",
    longDesc: "Premium jumbo organic cashews. Great source of plant protein, magnesium, and essential copper.",
    weight: "250g Pack",
    categoryName: "Dry Fruits",
    images: ["cashews1.webp", "cashews2.webp"]
  },
  {
    name: "Sun-Dried Raisins",
    price: 8.99,
    offerPrice: 7.50,
    smallDesc: "Sweet, chewy natural dried grapes.",
    longDesc: "Premium quality golden brown raisins packed with natural sweetness, quick energy, and dietary iron.",
    weight: "250g Pack",
    categoryName: "Dry Fruits",
    images: ["raisins1.webp", "raisins2.webp"]
  },
  {
    name: "California Roasted Almonds",
    price: 14.50,
    offerPrice: 11.99,
    smallDesc: "Lightly salted oven-roasted California almonds.",
    longDesc: "Crunchy premium almonds loaded with vitamin E, healthy fats, and protein. Perfect daily brain food.",
    weight: "400g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Jumbo Medjool Dates",
    price: 11.00,
    offerPrice: 8.50,
    smallDesc: "Soft, caramel-like organic Medjool dates.",
    longDesc: "Naturally sweet jumbo dates known as the king of dates. Rich in potassium, fiber, and quick energy.",
    weight: "500g Box",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Organic Raw Walnuts",
    price: 13.20,
    offerPrice: 10.40,
    smallDesc: "Brain-boosting halves rich in Omega-3 fatty acids.",
    longDesc: "Crisp raw walnut halves packed with plant-based Omega-3 ALA, antioxidants, and minerals.",
    weight: "300g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Roasted Shell Pistachios",
    price: 15.99,
    offerPrice: 12.99,
    smallDesc: "Lightly salted in-shell roasted pistachios.",
    longDesc: "Premium open-shell roasted pistachios. Fun to shell and packed with lutein, zeaxanthin, and protein.",
    weight: "350g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Organic Dried Figs",
    price: 9.50,
    offerPrice: 7.80,
    smallDesc: "Naturally sweet stringed sun-dried figs.",
    longDesc: "Fiber-rich dried figs with soft chewy texture and natural honey sweetness. Excellent for digestive wellness.",
    weight: "400g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Raw Hazelnut Kernels",
    price: 12.50,
    offerPrice: 9.90,
    smallDesc: "Skinless raw hazelnuts for snacking and praline.",
    longDesc: "Crisp whole hazelnuts packed with healthy fats, folate, and rich nutty aroma.",
    weight: "300g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Organic Dried Apricots",
    price: 8.80,
    offerPrice: 6.90,
    smallDesc: "Unsulfured, moist sun-dried Turkish apricots.",
    longDesc: "Naturally dark unsulfured apricots packed with beta carotene, potassium, and rich fruity flavor.",
    weight: "350g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Sweet Dried Cranberries",
    price: 7.50,
    offerPrice: 5.80,
    smallDesc: "Tart-sweet dried cranberries for salad toppings.",
    longDesc: "Plump dried cranberries infused with natural fruit juice. Great for baking, oatmeal, and trail mixes.",
    weight: "250g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Whole Brazil Nuts",
    price: 16.99,
    offerPrice: 13.50,
    smallDesc: "Selenium powerhouse raw Amazonian Brazil nuts.",
    longDesc: "Rich, buttery raw Brazil nuts. Just two nuts a day provide your recommended daily selenium requirement.",
    weight: "300g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Roasted Macadamia Nuts",
    price: 18.50,
    offerPrice: 14.99,
    smallDesc: "Ultra-creamy Hawaiian style roasted macadamias.",
    longDesc: "Luxury macadamia nuts with smooth, rich texture and buttery taste. Lightly sea-salted.",
    weight: "200g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Dried Goji Berries",
    price: 10.20,
    offerPrice: 8.10,
    smallDesc: "Antioxidant superberry for teas and smoothies.",
    longDesc: "Traditional Himalayan dried goji berries rich in zeaxanthin, vitamin A, and immune-supporting compounds.",
    weight: "250g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Toasted Coconut Chips",
    price: 4.99,
    offerPrice: 3.79,
    smallDesc: "Crispy roasted coconut slices with sea salt.",
    longDesc: "Crunchy toasted coconut flakes sweetened with a hint of coconut sugar and sea salt.",
    weight: "150g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },
  {
    name: "Raw Pine Nuts (Pignoli)",
    price: 19.99,
    offerPrice: 16.50,
    smallDesc: "Delicate, buttery pine nuts for traditional pesto.",
    longDesc: "Wild harvested raw pine nuts with soft texture and aromatic pine resin note. Essential for homemade pesto.",
    weight: "150g Pack",
    categoryName: "Dry Fruits",
    images: ["dry_fruit.webp"]
  },

  // --- FRESH JUICES (12 items) ---
  {
    name: "Cold Pressed Orange Juice",
    price: 5.99,
    offerPrice: 4.49,
    smallDesc: "100% pure cold-pressed Valencia orange juice.",
    longDesc: "Never heated or pasteurized with additives. Pure liquid sunshine packed with natural vitamin C.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Green Detox Apple Cucumber Juice",
    price: 6.50,
    offerPrice: 4.99,
    smallDesc: "Revitalizing green juice with spinach and lemon.",
    longDesc: "Hydrating cold-pressed elixir featuring green apple, cucumber, celery, spinach, and a touch of lemon.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Organic Pomegranate Juice",
    price: 6.99,
    offerPrice: 5.49,
    smallDesc: "Tart, rich 100% pure cold-pressed pomegranate.",
    longDesc: "Antioxidant powerhouse squeezed directly from fresh whole organic pomegranates.",
    weight: "400ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Watermelon Mint Lemonade",
    price: 4.99,
    offerPrice: 3.79,
    smallDesc: "Ultra-refreshing summer melon cooler.",
    longDesc: "Freshly blended red watermelon juice infused with crushed mint leaves and freshly squeezed lime.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Beetroot Carrot Ginger Juice",
    price: 5.80,
    offerPrice: 4.30,
    smallDesc: "Stamina-boosting root vegetable cold-pressed juice.",
    longDesc: "Earthy deep red juice featuring red beet, sweet orange carrot, and spicy fresh ginger root.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Fresh Honey Lemonade",
    price: 4.20,
    offerPrice: 3.20,
    smallDesc: "Artisanal lemon juice sweetened with raw honey.",
    longDesc: "Hand-squeezed yellow lemons blended with pure raw wildflower honey and spring water.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Mango Passionfruit Smoothie",
    price: 6.20,
    offerPrice: 4.80,
    smallDesc: "Tropical thick fruit blend with coconut water.",
    longDesc: "Luscious mango puree blended with tangy passionfruit seeds and hydrating coconut water.",
    weight: "450ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Organic Aloe Vera Cooler",
    price: 5.49,
    offerPrice: 4.19,
    smallDesc: "Soothing aloe vera inner leaf juice with green grape.",
    longDesc: "Clean, soothing beverage containing pure organic aloe vera pulp and natural white grape juice.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Pure Cold Pressed Celery Juice",
    price: 5.99,
    offerPrice: 4.49,
    smallDesc: "100% organic straight celery juice for morning wellness.",
    longDesc: "Raw, unpasteurized cold-pressed celery juice designed to support digestion and morning hydration.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Pineapple Mint Elixir",
    price: 4.80,
    offerPrice: 3.60,
    smallDesc: "Zesty tropical pineapple juice with spearmint.",
    longDesc: "Sweet golden pineapple juice blended with cool spearmint leaves for a digestive kick.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Pink Guava Nectar",
    price: 5.20,
    offerPrice: 3.90,
    smallDesc: "Aromatic pink guava pulp with subtle citrus.",
    longDesc: "Rich and fragrant pink guava drink loaded with vitamin C and tropical fruity flavor.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },
  {
    name: "Grapefruit Citrus Flush",
    price: 5.50,
    offerPrice: 4.10,
    smallDesc: "Tangy ruby red grapefruit juice.",
    longDesc: "Cold-pressed ruby red grapefruit with a crisp bitter-sweet citrus finish.",
    weight: "500ml Bottle",
    categoryName: "Fresh Juices",
    images: ["juice.webp"]
  },

  // --- SPICES (15 items) ---
  {
    name: "Organic Turmeric Powder",
    price: 4.99,
    offerPrice: 3.79,
    smallDesc: "Vibrant yellow golden turmeric with high curcumin.",
    longDesc: "Organically grown turmeric root ground into a fine aromatic powder. High curcumin content for golden milk and curries.",
    weight: "200g Pouch",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Ceylon Cinnamon Sticks",
    price: 5.50,
    offerPrice: 4.20,
    smallDesc: "True Ceylon cinnamon quills with delicate sweet aroma.",
    longDesc: "Authentic thin-bark Ceylon cinnamon sticks, naturally low in coumarin. Ideal for spicing teas and stews.",
    weight: "100g Jar",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Whole Black Peppercorns",
    price: 6.20,
    offerPrice: 4.80,
    smallDesc: "Bold Malabar black pepper for fresh grinding.",
    longDesc: "Sun-dried whole black peppercorns delivering pungent heat and essential piperine.",
    weight: "200g Jar",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Ground Cumin Seeds",
    price: 3.99,
    offerPrice: 2.99,
    smallDesc: "Earthy, aromatic ground cumin for Tex-Mex & Indian dishes.",
    longDesc: "Freshly roasted and finely ground cumin seeds providing warm, nutty flavor notes.",
    weight: "150g Pouch",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Green Cardamom Pods",
    price: 8.50,
    offerPrice: 6.80,
    smallDesc: "Fragrant green cardamom pods for chai and desserts.",
    longDesc: "Hand-harvested jumbo green cardamom pods with intense menthol-sweet citrus notes.",
    weight: "100g Jar",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Smoked Paprika Powder",
    price: 4.50,
    offerPrice: 3.40,
    smallDesc: "Spanish oak-smoked sweet red pimentón.",
    longDesc: "Authentic oak-smoked red pepper powder adding deep reddish color and smoky savory depth.",
    weight: "150g Tin",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Whole Cloves",
    price: 6.99,
    offerPrice: 5.29,
    smallDesc: "Intense aromatic clove buds for roasts and chai.",
    longDesc: "Hand-picked whole clove flower buds packed with essential eugenol oil.",
    weight: "100g Jar",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Dried Mediterranean Oregano",
    price: 3.20,
    offerPrice: 2.40,
    smallDesc: "Sun-dried wild oregano leaves for pizzas and pasta.",
    longDesc: "Aromatic dried oregano harvested from Mediterranean hillsides, rich in thymol flavor.",
    weight: "80g Jar",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Garam Masala Spice Mix",
    price: 5.20,
    offerPrice: 3.90,
    smallDesc: "Traditional roasted Indian aromatic spice blend.",
    longDesc: "Handcrafted warm spice blend featuring cardamom, cinnamon, cloves, cumin, and coriander.",
    weight: "150g Pouch",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Crushed Red Chili Flakes",
    price: 3.80,
    offerPrice: 2.80,
    smallDesc: "Fiery red pepper flakes with seeds.",
    longDesc: "Spicy crushed sun-dried red chili peppers. Perfect sprinkle for pizza, pasta, and stir-fries.",
    weight: "120g Shaker",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Whole Nutmeg Nuts",
    price: 7.40,
    offerPrice: 5.90,
    smallDesc: "Whole aromatic nutmeg seeds with grater.",
    longDesc: "Whole fresh nutmegs ready for microplane grating over béchamel, eggnog, and spiced desserts.",
    weight: "100g Jar",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Ground Ginger Powder",
    price: 4.10,
    offerPrice: 3.10,
    smallDesc: "Warm, zesty ground dried ginger root.",
    longDesc: "Pungent dried ginger root ground fine for gingerbread cookies, marinades, and spiced teas.",
    weight: "150g Pouch",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Organic Coriander Seeds",
    price: 3.49,
    offerPrice: 2.59,
    smallDesc: "Citrusy whole dried coriander seeds.",
    longDesc: "Aromatic whole coriander seeds with subtle lemon and sage notes when lightly toasted.",
    weight: "200g Pouch",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Himalayan Pink Salt Fine",
    price: 3.99,
    offerPrice: 2.99,
    smallDesc: "Unrefined mineral-rich pink crystal rock salt.",
    longDesc: "Pure ancient Himalayan pink sea salt containing 84 natural trace minerals.",
    weight: "500g Pouch",
    categoryName: "Spices",
    images: ["spices.webp"]
  },
  {
    name: "Spanish Saffron Threads",
    price: 19.99,
    offerPrice: 15.99,
    smallDesc: "Grade A Coupe Spanish red saffron stigmas.",
    longDesc: "Hand-harvested red saffron threads providing vivid golden color and luxurious aroma to paella and risottos.",
    weight: "1g Tin",
    categoryName: "Spices",
    images: ["spices.webp"]
  },

  // --- RICE & GRAINS (12 items) ---
  {
    name: "Aged Organic Basmati Rice",
    price: 14.99,
    offerPrice: 11.99,
    smallDesc: "Extra-long grain aromatic aged Basmati rice.",
    longDesc: "Naturally aged for 24 months at Himalayan foothills. Fluffy, non-sticky grains with signature nutty fragrance.",
    weight: "2 kg Bag",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Organic Whole Brown Rice",
    price: 7.50,
    offerPrice: 5.80,
    smallDesc: "Fiber-rich whole grain brown rice.",
    longDesc: "Nutritious brown rice with intact bran layer. Provides steady energy, fiber, and B vitamins.",
    weight: "1 kg Bag",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Organic White Quinoa",
    price: 8.99,
    offerPrice: 6.99,
    smallDesc: "Complete plant protein Andean super-grain.",
    longDesc: "Pre-washed organic white quinoa grains containing all 9 essential amino acids.",
    weight: "500g Pouch",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Royal Thai Jasmine Rice",
    price: 9.20,
    offerPrice: 7.40,
    smallDesc: "Fragrant floral white Jasmine rice.",
    longDesc: "Authentic Hom Mali Jasmine rice from Thailand. Slightly sticky texture with natural pandan flower aroma.",
    weight: "1.5 kg Bag",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Wild Rice Blend",
    price: 10.50,
    offerPrice: 8.20,
    smallDesc: "Gourmet mix of wild rice, red rice, and brown rice.",
    longDesc: "Colorful, chewy grain mixture featuring dark lake wild rice and long grain red rice.",
    weight: "750g Pouch",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Organic Himalayan Red Rice",
    price: 8.20,
    offerPrice: 6.30,
    smallDesc: "Nutty red unpolished rice rich in proanthocyanidins.",
    longDesc: "Heirloom whole red grain rice with a firm bite and savory, nutty flavor.",
    weight: "1 kg Bag",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Pearl Barley Grains",
    price: 4.50,
    offerPrice: 3.40,
    smallDesc: "Chewy whole grain barley for soups and stews.",
    longDesc: "Polished pearl barley that thickens soups naturally while delivering abundant beta-glucan fiber.",
    weight: "750g Pouch",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Steel Cut Whole Oats",
    price: 5.80,
    offerPrice: 4.20,
    smallDesc: "Coarsely chopped Scottish style whole oat groats.",
    longDesc: "Minimal processed steel-cut oats creating a hearty, creamy oatmeal with low glycemic index.",
    weight: "1 kg Bag",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Arborio Risotto Rice",
    price: 8.99,
    offerPrice: 6.99,
    smallDesc: "Short-grain Italian rice for creamy risottos.",
    longDesc: "High-starch short grain rice grown in Northern Italy. Releases amylopectin for velvety risottos.",
    weight: "1 kg Vacuum Pack",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Forbidden Black Rice",
    price: 11.50,
    offerPrice: 8.90,
    smallDesc: "Ancient Chinese heirloom dark purple rice.",
    longDesc: "Deep purple-black short grain rice packed with anthocyanins. Turns deep violet when cooked.",
    weight: "500g Pouch",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Organic Wheat Couscous",
    price: 4.20,
    offerPrice: 3.10,
    smallDesc: "Quick-cooking durum wheat semolina granules.",
    longDesc: "Traditional North African couscous. Fluffs up in 5 minutes with hot broth or water.",
    weight: "500g Pack",
    categoryName: "Rice",
    images: ["rice.webp"]
  },
  {
    name: "Organic Raw Buckwheat Groats",
    price: 6.40,
    offerPrice: 4.90,
    smallDesc: "Gluten-free raw buckwheat triangular seeds.",
    longDesc: "Nutritious pseudograin rich in rutin. Excellent roasted into kasha or boiled for warm breakfast bowles.",
    weight: "500g Pack",
    categoryName: "Rice",
    images: ["rice.webp"]
  },

  // --- EGGS (8 items) ---
  {
    name: "Farm Fresh Free-Range Eggs",
    price: 4.99,
    offerPrice: 3.89,
    smallDesc: "Grade A brown eggs from outdoor roaming hens.",
    longDesc: "Farm fresh brown eggs laid by free-range hens fed an all-natural grain diet. Golden thick yolks.",
    weight: "12 Pack Carton",
    categoryName: "Eggs",
    images: ["eggs.webp"]
  },
  {
    name: "Organic Pasture-Raised Eggs",
    price: 6.50,
    offerPrice: 5.10,
    smallDesc: "Pasture-raised eggs with deep orange yolks.",
    longDesc: "Hens enjoy 108 sq ft of pasture each. Exceptionally rich flavor and high Omega-3 content.",
    weight: "12 Pack Carton",
    categoryName: "Eggs",
    images: ["eggs.webp"]
  },
  {
    name: "Brown Omega-3 Enriched Eggs",
    price: 5.49,
    offerPrice: 4.29,
    smallDesc: "Flaxseed-fed hen eggs rich in DHA fatty acids.",
    longDesc: "Delicious brown eggs containing 225mg ALA Omega-3 per egg from flax-enriched feed.",
    weight: "12 Pack Carton",
    categoryName: "Eggs",
    images: ["eggs.webp"]
  },
  {
    name: "Fresh Farm Quail Eggs",
    price: 6.99,
    offerPrice: 5.29,
    smallDesc: "Delicate speckled gourmet quail eggs.",
    longDesc: "Bite-sized gourmet quail eggs with tender whites and creamy rich yolks. Popular for hors d'oeuvres.",
    weight: "18 Pack Carton",
    categoryName: "Eggs",
    images: ["eggs.webp"]
  },
  {
    name: "Organic Large White Eggs",
    price: 4.50,
    offerPrice: 3.49,
    smallDesc: "USDA Organic certified white large eggs.",
    longDesc: "Clean, wholesome white eggs from non-GMO organic certified family farms.",
    weight: "12 Pack Carton",
    categoryName: "Eggs",
    images: ["eggs.webp"]
  },
  {
    name: "Pasture-Raised Duck Eggs",
    price: 7.99,
    offerPrice: 6.19,
    smallDesc: "Jumbo duck eggs with ultra-rich creamy yolks.",
    longDesc: "Large duck eggs with high fat content and sturdy whites. The secret ingredient for baker's cakes.",
    weight: "6 Pack Carton",
    categoryName: "Eggs",
    images: ["eggs.webp"]
  },
  {
    name: "Jumbo Brown Heritage Eggs",
    price: 6.99,
    offerPrice: 5.49,
    smallDesc: "Extra large eggs from heritage breed hens.",
    longDesc: "Heirloom brown and blue shelled jumbo eggs bursting with natural farm taste.",
    weight: "12 Pack Carton",
    categoryName: "Eggs",
    images: ["eggs.webp"]
  },
  {
    name: "Pure Organic Liquid Egg Whites",
    price: 4.99,
    offerPrice: 3.79,
    smallDesc: "Pasteurized liquid egg whites for low-fat protein.",
    longDesc: "100% pure organic egg whites with zero fat or cholesterol. Ideal for fitness omelets.",
    weight: "500ml Carton",
    categoryName: "Eggs",
    images: ["eggs.webp"]
  },

  // --- FLAKES & CEREALS (10 items) ---
  {
    name: "Organic Whole Oat Flakes",
    price: 4.99,
    offerPrice: 3.79,
    smallDesc: "Thick rolled oat flakes for traditional porridge.",
    longDesc: "Steamed and rolled whole oat groats providing heart-healthy beta-glucan fiber and sustained energy.",
    weight: "500g Pack",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Honey Roasted Almond Granola Flakes",
    price: 6.50,
    offerPrice: 4.99,
    smallDesc: "Crunchy oat clusters with sliced almonds and honey.",
    longDesc: "Golden baked oat flakes combined with roasted California almond slices and pure wildflower honey.",
    weight: "400g Box",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Crispy Honey Nut Corn Flakes",
    price: 5.20,
    offerPrice: 3.99,
    smallDesc: "Toasted corn flakes glazed with honey & peanuts.",
    longDesc: "Classic oven-toasted corn flakes coated in natural honey and crushed roasted peanuts.",
    weight: "450g Box",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Organic Spelt Flakes",
    price: 5.80,
    offerPrice: 4.40,
    smallDesc: "Ancient grain spelt cereal flakes.",
    longDesc: "Wholesome ancient spelt wheat flakes with a distinct nutty flavor and easy digestibility.",
    weight: "500g Pack",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Multigrain Breakfast Flakes",
    price: 4.80,
    offerPrice: 3.60,
    smallDesc: "7-grain blend of toasted whole cereal flakes.",
    longDesc: "Nutritious blend of wheat, oats, barley, rye, rice, corn, and spelt flakes.",
    weight: "500g Box",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Cocoa Crisp Rice Flakes",
    price: 4.50,
    offerPrice: 3.30,
    smallDesc: "Organic cocoa coated crispy puffed rice.",
    longDesc: "Fun and delicious chocolate rice breakfast flakes made with fair-trade organic cocoa powder.",
    weight: "375g Box",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Organic Barley Flakes",
    price: 4.90,
    offerPrice: 3.60,
    smallDesc: "Rolled barley flakes for muesli mixes.",
    longDesc: "Subtly sweet rolled barley groats that add a pleasing chewiness to muesli and overnight oats.",
    weight: "500g Pack",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Toasted Coconut Granola",
    price: 6.20,
    offerPrice: 4.70,
    smallDesc: "Tropical granola with coconut chips & chia seeds.",
    longDesc: "Handcrafted oat granola baked with coconut oil, shaved coconut, and organic chia seeds.",
    weight: "350g Pouch",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Triple Berry Crunch Cereal",
    price: 5.99,
    offerPrice: 4.49,
    smallDesc: "Crispy wheat flakes with freeze-dried berries.",
    longDesc: "Toasted whole wheat flakes paired with real freeze-dried strawberries, blueberries, and raspberries.",
    weight: "400g Box",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },
  {
    name: "Puffed Quinoa Flakes",
    price: 6.80,
    offerPrice: 5.10,
    smallDesc: "Light, airy gluten-free quinoa cereal flakes.",
    longDesc: "High-protein quick-cooking quinoa flakes. Delicate texture for instant hot cereal or smoothie bowls.",
    weight: "350g Pack",
    categoryName: "Flakes",
    images: ["flakes.webp"]
  },

  // --- ORGANIC PRODUCE (10 items) ---
  {
    name: "Organic Heirloom Tomatoes",
    price: 5.99,
    offerPrice: 4.49,
    smallDesc: "Colorful heirloom tomato varieties bursting with flavor.",
    longDesc: "Non-hybrid heirloom tomatoes grown organically for unmatched sweetness, rich aroma, and vibrant colors.",
    weight: "750g Mix",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Farm Fresh Tuscan Kale",
    price: 3.50,
    offerPrice: 2.60,
    smallDesc: "Lacinato dinosaur kale leaves for green smoothies.",
    longDesc: "Deep blue-green crinkled kale leaves packed with lutein, vitamin K, and calcium.",
    weight: "1 Bunch (approx 300g)",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Organic Microgreens Salad Mix",
    price: 4.99,
    offerPrice: 3.79,
    smallDesc: "Nutrient-dense young shoots of broccoli, radish & mustard.",
    longDesc: "Concentrated nutrient microgreens harvested at 14 days. Adds fresh peppery crunch to sandwiches and salads.",
    weight: "100g Clamshell",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Organic Oyster Mushrooms",
    price: 6.80,
    offerPrice: 5.20,
    smallDesc: "Velvety delicate oyster mushrooms for sauteing.",
    longDesc: "Cluster of tender white oyster mushrooms with savory umami flavor notes.",
    weight: "250g Pack",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Organic Covington Sweet Potatoes",
    price: 3.99,
    offerPrice: 2.99,
    smallDesc: "Sweet orange-fleshed organic yams.",
    longDesc: "Naturally sweet orange sweet potatoes rich in beta carotene, potassium, and complex carbohydrates.",
    weight: "1.5 kg Bag",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Organic Red Beets Bunch",
    price: 3.40,
    offerPrice: 2.50,
    smallDesc: "Fresh red beets with edible greens intact.",
    longDesc: "Organically cultivated red beets. Sauté the leafy greens and roast the sweet roots.",
    weight: "1 Bunch (3-4 pcs)",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Rainbow Swiss Chard",
    price: 3.80,
    offerPrice: 2.80,
    smallDesc: "Vibrant yellow, pink, and red stalked chard leaves.",
    longDesc: "Colorful tender leafy greens brimming with vitamins A, C, and K.",
    weight: "1 Bunch",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Organic Eureka Lemons",
    price: 3.99,
    offerPrice: 2.99,
    smallDesc: "Juicy organic lemons with clean zest.",
    longDesc: "Wax-free organic lemons perfect for lemon water, zest baking, and salad dressings.",
    weight: "500g Bag",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Organic Fresh Culinary Herbs Mix",
    price: 2.99,
    offerPrice: 2.19,
    smallDesc: "Fresh sprigs of thyme, rosemary, and sage.",
    longDesc: "Aromatic bouquet of freshly cut organic culinary herbs to elevate roasted meats and vegetables.",
    weight: "50g Pack",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  },
  {
    name: "Organic Baby Bok Choy",
    price: 3.60,
    offerPrice: 2.70,
    smallDesc: "Tender Asian green cabbage heads for stir-fries.",
    longDesc: "Crisp white stems and soft green leaves. Mild sweet cabbage flavor ideal for steaming and wok cooking.",
    weight: "400g Pack",
    categoryName: "Organic Produce",
    images: ["organic_vegetables.webp"]
  }
];

const seedDatabase = async () => {
  try {
    try {
      await connectDB();
    } catch (err) {
      console.log("Atlas connection failed, connecting to local MongoDB...");
      await mongoose.connect("mongodb://127.0.0.1:27017/grocery");
    }
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing categories and products.");

    // Insert categories
    const createdCategories = await Category.insertMany(sampleCategories);
    console.log(`Successfully created ${createdCategories.length} categories.`);

    // Map category names to ObjectIds
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Prepare products with category ObjectIds
    const productsToInsert = sampleProducts.map((p) => ({
      name: p.name,
      price: p.price,
      offerPrice: p.offerPrice,
      smallDesc: p.smallDesc,
      longDesc: p.longDesc,
      weight: p.weight,
      category: categoryMap[p.categoryName] || createdCategories[0]._id,
      images: p.images
    }));

    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`Successfully seeded ${createdProducts.length} items into database across ${createdCategories.length} categories!`);

    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
