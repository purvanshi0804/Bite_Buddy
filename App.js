import { useState } from "react";
import "./App.css";

export default function App() {
  const [mood, setMood] = useState("all");
  const [veg, setVeg] = useState("all");
  const [budget, setBudget] = useState("all");
  const [city, setCity] = useState("all");
  const [reply, setReply] = useState("");
  const [list, setList] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, veg, budget, city }),
      });
      const data = await res.json();
      setReply(data.explanation);
      setList(data.results);
    } catch (err) {
      console.error(err);
      setReply("⚠️ Backend error. Make sure server is running.");
      setList([]);
    }
  };

  const surpriseMe = async () => {
    try {
      const res = await fetch("http://localhost:5000/surprise");
      const data = await res.json();
      setReply(data.explanation);
      setList(data.results);
    } catch (err) {
      console.error(err);
      setReply("⚠️ Could not fetch surprises.");
      setList([]);
    }
  };

  return (
    <div className="app">
      <h1>BiteBuddy 🍽️</h1>
      <p className="subtitle">Discover dishes and restaurants based on your mood & choice</p>

      <div className="filters">
        <select onChange={e => setCity(e.target.value)}>
          <option value="all">Any City</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Pune</option>
        </select>

        <select onChange={e => setMood(e.target.value)}>
          <option value="all">Any Mood</option>
          <option value="comfort">Comfort</option>
          <option value="cheesy">Cheesy</option>
          <option value="spicy">Spicy</option>
          <option value="quick">Quick</option>
          <option value="happy">Happy</option>
          <option value="healthy">Healthy</option>
        </select>

        <select onChange={e => setVeg(e.target.value)}>
          <option value="all">Veg & Non-Veg</option>
          <option value="veg">Veg 🌱</option>
          <option value="nonveg">Non-Veg 🍗</option>
        </select>

        <select onChange={e => setBudget(e.target.value)}>
          <option value="all">Any Budget</option>
          <option value="low">Low ₹</option>
          <option value="medium">Medium ₹₹</option>
          <option value="high">High ₹₹₹</option>
        </select>

        <button onClick={fetchRecommendations}>Find My Food 🍴</button>
        <button onClick={surpriseMe}>Surprise Me 🎉</button>
      </div>

      {reply && <div className="ai-box">{reply}</div>}

      <div className="cards">
        {list.map((r, i) => (
          <div className="card" key={i}>
            <img src={r.image} alt={r.name} />
            <div className="card-body">
              <h3>{r.dish}</h3>
              <h4>{r.name}</h4>
              <p>{r.cuisine} • {r.city}</p>
              <p>{r.veg ? "Veg 🌱" : "Non-Veg 🍗"} • ⭐ {r.rating}</p>
              <div className="reviews">{r.reviews.map((rev, idx) => <span key={idx}>“{rev}”</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
