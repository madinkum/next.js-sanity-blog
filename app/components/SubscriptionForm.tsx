"use client";
import React from "react";
import { useState } from "react";

const SubscriptionForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div id="mc_embed_shell">
      <link
        href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
        rel="stylesheet"
        type="text/css"
      />

      <div id="mc_embed_signup" className="text-pink-600">
        <form
          action="https://gmail.us21.list-manage.com/subscribe/post?u=283f412fdcd84ba4f743b199f&amp;id=cd98414cdc&amp;f_id=00a9eee6f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_self"
          noValidate={true}
        >
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe</h2>
            <div className="indicates-required">
              <span className="asterisk">*</span> indicates required
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">
                Email Address
                <span className="asterisk">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                className="required bg-white"
                id="mce-EMAIL"
                required
                autoComplete="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-FNAME">
                First Name
                <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="FNAME"
                className="required text bg-white"
                id="mce-FNAME"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-LNAME">
                Last Name
                <span className="asterisk">*</span>
              </label>
              <input
                name="LNAME"
                autoComplete="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                type="text"
                className="required text bg-white"
                id="mce-LNAME"
              ></input>
            </div>
            <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response"></div>
              <div className="response" id="mce-success-response"></div>
            </div>
            <div id="one" aria-hidden="true">
              <input
                type="text"
                name="b_283f412fdcd84ba4f743b199f_cd98414cdc"
                tabIndex={-1}
                value=""
              />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                  value="Subscribe"
                ></input>
                <p>
                  <a
                    href="http://eepurl.com/iIoEwk"
                    title="Mailchimp - email marketing made easy and fun"
                  >
                    <span className="two"></span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
