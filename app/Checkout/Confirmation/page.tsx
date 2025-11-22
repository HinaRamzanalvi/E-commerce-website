"use client";

import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-lg mb-8">
        Your order has been placed successfully.
      </p>
      <Link href="/">
        <span className="text-blue-500 hover:underline">Continue Shopping</span>
        
      </Link>
    </div>
  );
}