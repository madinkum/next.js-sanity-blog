"use client";
import React from "react";
import { useState } from "react";

export default function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h1 className="text-primary font-bold mb-5 text-xl text-center">
        Subscribe
      </h1>

      <form
        className=" mb-6 border w-full "
        action="mailto:MadinkuFinny@gmail.com"
        method="post"
      >
        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">
            First Name
            <input
              className='border py-2 px-3 w-full text-grey-darkest" type="text" name="first_name" id="first_name"'
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">
            Last Name
            <input
              className='border py-2 px-3 w-full text-grey-darkest" type="text" name="last_name" id="last_name"'
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>

        <div className="flex flex-col mb-6">
          <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">
            Email
            <input
              className='border py-2 px-3 w-full text-grey-darkest" type="text" name="email" id="email"'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
        </div>

        <button
          className="btn-primary block bg-pink hover:bg-pink-dark  uppercase text-lg mx-auto p-4 rounded"
          disabled={isLoading}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
