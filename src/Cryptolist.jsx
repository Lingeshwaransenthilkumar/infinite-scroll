import Crytocard from "./Crytocard"

const Cryptolist = ({coinsData}) => {
  return (
    <div className="cryto_list">
        {coinsData.map((coin,index)=>(
            <Crytocard key={index}
            image={coin.image}
            name={coin.name}
            price={coin.current_price}/>
        ))}
      
    </div>
  )
}

export default Cryptolist
