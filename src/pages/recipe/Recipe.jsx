import "./Recipe.css"
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import React from "react";

// React.Fragment is used si that we don't bloat html

export default function Recipe() {
 
  const {id} = useParams();

  const url = "http://localhost:3000/recipes/"+id;

  const {data:recipe,isPending,error} = useFetch(url); // grabbing data

  return (
    <div className="recipe">
    {error && <div className="error"> A Error has Occurred</div>}
    {isPending && <div className="loading">Loading ...</div>}
      {recipe && (
        <React.Fragment>
        <h2 className="page-title">{recipe.title}</h2>
        <p>Takes {recipe.cookingTime} to cook.</p>
        <ul>
        {recipe.ingredients.map( (ing,index) => <li key={index}>{ing}</li>)}
        </ul>
        <p className="method">{recipe.method}</p>
        </React.Fragment>
      )}
    </div>
  )
}
