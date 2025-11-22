"use client";

import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    // In a real application, you would save the order to a database
    // and process the payment.
    cartDispatch({ type: "CLEAR_CART" });
    router.push("/Checkout/Confirmation");
  };

  const calculateTotal = () => {
    return cartState.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">City</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Postal Code</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartState.items.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-8"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}