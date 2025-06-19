import React, { createContext, useState } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Agregar al carrito
  const addToCart = (product, cantidad = 1) => {
    const cantidadValida = parseInt(cantidad);

    if (isNaN(cantidadValida) || cantidadValida <= 0) return;

    const itemExistente = cart.find(item => item.id === product.id);

    if (itemExistente) {
      const actualizado = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + cantidadValida }
          : item
      );
      setCart(actualizado);
    } else {
      setCart([...cart, { ...product, quantity: cantidadValida }]);
    }
  };

  // ✅ Quitar solo 1 unidad del producto
  const removeOneFromCart = (productId) => {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    if (item.quantity > 1) {
      const actualizado = cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(actualizado);
    } else {
      // Si solo queda 1, se elimina completamente
      removeFromCart(productId);
    }
  };

  // ✅ Eliminar completamente un producto
  const removeFromCart = (productId) => {
    const actualizado = cart.filter(item => item.id !== productId);
    setCart(actualizado);
  };

  // Cambiar la cantidad de un producto directamente
  const changeQuantity = (productId, cantidad) => {
    const nuevaCantidad = parseInt(cantidad);
    if (isNaN(nuevaCantidad) || nuevaCantidad < 0) return;

    if (nuevaCantidad === 0) {
      removeFromCart(productId);
      return;
    }

    const actualizado = cart.map(item =>
      item.id === productId ? { ...item, quantity: nuevaCantidad } : item
    );
    setCart(actualizado);
  };

  // ✅ Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeOneFromCart,
      removeFromCart,
      clearCart,
      changeQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};
