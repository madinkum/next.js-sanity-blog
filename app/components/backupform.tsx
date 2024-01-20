// "use client";
// import React from "react";
// import { useState } from "react";
// import emailjs from 'emailjs-com';
// import axios from 'axios';

// export default function Form() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isSubscribed, setIsSubscribed] = useState(false);

//   const sendThankYouEmail = async () => {
//     try {
//       const templateParams = {
//         to_email: email,
//         subject: 'Thank You for Subscribing!',
//         message: 'Thank you for subscribing to our blog!',
//       };
    

        
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//         templateParams,
//         process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
//       );
      
//     } catch (error) {
//       console.error('Error sending thank you email:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
        
//         const response = await axios.post('/api/subscribe', { email });
  
//         if (response.status === 200) {
//           setIsSubscribed(true);
//           await sendThankYouEmail(); 
//         }
//       } catch (error) {
//         console.error('Error subscribing to the list:', error);
//       }
//     };

//   return (
    
//     <div>
      
//       <h1 className="text-primary font-bold mb-5 text-xl text-center">
//         Subscribe
//       </h1>
//       {isSubscribed ? (
//         <p>Thank you for subscribing! A confirmation email has been sent.</p>
//       ) : (
//       <form
//         className=" md:items-center w-full  max-w-xl"
//         onSubmit={handleSubmit}
//         method="POST"
        
//       >
//         <br />
//         <div className="md:flex md:items-center mb-6">
//           <div className="md:w-1/3">
//             <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
//               First Name
//             </label>
//           </div>
//           <div className="md:w-2/3">
//             <input
//               className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//               id="inline-first-name"
//               name="first name"
//               autoComplete="First Name"
//               onChange={(e) => setFirstName(e.target.value)}
//               value={firstName}
//               required
//             />
//           </div>
//         </div>

//         <div className="md:flex md:items-center mb-6">
//           <div className="md:w-1/3">
//             <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
//               Last Name
//             </label>
//           </div>
//           <div className="md:w-2/3">
//             <input
//               className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//               id="inline-last-name"
//               type="last name"
//               name="last name"
//               autoComplete="Last Name"
//               onChange={(e) => setLastName(e.target.value)}
//               value={lastName}
//               required
//             />
//           </div>
//         </div>

//         <div className="md:flex md:items-center mb-6">
//           <div className="md:w-1/3">
//             <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
//               Email
//             </label>
//           </div>
//           <div className="md:w-2/3">
//             <input
//               className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//               id="inline-email"
//               required
//               type="email"
//               name="email"
//               autoComplete="Email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//             />
//           </div>
//         </div>

//         <div className="md:flex md:items-center">
//           <div className="md:w-1/3"></div>
//           <div className="md:w-2/3">
//             <button
//               className="shadow bg-pink-600 hover:bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
//               type="submit"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//         <br />
//       </form>
//       )}
//     </div>
//   );
// }
