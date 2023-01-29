import { useLocation } from "react-router-dom"
import "./Search.css"

// custom hooks
import useFetch from "../../hooks/useFetch";

// componenets
import RecipeList from "../../Components/Recipe List/RecipeList"
import useTheme from "../../hooks/useTheme";
export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const url = "http://localhost:3000/recipes?q="+query;

  const {error, isPending, data} = useFetch(url);
  const {mode} = useTheme()

  console.log(data, error, isPending);

  return (
    <div className={`search ${mode}`}>
    <h2 className="page-title">Recipes including "{query}"</h2>
        {error && <p className="error">{error}</p>}
    {isPending && <p className="loading">Loading ...</p>}
    {data && <RecipeList recipes={data}/>  }
    </div>
  )
}
