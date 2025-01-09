import React, { useState } from "react";
import "./AddContact.css";
import { IAddContact, IErrorState } from "../../types/contact.type";
import ReactDOM from "react-dom";
import { initialError } from "../../mock/contactState";

export const AddContact = (props: IAddContact) => {
  const { onSubmit } = props;
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState<IErrorState>(initialError);

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name.trim() === "") {
      setError((prev) => {
        return { ...prev, nameError: "Name cannot be empty" };
      });
    }
    if (phone.length < 10) {
      setError((prev) => {
        return { ...prev, phoneError: "Phone Number must be > 10 digit" };
      });
    }

    if (phone.trim() === "") {
      setError((prev) => {
        return { ...prev, phoneError: "Phone Number cannot be empty" };
      });
    }

    if (email.trim() === "") {
      setError((prev) => {
        return { ...prev, emailError: "Email cannot be empty" };
      });
    }

    if (!emailRegex.test(email)) {
      setError((prev) => {
        return { ...prev, emailError: "Invalid email" };
      });
    }

    if (city.trim() === "") {
      setError((prev) => {
        return { ...prev, cityError: "City cannot be empty" };
      });
    }

    if (image.trim() === "") {
      setError((prev) => {
        return { ...prev, imageError: "Image cannot be empty" };
      });
    }
  };

  const hasErrors = (): boolean => {
    return Object.keys(error).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    console.log("here", hasErrors());
    
    if (!hasErrors()) {
      onSubmit((prev) => [
        ...prev,
        {
          name,
          phone,
          email,
          city,
          image,
        },
      ]);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Contact</h2>
        <form action="" className="add-contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={error?.nameError && "error-input"}
          />
          {error?.nameError && <div className="error">{error?.nameError}</div>}

          <input
            type="number"
            name="phone"
            placeholder="Phone number..."
            value={phone}
            onChange={(e) => setPhone(String(e.target.value))}
            className={error?.phoneError && "error-input"}
          />
          {error?.phoneError && (
            <div className="error">{error?.phoneError}</div>
          )}
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error?.emailError && "error-input"}
          />
          {error?.emailError && (
            <div className="error">{error?.emailError}</div>
          )}
          <input
            type="text"
            name="city"
            placeholder="City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={error?.cityError && "error-input"}
          />
          {error?.cityError && <div className="error">{error?.cityError}</div>}
          <input
            type="text"
            name="image"
            placeholder="Image url..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={error?.imageError && "error-input"}
          />
          {error?.imageError && (
            <div className="error">{error?.imageError}</div>
          )}
          <button className="add-btn">Add</button>
        </form>
      </div>
    </div>,
    document.getElementById("portal-root")!
  );
};
