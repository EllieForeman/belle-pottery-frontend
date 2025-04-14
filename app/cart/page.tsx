// "use client";

// import Image from "next/image";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
// );

// export default function CartPage() {
//   const { cart, removeFromCart, clearCart } = useCart();

//   const handleCheckout = async () => {
//     const stripe = await stripePromise;
//     if (!stripe) return;

//     const response = await fetch("/api/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ cart }),
//     });

//     const session = await response.json();
//     stripe.redirectToCheckout({ sessionId: session.id });
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-3xl font-bold mb-6">Your Basket</h1>
//       {cart.length === 0 ? (
//         <p>Your basket is empty.</p>
//       ) : (
//         <>
//           <ul>
//             {cart.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center gap-4 border-b py-4"
//               >
//                 <Image
//                   src={item.image || "/placeholder.jpg"}
//                   alt={item.title}
//                   width={80}
//                   height={80}
//                   className="object-cover"
//                 />
//                 <div className="flex-1">
//                   <h2 className="text-lg font-semibold">{item.title}</h2>
//                   <p>
//                     £{item.price} x {item.quantity}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="text-red-500"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={handleCheckout}
//             className="mt-6 px-6 py-3 bg-black text-white rounded"
//           >
//             Proceed to Checkout
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
