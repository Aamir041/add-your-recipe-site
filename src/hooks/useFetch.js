import { useEffect, useState } from "react"

export default function useFetch(url,method="GET") {
    const [data,setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error,setError] = useState(null);
    const [options,setOptions] = useState(null);

    const postData = (newData) => {
        setOptions({
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newData) // turns js object to json string
            })
    }

    useEffect(() => {

        const controller = new AbortController(); // for abort request when fetching data

        const fetchData = async (fetchOptions) => {
            setIsPending(true);

            try{
                const res = await fetch(url, {...fetchOptions,signal:controller.signal});
                
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

        //  if just wanna fetch data then call  fetchData without argument
        if(method === "GET"){
            fetchData();
        }
        if(method === "POST" && options){
            fetchData(options)
        }

        return () =>{
            controller.abort();
        }

        // if options has some value then rerender page
        // for method change also rerender the page
    }, [url,options,method])

    
    
    return {data, isPending, error, postData}
}
