import { createContext, useState } from 'react';

const CarritoContext = createContext();

function CarritoProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agrega un producto al carrito
  const addToCart = (producto) => {
    const existe = cart.find(item => item.id === producto.id);

    if (existe) {
      const actualizado = cart.map(item =>
        item.id === producto.id
          ? { ...item, quantity: item.quantity + producto.quantity }
          : item
      );
      setCart(actualizado);
    } else {
      setCart([...cart, producto]);
    }
  };

  // Cambia la cantidad del producto (suma o resta)
  const changeQuantity = (id, nuevaCantidad) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: nuevaCantidad } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Elimina un producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Vacía el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        cart,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext, CarritoProvider };
