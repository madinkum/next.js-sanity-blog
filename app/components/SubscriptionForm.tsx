// "use client";
// import React from "react";
// import { useState } from "react";

// const SubscriptionForm = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   return (
//     <div id="mc_embed_shell">
//       <link
//         href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
//         rel="stylesheet"
//         type="text/css"
//       />

//       <div id="mc_embed_signup" className="text-pink-600">
//         <form
//           action="https://gmail.us21.list-manage.com/subscribe/post?u=283f412fdcd84ba4f743b199f&amp;id=cd98414cdc&amp;f_id=00a9eee6f0"
//           method="post"
//           id="mc-embedded-subscribe-form"
//           name="mc-embedded-subscribe-form"
//           className="validate"
//           target="_self"
//           noValidate={true}
//         >
//           <div id="mc_embed_signup_scroll">
//             <h2>Subscribe</h2>
//             <div className="indicates-required">
//               <span className="asterisk">*</span> indicates required
//             </div>
//             <div className="mc-field-group">
//               <label htmlFor="mce-EMAIL">
//                 Email Address
//                 <span className="asterisk">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="EMAIL"
//                 className="required bg-white"
//                 id="mce-EMAIL"
//                 required
//                 autoComplete="Email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
                
//               />
//             </div>
//             <div className="mc-field-group">
//               <label htmlFor="mce-FNAME">First Name </label>
//               <input
//                 type="text"
//                 name="first name"
//                 className="text bg-white"
//                 id="mce-FNAME"
//                 onChange={(e) => setFirstName(e.target.value)}
//                 value={firstName}
//               />
//             </div>
//             <div className="mc-field-group">
//               <label htmlFor="mce-LNAME">Last Name </label>
//               <input
//                 name="last name"
//                 autoComplete="Last Name"
//                 onChange={(e) => setLastName(e.target.value)}
//                 value={lastName}
//                 required
//                 type="text"
//                 className=" text bg-white"
//                 id="mce-LNAME"
//               ></input>
//             </div>
//             <div id="mce-responses" className="clear foot">
//               <div className="response" id="mce-error-response"></div>
//               <div className="response" id="mce-success-response"></div>
//             </div>
//             <div id="one" aria-hidden="true">
              
//               <input
//                 type="text"
//                 name="b_283f412fdcd84ba4f743b199f_cd98414cdc"
//                 tabIndex={-1}
//                 value=""
//               />
//             </div>
//             <div className="optionalParent">
//               <div className="clear foot">
//                 <input
//                   type="submit"
//                   name="subscribe"
//                   id="mc-embedded-subscribe"
//                   className="button"
//                   value="Subscribe"
//                 ></input>
//                 <p>
//                   <a
//                     href="http://eepurl.com/iIoEwk"
//                     title="Mailchimp - email marketing made easy and fun"
//                   >
//                     <span className="two">
                      
//                     </span>
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionForm;
"use client";
import React from "react";
import { useState } from "react";
import emailjs from 'emailjs-com';
import axios from 'axios';

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const sendThankYouEmail = async () => {
    try {
      const templateParams = {
        to_email: email,
        subject: 'Thank You for Subscribing!',
        message: 'Thank you for subscribing to our blog!',
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      );

    } catch (error) {
      console.error('Error sending thank you email:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

        const response = await axios.post('/api/subscribe', { email });

        if (response.status === 200) {
          setIsSubscribed(true);
          await sendThankYouEmail();
        }
      } catch (error) {
        console.error('Error subscribing to the list:', error);
      }
    };

  return (

    <div>

      <h1 className="text-primary font-bold mb-5 text-xl text-center">
        Subscribe
      </h1>
      {isSubscribed ? (
        <p>Thank you for subscribing! A confirmation email has been sent.</p>
      ) : (
      <form
        className=" md:items-center w-full  max-w-xl"
         onSubmit={handleSubmit} 
        method="POST"
 

      >
        <br />
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              First Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-first-name"
              name="first name"
              autoComplete="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Last Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-last-name"
              type="last name"
              name="last name"
              autoComplete="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-email"
              required
              type="email"
              name="to_email"
              autoComplete="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-pink-600 hover:bg-pink-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
        <br />
      </form>
      )}
    </div>
  );
}