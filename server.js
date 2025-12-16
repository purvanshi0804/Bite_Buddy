const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Full dataset of restaurants with categories, moods, ratings, veg/non-veg, budget
const RESTAURANTS = [
  { name: "Sharma's Dhaba", dish: "Veg Thali", city: "Delhi", cuisine: "North Indian", veg: true, budget: "low", mood: ["comfort","filling"], rating: 4.6, reviews: ["Best thali","Very affordable"], image: "https://images.unsplash.com/photo-1746274394124-141a1d1c5af3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGhhYmElMjBmb29kfGVufDB8fDB8fHww" },
  { name: "Cheese Burst Cafe", dish: "Cheese Pizza", city: "Bangalore", cuisine: "Italian", veg: true, budget: "medium", mood: ["cheesy","happy"], rating: 4.4, reviews: ["Cheese overload","Loved the pizza"], image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hlZXNlJTIwcGl6emF8ZW58MHx8MHx8fDA%3D" },
  { name: "Biryani Junction", dish: "Dum Biryani", city: "Hyderabad", cuisine: "Hyderabadi", veg: false, budget: "medium", mood: ["spicy","comfort"], rating: 4.7, reviews: ["Authentic taste","Spicy & filling"], image: "https://images.unsplash.com/photo-1697155406055-2db32d47ca07?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Street Momos", dish: "Steamed Momos", city: "Delhi", cuisine: "Chinese", veg: true, budget: "low", mood: ["quick","snack"], rating: 4.3, reviews: ["Juicy momos","Best street food"], image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "BBQ Nation", dish: "Grilled Chicken", city: "Mumbai", cuisine: "Barbecue", veg: false, budget: "high", mood: ["celebration"], rating: 4.8, reviews: ["Amazing buffet","Worth the price"], image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" },
  { name: "Cafe Mocha", dish: "Cappuccino", city: "Pune", cuisine: "Cafe", veg: true, budget: "medium", mood: ["relaxed","happy"], rating: 4.2, reviews: ["Nice ambience","Good coffee"], image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" },
  { name: "Burger Barn", dish: "Cheeseburger", city: "Bangalore", cuisine: "Fast Food", veg: false, budget: "low", mood: ["quick","cheesy"], rating: 4.1, reviews: ["Juicy burgers"], image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80" },
  { name: "Pizza Planet", dish: "Pepperoni Pizza", city: "Mumbai", cuisine: "Italian", veg: false, budget: "medium", mood: ["cheesy","happy"], rating: 4.5, reviews: ["Loved the crust","Tasty toppings"], image: "https://plus.unsplash.com/premium_photo-1667682942148-a0c98d1d70db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Green Bowl", dish: "Vegan Salad", city: "Delhi", cuisine: "Healthy", veg: true, budget: "medium", mood: ["healthy","light"], rating: 4.3, reviews: ["Fresh veggies","Healthy option"], image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" },
  { name: "Noodle House", dish: "Chicken Noodles", city: "Bangalore", cuisine: "Chinese", veg: false, budget: "low", mood: ["quick","comfort"], rating: 4.2, reviews: ["Tasty noodles","Good portion"], image: "https://plus.unsplash.com/premium_photo-1694670234085-4f38b261ce5b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Curry Delight", dish: "Paneer Butter Masala", city: "Pune", cuisine: "North Indian", veg: true, budget: "medium", mood: ["comfort","happy"], rating: 4.6, reviews: ["Rich flavor","Creamy paneer"], image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Spice Route", dish: "Lamb Rogan Josh", city: "Hyderabad", cuisine: "North Indian", veg: false, budget: "high", mood: ["spicy","celebration"], rating: 4.8, reviews: ["Tender meat","Perfect spices"], image: "https://th.bing.com/th/id/R.438adee7682e56785577603c6b9ed2e5?rik=4%2b8NQJCI%2fPymzQ&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f2313%2f8987%2farticles%2fRogan_Josh_01_copy_1200x1200.jpg%3fv%3d1625548245&ehk=KohMza3cOs1j61hfZDU1htJZ9EIHS245HTE%2f5GUtQ2U%3d&risl=&pid=ImgRaw&r=0" },
  { name: "Taco Town", dish: "Veg Taco", city: "Mumbai", cuisine: "Mexican", veg: true, budget: "low", mood: ["quick","snack"], rating: 4.0, reviews: ["Tasty & light"], image: "https://plus.unsplash.com/premium_photo-1678051386853-5623e723745a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Sushi Spot", dish: "Salmon Sushi", city: "Bangalore", cuisine: "Japanese", veg: false, budget: "high", mood: ["healthy","happy"], rating: 4.7, reviews: ["Fresh fish","Loved the sushi"], image: "https://th.bing.com/th/id/R.438adee7682e56785577603c6b9ed2e5?rik=4%2b8NQJCI%2fPymzQ&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f2313%2f8987%2farticles%2fRogan_Josh_01_copy_1200x1200.jpg%3fv%3d1625548245&ehk=KohMza3cOs1j61hfZDU1htJZ9EIHS245HTE%2f5GUtQ2U%3d&risl=&pid=ImgRaw&r=0" }
];


// Recommend based on filters
app.post("/recommend", (req, res) => {
  const { mood, veg, budget, city } = req.body;

  const filtered = RESTAURANTS.filter(r =>
    (city === "all" || r.city === city) &&
    (veg === "all" || (veg === "veg" ? r.veg : !r.veg)) &&
    (budget === "all" || r.budget === budget) &&
    (mood === "all" || r.mood.includes(mood))
  );

  res.json({
    explanation: filtered.length > 0
      ? `Found ${filtered.length} restaurants for your choices!`
      : "No matches found. Try changing filters.",
    results: filtered.length ? filtered : RESTAURANTS.slice(0, 10)
  });
});

// Surprise Me - random
app.get("/surprise", (req, res) => {
  const random = RESTAURANTS.sort(() => 0.5 - Math.random()).slice(0, 5);
  res.json({
    explanation: "🎉 Surprise! Here are some random picks for you.",
    results: random
  });
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
