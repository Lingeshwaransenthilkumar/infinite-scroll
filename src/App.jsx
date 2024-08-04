import { useState,useEffect } from "react";
import Cryptolist from "./Cryptolist";


function App(){
  const [coinsData,setCoinsData]=useState([]);
  // first we are setting page
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    async function Fetchdata(){
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`);
    const data = await res.json();
    // to add loader
    //console.log(data)
    setCoinsData((prev)=>[...prev,...data]);
    setLoading(false);
    }
    Fetchdata()
    .then("executed successfully")
    .catch((err)=>{console.log("Error occured is ",err)})
    // whenever page changes or increases function called 
  },[page])

  // to add event listener
  function handleScroll(){
    // height of app
    //console.log(document.documentElement.scrollHeight);
    // width of app
    //console.log(document.documentElement.scrollTop)
    // window height
    //console.log(window.innerHeight)
    // it will override over elements so we ant to use previous states
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      setLoading(true);
      setPage((prev)=>prev+1)
      }
  }
  useEffect(()=>{
    // function to handle scroll
    window.addEventListener("scroll",handleScroll);
    // clean up function
    return ()=> window.removeEventListener("scroll",handleScroll)
  },[])


  return(
    <>
      <h1>Crypto Gallery</h1>
      <Cryptolist coinsData={coinsData}/>
      {loading && <div className="loader"></div> }
    </>
  )
}

export default App;