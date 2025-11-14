

export default function ProductCarts(props) {
    console.log(props);
    return(
        <div className="carts"> 
            <img className="productImage" src={props.picture}/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <h2>price: {props.price}</h2>
            <button className="addToCart">Add to Cart</button>
            <button className="buynow">Buy Now</button>
        </div>
    )
}