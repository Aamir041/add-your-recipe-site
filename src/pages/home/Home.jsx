import "./Home.css"
import useFetch from "../../hooks/useFetch"
import Recipe from "../recipe/Recipe"
import RecipeList from "../../Components/Recipe List/RecipeList"
export default function Home() {
  const {data, isPending, error} = useFetch("http://localhost:3000/recipes")
  
  return (
    <div className="home">
    {error && <div>{error}</div>}
    {isPending && <div>{isPending}</div>}

    {data  
      &&
      <RecipeList
       recipes = {data} 
      />
    }

    </div>
  )
}
