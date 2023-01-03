import React, { useState, useEffect } from "react";
import "./Contact.scss";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //================================
  // Function to fetch testimonies
  //================================

  useEffect(() => {
    const fetchCustomerTestimonies = async () => {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/comments"
      );
      const result = await response.json();
      try {
        if (response.ok) {
          setMessages(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerTestimonies();
  }, []);

  //================================
  // Update form input data
  //================================
  const updateUserData = (event) => {
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "image":
        setImage(event.target.value);
        break;
      case "message":
        setMessage(event.target.value);
        break;
      default:
        break;
    }
  };

  //==========================================
  // Submit Customers Testimonies or Comments
  //==========================================
  const submitUserComment = async (event) => {
    event.preventDefault();

    const settings = {
      method: "POST",
      body: new FormData(event.target), // formData, json data, graph ql => Data types
    };

    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + "/comments",
      settings
    );
    const result = await response.json();
    try {
      if (result.success) {
        setMessages([...messages, result.data]);
        // reset
        setFirstName("");
        setLastName("");
        setEmail("");
        setImage("");
        setMessage("");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  //==========================================
  // JSX is placed below
  //==========================================
  return (
    <section className="contact-page-container">
      <fieldset>
        <legend> We'd Love to Hear From You</legend>

        <form
          onSubmit={submitUserComment}
          encType="multipart/form-data"
          className="contact-form"
        >
          <div className="user-info">
            <div className="label-and-input-container">
              <div className="label-container">
                <label htmlFor="firstName"> First Name </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={updateUserData}
                  value={firstName}
                />
              </div>
            </div>

            <div className="label-and-input-container">
              <div className="label-container">
                <label htmlFor="lastName"> Last Name </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={updateUserData}
                  value={lastName}
                />
              </div>
            </div>

            <div className="label-and-input-container">
              <div className="label-container">
                <label htmlFor="email"> Email Address </label>
              </div>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={updateUserData}
                  value={email}
                />
              </div>
            </div>

            <div className="label-and-input-container">
              <div className="label-container">
                <label htmlFor="file"> Attach Photo </label>
              </div>
              <div className="input-container">
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={updateUserData}
                  value={image}
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <textarea
                name="message"
                cols="70"
                rows="13"
                onChange={updateUserData}
                value={message}
                placeholder="Please write your constructive comments here"
              />
            </div>
          </div>
          <button>Submit</button>
        </form>
      </fieldset>

      {/* Customers Testimonies or Comments Section */}

      <section className="customer-comments-container">
        <h2> Customer testimonies </h2>
        <div className="customer-report-container">
          {messages.map((message) => {
            return (
              <div className="specific-customer-comment-container">
                <div className="image">
                  <img src={message.image} alt="Dishes" />
                </div>
                {/* <div className="image"> <iframe src={message.image} frameborder="0" width="900" height="1200"></iframe> </div> */}
                <p className="comment"> {message.message} </p>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Contact;
