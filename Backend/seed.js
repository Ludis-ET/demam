const mongoose = require("mongoose");
const Product = require("./models/Product");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => Product.deleteMany({}))
  .then(() => {
    const products = [
      {
        name: "Revitalizing Face Serum",
        description:
          "A serum that hydrates and replenishes your skin, leaving it radiant with a long-lasting glow. This formula penetrates deep into the skin layers to provide moisture and improve texture.",
        price: 49.99,
        stock: 100,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/face-serum1.jpg",
        image2Url: "https://via.placeholder.com/150/face-serum2.jpg",
        image3Url: "https://via.placeholder.com/150/face-serum3.jpg",
      },
      {
        name: "Hydrating Night Cream",
        description:
          "Rich night cream that restores your skin’s glow while you sleep. Infused with natural ingredients like hyaluronic acid and shea butter.",
        price: 39.99,
        stock: 120,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/night-cream1.jpg",
        image2Url: "https://via.placeholder.com/150/night-cream2.jpg",
        image3Url: "https://via.placeholder.com/150/night-cream3.jpg",
      },
      {
        name: "Vitamin C Brightening Serum",
        description:
          "Brighten your skin with this powerful Vitamin C formula. It helps reduce dark spots, even out skin tone, and improve overall skin texture.",
        price: 59.99,
        stock: 75,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/vitamin-c-serum1.jpg",
        image2Url: "https://via.placeholder.com/150/vitamin-c-serum2.jpg",
        image3Url: "https://via.placeholder.com/150/vitamin-c-serum3.jpg",
      },
      {
        name: "Moisturizing Body Lotion",
        description:
          "Deeply nourishing body lotion to keep your skin soft all day long.",
        price: 25.99,
        stock: 150,
        category: "Body Care",
        image1Url: "https://via.placeholder.com/150/body-lotion1.jpg",
        image2Url: "https://via.placeholder.com/150/body-lotion2.jpg",
        image3Url: "https://via.placeholder.com/150/body-lotion3.jpg",
      },
      {
        name: "Exfoliating Face Scrub",
        description:
          "Gentle exfoliating scrub that removes dead skin cells and unclogs pores.",
        price: 29.99,
        stock: 110,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/face-scrub1.jpg",
        image2Url: "https://via.placeholder.com/150/face-scrub2.jpg",
        image3Url: "https://via.placeholder.com/150/face-scrub3.jpg",
      },
      {
        name: "Nourishing Lip Balm",
        description: "Organic lip balm to keep your lips soft and hydrated.",
        price: 8.99,
        stock: 200,
        category: "Lip Care",
        image1Url: "https://via.placeholder.com/150/lip-balm1.jpg",
        image2Url: "https://via.placeholder.com/150/lip-balm2.jpg",
        image3Url: "https://via.placeholder.com/150/lip-balm3.jpg",
      },
      {
        name: "Clarifying Face Mask",
        description:
          "Detoxify your skin with this clarifying mask, made with natural clay to help absorb impurities.",
        price: 34.99,
        stock: 90,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/face-mask1.jpg",
        image2Url: "https://via.placeholder.com/150/face-mask2.jpg",
        image3Url: "https://via.placeholder.com/150/face-mask3.jpg",
      },
      {
        name: "Sunscreen SPF 50",
        description:
          "High-protection sunscreen for all-day outdoor activities, ensuring your skin stays safe from harmful UV rays.",
        price: 19.99,
        stock: 130,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/sunscreen1.jpg",
        image2Url: "https://via.placeholder.com/150/sunscreen2.jpg",
        image3Url: "https://via.placeholder.com/150/sunscreen3.jpg",
      },
      {
        name: "Anti-Aging Eye Cream",
        description:
          "Reduce fine lines and dark circles with this anti-aging eye cream, formulated to rejuvenate and refresh the delicate eye area.",
        price: 44.99,
        stock: 60,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/eye-cream1.jpg",
        image2Url: "https://via.placeholder.com/150/eye-cream2.jpg",
        image3Url: "https://via.placeholder.com/150/eye-cream3.jpg",
      },
      {
        name: "Rejuvenating Hair Oil",
        description:
          "Nourish and revitalize your hair with this lightweight hair oil, designed to add shine and prevent dryness.",
        price: 24.99,
        stock: 140,
        category: "Hair Care",
        image1Url: "https://via.placeholder.com/150/hair-oil1.jpg",
        image2Url: "https://via.placeholder.com/150/hair-oil2.jpg",
        image3Url: "https://via.placeholder.com/150/hair-oil3.jpg",
      },
      {
        name: "Rose Water Toner",
        description:
          "A gentle toner that balances your skin’s pH and refreshes your face, leaving it feeling clean and hydrated.",
        price: 14.99,
        stock: 180,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/rose-toner1.jpg",
        image2Url: "https://via.placeholder.com/150/rose-toner2.jpg",
        image3Url: "https://via.placeholder.com/150/rose-toner3.jpg",
      },
      {
        name: "Whipped Body Butter",
        description:
          "Indulge your skin with this ultra-hydrating whipped body butter, perfect for dry areas to provide lasting moisture.",
        price: 32.99,
        stock: 80,
        category: "Body Care",
        image1Url: "https://via.placeholder.com/150/body-butter1.jpg",
        image2Url: "https://via.placeholder.com/150/body-butter2.jpg",
        image3Url: "https://via.placeholder.com/150/body-butter3.jpg",
      },
      {
        name: "Brightening Face Oil",
        description:
          "Lightweight face oil that evens skin tone and adds a radiant glow, making it perfect for daily use.",
        price: 49.99,
        stock: 85,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/face-oil1.jpg",
        image2Url: "https://via.placeholder.com/150/face-oil2.jpg",
        image3Url: "https://via.placeholder.com/150/face-oil3.jpg",
      },
      {
        name: "Coconut Milk Shampoo",
        description:
          "A nourishing shampoo that strengthens and moisturizes your hair, leaving it soft and manageable.",
        price: 22.99,
        stock: 110,
        category: "Hair Care",
        image1Url: "https://via.placeholder.com/150/shampoo1.jpg",
        image2Url: "https://via.placeholder.com/150/shampoo2.jpg",
        image3Url: "https://via.placeholder.com/150/shampoo3.jpg",
      },
      {
        name: "Detoxifying Charcoal Mask",
        description:
          "Purify your skin with this deep cleansing charcoal mask that absorbs excess oil and removes impurities.",
        price: 39.99,
        stock: 95,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/charcoal-mask1.jpg",
        image2Url: "https://via.placeholder.com/150/charcoal-mask2.jpg",
        image3Url: "https://via.placeholder.com/150/charcoal-mask3.jpg",
      },
      {
        name: "Lavender Bath Salts",
        description:
          "Relax and unwind with these soothing lavender bath salts, perfect for a calming soak after a long day.",
        price: 15.99,
        stock: 170,
        category: "Body Care",
        image1Url: "https://via.placeholder.com/150/bath-salts1.jpg",
        image2Url: "https://via.placeholder.com/150/bath-salts2.jpg",
        image3Url: "https://via.placeholder.com/150/bath-salts3.jpg",
      },
      {
        name: "Hand Cream with Shea Butter",
        description:
          "Moisturizing hand cream infused with organic shea butter, perfect for keeping hands soft and nourished.",
        price: 12.99,
        stock: 140,
        category: "Body Care",
        image1Url: "https://via.placeholder.com/150/hand-cream1.jpg",
        image2Url: "https://via.placeholder.com/150/hand-cream2.jpg",
        image3Url: "https://via.placeholder.com/150/hand-cream3.jpg",
      },
      {
        name: "Cooling Aloe Vera Gel",
        description:
          "Soothing aloe vera gel that hydrates and calms irritated skin, ideal for after sun exposure.",
        price: 18.99,
        stock: 130,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/aloe-vera-gel1.jpg",
        image2Url: "https://via.placeholder.com/150/aloe-vera-gel2.jpg",
        image3Url: "https://via.placeholder.com/150/aloe-vera-gel3.jpg",
      },
      {
        name: "Mint Foot Cream",
        description:
          "Revitalize tired feet with this mint-infused foot cream, providing cooling relief and hydration.",
        price: 17.99,
        stock: 110,
        category: "Body Care",
        image1Url: "https://via.placeholder.com/150/foot-cream1.jpg",
        image2Url: "https://via.placeholder.com/150/foot-cream2.jpg",
        image3Url: "https://via.placeholder.com/150/foot-cream3.jpg",
      },
      {
        name: "Organic Facial Mist",
        description:
          "Refresh and hydrate your skin with this organic facial mist, perfect for a mid-day pick-me-up.",
        price: 13.99,
        stock: 200,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/facial-mist1.jpg",
        image2Url: "https://via.placeholder.com/150/facial-mist2.jpg",
        image3Url: "https://via.placeholder.com/150/facial-mist3.jpg",
      },
      {
        name: "Gentle Foaming Cleanser",
        description:
          "A gentle foaming cleanser that removes makeup and impurities while leaving your skin feeling soft and clean.",
        price: 21.99,
        stock: 150,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/foaming-cleanser1.jpg",
        image2Url: "https://via.placeholder.com/150/foaming-cleanser2.jpg",
        image3Url: "https://via.placeholder.com/150/foaming-cleanser3.jpg",
      },
      {
        name: "Anti-Acne Treatment Gel",
        description:
          "Target breakouts with this effective anti-acne gel, formulated with salicylic acid for fast relief.",
        price: 27.99,
        stock: 90,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/acne-gel1.jpg",
        image2Url: "https://via.placeholder.com/150/acne-gel2.jpg",
        image3Url: "https://via.placeholder.com/150/acne-gel3.jpg",
      },
      {
        name: "Strengthening Hair Conditioner",
        description:
          "This conditioner nourishes and strengthens hair, making it smooth and manageable.",
        price: 22.99,
        stock: 115,
        category: "Hair Care",
        image1Url: "https://via.placeholder.com/150/conditioner1.jpg",
        image2Url: "https://via.placeholder.com/150/conditioner2.jpg",
        image3Url: "https://via.placeholder.com/150/conditioner3.jpg",
      },
      {
        name: "Brightening Under-Eye Patches",
        description:
          "Hydrating patches that brighten and refresh the under-eye area, reducing puffiness and dark circles.",
        price: 19.99,
        stock: 140,
        category: "Skincare",
        image1Url: "https://via.placeholder.com/150/eye-patches1.jpg",
        image2Url: "https://via.placeholder.com/150/eye-patches2.jpg",
        image3Url: "https://via.placeholder.com/150/eye-patches3.jpg",
      },
      {
        name: "Calming Herbal Bath Oil",
        description:
          "Relaxing bath oil infused with herbal extracts, perfect for a soothing bath experience.",
        price: 26.99,
        stock: 100,
        category: "Body Care",
        image1Url: "https://via.placeholder.com/150/bath-oil1.jpg",
        image2Url: "https://via.placeholder.com/150/bath-oil2.jpg",
        image3Url: "https://via.placeholder.com/150/bath-oil3.jpg",
      },
    ];


    return Product.insertMany(products);
  })
  .then(() => {
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding the database:", err);
    mongoose.connection.close();
  });
