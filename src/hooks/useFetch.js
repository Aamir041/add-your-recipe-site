import { useEffect, useState } from "react"
export default function useFetch(url) {
    const [data,setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error,setError] = useState(null)
    useEffect(() => {

        const controller = new AbortController(); // for abort request to fetch data

        const fetchData = async () => {
            setIsPending(true);

            try{
                const res = await fetch(url, {signal:controller.signal});
                const fetchedJSON = await res.json();
                if(!res.ok){
                    throw new Error(res.statusText)
                }
                setIsPending(false); // successfully fetch data so not pending 
                setData(fetchedJSON); // add fetch data to data 
                setError(null); // successfully fetch data so no error set
            }
            catch(error) {
                setIsPending(false);
                if(error.name === "AbortError"){
                    console.log("The Fetch Was Aborted")
                }
                else{
                    setIsPending(false);
                    setError("Could not fetch Data");
                }

                
            }
            

        }

        fetchData(); // call fetchData to fetch data

        return () =>{
            controller.abort();
        }

    }, [url])
    return {data, isPending, error}
}
