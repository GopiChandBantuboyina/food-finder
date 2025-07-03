import { useEffect, useState } from "react"

import styles from './Search.module.css';// import this CSS file

const URL="https://api.spoonacular.com/recipes/complexSearch";
const apiKey="ad33e3c54ab14a399752ed2d41d6e2fa"; //but usually store inside the environment variables dont expose.

export default function Search({foodData,setFoodData}){

    const [query,setQuery]=useState("pizza");

    useEffect(()=>{
        async function fetchFood(){
            try{
                const resp= await fetch(`${URL}?query=${query}&apiKey=${apiKey}`); //dynamic url preparation

                if(!resp.ok) throw new Error("Network failed error");
                
                const data= await resp.json();

               //console.log(data.results);
               setFoodData(data.results);

            }
            catch(Error)
            {
                console.log(Error);
            }
            
        }
        fetchFood();

    },[query]);

    return(
        <div className={styles.search} >

            <input value={query} type="text" onChange={(e)=> setQuery(e.target.value)}/>
        </div>

    )
}