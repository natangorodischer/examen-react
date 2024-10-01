import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useUser } from "../context/UserContext"; 
import { formatNumber } from "../helpers/formatNumber";
import { API_URL } from "../contsants";

const Cart = () => {
  const { carrito, increment, decrement, total, emptyCart } = useContext(CartContext);
  const { token } = useUser(); 
  const [checkoutStatus, setCheckoutStatus] = useState(null);

  const isCartEmpty = carrito.length === 0; 
  const isLoggedOut = !token; 

  const processPayment = async () => {
    try {
      const response = await fetch(`${API_URL}/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart: carrito }),
      });

      if (response.ok) {
        emptyCart()
        setCheckoutStatus("success");
      } else {
        setCheckoutStatus("error");
      }
    } catch (error) {
      console.error("Error durante el checkout:", error);
      setCheckoutStatus("error");
    }
  };

  return (
    <main className="container">
      <div className="p-5">
        <h5>Detalles del pedido:</h5>
        {checkoutStatus === "success" ? (
          <div className="alert alert-success" role="alert">
            ¡Pago procesado con éxito! Gracias por su compra.
          </div>
        ) : checkoutStatus === "error" ? (
          <div className="alert alert-danger" role="alert">
            Hubo un error al procesar el pago. Por favor, inténtelo de nuevo.
          </div>
        ) : (
          <div>
            {carrito.map((producto, i) => (
              <div key={i} className="d-flex justify-content-between py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <img src={producto.img} width="50" alt="" />
                  <h6 className="mb-0 text-capitalize p-2">{producto.name}</h6>
                </div>

                <div className="d-flex justify-content-end align-items-center">
                  <h6 className="mb-0 pe-3">
                    ${formatNumber(producto.price * producto.count)}
                  </h6>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => decrement(i)}
                  >
                    -
                  </button>
                  <b className="px-3">{producto.count}</b>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => increment(i)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <h2 className="my-4">Total: ${formatNumber(total)}</h2>
            <button
              className="btn btn-dark"
              disabled={isCartEmpty || isLoggedOut}
              onClick={processPayment}
            >
              Pagar
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;