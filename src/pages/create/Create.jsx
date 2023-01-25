import "./Create.css";
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title,method,cookingTime)
  }

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        
        <label>
          <span>Recipe title: </span>
          
          <input 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title} 
          />

        </label>

        {/* INGREDIENTS GO HERE */}

        <label>
          <span> Recipe method: </span>
          <textarea
          onChange={(e) => setMethod(e.target.value)}
          value={method}
           />
        </label>

        <label>
          <span>
            Cooking time (minutes):
          </span>
          <input
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
          />
          
        </label>

        <button className="btn">
          Submit
        </button>

      </form>
    </div>
  );
}
