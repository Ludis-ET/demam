const mongoose = require("mongoose");
const Order = require("./models/Order");
const Product = require("./models/Product");
const dotenv = require("dotenv");

dotenv.config();

const users = [
  { name: "Alice Smith", phone: "123-456-7890" },
  { name: "Bob Johnson", phone: "234-567-8901" },
  { name: "Charlie Brown", phone: "345-678-9012" },
  { name: "Daisy Miller", phone: "456-789-0123" },
  { name: "Ethan Hunt", phone: "567-890-1234" },
  { name: "Fiona Green", phone: "678-901-2345" },
  { name: "George Black", phone: "789-012-3456" },
  { name: "Hannah White", phone: "890-123-4567" },
  { name: "Ian Blue", phone: "901-234-5678" },
  { name: "Jack Red", phone: "012-345-6789" },
];

const getRandomStatus = () => {
  const statuses = ["pending", "completed", "deleted"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomDate = () => {
  const now = new Date();
  const daysAgo = getRandomInt(0, 30);
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - daysAgo,
    getRandomInt(0, 23),
    getRandomInt(0, 59)
  );
};

const seedOrders = async () => {
  try {
    await Order.deleteMany({});
    const products = await Product.find();
    for (let i = 0; i < 50; i++) {
      const randomProductCount = getRandomInt(1, 5);
      const orderItems = [];
      for (let j = 0; j < randomProductCount; j++) {
        const randomProduct = products[getRandomInt(0, products.length - 1)];
        const quantity = getRandomInt(1, 3);
        orderItems.push({
          product: randomProduct._id,
          quantity,
          price: randomProduct.price,
        });
      }
      const totalPrice = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const randomUser = users[getRandomInt(0, users.length - 1)];
      const newOrder = new Order({
        customerName: randomUser.name,
        phoneNumber: randomUser.phone,
        orderItems,
        totalPrice,
        status: getRandomStatus(),
        createdAt: getRandomDate(),
      });
      await newOrder.save();
    }
    console.log("Orders seeded successfully!");
  } catch (error) {
    console.error("Error seeding orders:", error);
  } finally {
    mongoose.connection.close();
  }
};

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => seedOrders())
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
