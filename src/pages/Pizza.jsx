import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext"; 
import { formatNumber } from "../helpers/formatNumber";
import { API_URL } from "../contsants";

const Pizza = () => {
  const { id } = useParams(); 
  const [pizza, setPizza] = useState({});
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {   
    const fetchPizza = async () => {
      try {
        const response = await fetch(`${API_URL}/pizzas/${id}`);
        const data = await response.json();
        setPizza(data); 
      } catch (error) {
        console.error("Error al obtener la pizza:", error);
      }
    };

    fetchPizza();
  }, [id]);

  return (
    <main className="container mt-5">
      <article className="card mb-3">
        <div className="row g-0 align-items-center">
          <div className="col-md-6">
            <img
              src={pizza.img}
              className="img-fluid rounded-start"
              alt={pizza.name}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title text-capitalize">{pizza.name}</h2>
              <p className="card-text">{pizza.desc}</p>
              <ul>
                {pizza.ingredients?.map((ingredient, i) => (
                  <li key={i}>&#127829; {ingredient}</li>
                ))}
              </ul>
              <div className="d-flex justify-content-around align-items-center pt-2">
                <h4 className="m-0">Precio: ${formatNumber(pizza.price)}</h4>
                
                <button
                  className="btn btn-dark"
                  onClick={() =>
                    addToCart({
                      id: pizza.id,
                      price: pizza.price,
                      name: pizza.name,
                      img: pizza.img,
                    })
                  }
                >
                  Añadir &#128722;
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Pizza;