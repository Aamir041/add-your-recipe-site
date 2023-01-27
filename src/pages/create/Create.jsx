import "./Create.css";
import { useState, useRef, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient,setNewIngredient] = useState('');
  const [ingredients,setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const {postData,data,error} = useFetch("http://localhost:3000/recipes","POST");


  const handleSubmit = (e) => {
    e.preventDefault();
    postData({title, ingredients,method, cookingTime:cookingTime+" minutes"});
  }

  

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    
    // checking whether ingredient is added already if yes then don't add
    if(ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients => [...prevIngredients,ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  }

  useEffect(() => {
    if(data){
      history.push("/");
    }
  },[data])

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
          <span>Recipe Ingredients</span>
          <div className="ingredients">
          <input 
            type="text"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput}
          />
          <button onClick={handleAdd} className="btn">Add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i} </em>)}</p>

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
