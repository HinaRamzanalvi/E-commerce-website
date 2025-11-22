

"use client";

import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Cart() {
  const { state, dispatch } = useCart();

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const calculateTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="">
      <h1 className="text-5xl mt-7 ml-11 font-bold">Your Shopping Cart</h1>
      <div className="px-4 lg:px-16 py-8">
        <div className="flex flex-wrap justify-center lg:justify-between gap-8">
          <div className="flex-1 max-w-3xl">
            {state.items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              state.items.map((item) => (
                <div
                  key={item.id}
                  className="w-full p-4 shadow-lg rounded-lg flex gap-4 mt-4"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={150}
                    height={150}
                    className="self-center"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-gray-800 font-medium text-base">
                        {item.title}
                      </p>
                      <p className="text-gray-800 font-medium text-sm">
                        MRP: ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-gray-500 text-sm">
                        Quantity:
                      </p>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16 text-center border rounded"
                      />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button onClick={() => handleRemoveFromCart(item.id)}>
                        <RiDeleteBin6Line className="text-gray-400 w-6 h-6 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {state.items.length > 0 && (
            <div className="w-full lg:w-1/3 p-4 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-xl mb-4">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <Link href="/Checkout">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
                  Checkout
                </button>
              </Link>
              <button
                onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="w-full bg-red-500 text-white py-2 rounded-lg mt-2"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
        
