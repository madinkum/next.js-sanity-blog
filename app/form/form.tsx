"use client";
import React from "react";
import { useState } from "react";




export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  

  return (
    <div>
      <h1 className="text-primary font-bold mb-5 text-xl text-center">
        Subscribe
      </h1>

      <form
        className=" mb-6 border w-full "
        action="https://formeezy.com/api/v1/forms/65979d2206eb52000815ba69/submissions"
        method="post"
      >
        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">
            First Name
            <input
              className='border py-2 px-3 w-full text-grey-darkest  name="first_name" id="first_name"'
              type="text"
              autoComplete="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </label>
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">
            Last Name
            <input
              className='border py-2 px-3 w-full text-grey-darkest"  name="last_name" id="last_name"'
              type="text"
              autoComplete="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </label>
        </div>

        <div className="flex flex-col mb-6">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">
            Email
            <input
              className='border py-2 px-3 w-full text-grey-darkest"  name="email" id="email"'
              required
              type="text"
              autoComplete="Email" 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
        </div>

        <button
          className="btn-primary block bg-pink hover:bg-pink-dark  uppercase text-lg mx-auto p-4 rounded"
          type="submit"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
