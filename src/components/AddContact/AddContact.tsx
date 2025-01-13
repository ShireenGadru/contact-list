import React, { useState } from "react";
import "./AddContact.css";
import { IContact, IAddContact } from "../../types/contact.type";
import ReactDOM from "react-dom";
import { intitialFormData } from "../../mock/contactState";

export const AddContact = (props: IAddContact) => {
  const { onSubmit, onCloseModal } = props;
  const [formData, setFormData] = useState<IContact>(intitialFormData);
  const [error, setError] = useState<Partial<IContact>>({});
  const id = crypto.randomUUID();

  const validateForm = () => {
    const errorObj: Partial<IContact> = {};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formData?.name.trim() === "") {
      errorObj.name = "Name cannot be empty";
    }

    if (formData?.phone.length < 10) {
      errorObj.phone = "Phone Number must be > 10 digit";
    }

    if (formData?.phone.trim() === "") {
      errorObj.phone = "Phone Number cannot be empty";
    }

    if (formData?.email.trim() === "") {
      errorObj.email = "Email cannot be empty";
    }
    if (!emailRegex.test(formData?.email)) {
      errorObj.email = "Invalid email";
    }

    if (formData?.city.trim() === "") {
      errorObj.city = "City cannot be empty";
    }

    if (formData?.image.trim() === "") {
      errorObj.image = "Image cannot be empty";
    }

    return errorObj;
  };

  const hasErrors = (error: Partial<IContact>): boolean => {
    return Object.keys(error).length > 0 ? true : false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;

    setFormData((prev) => {
      return { ...prev, [inputName]: value };
    });
    setError((prev) => {
      const newErrors = { ...prev };
      delete newErrors[inputName as keyof IContact];
      return newErrors;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (hasErrors(formErrors)) {
      setError(formErrors);
    } else {
      onSubmit((prev) => [...prev, {...formData, id}]);
      onCloseModal();
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="close-btn-wrapper">
          {" "}
          <button className="close-button" onClick={onCloseModal}>
            X
          </button>
        </div>

        <h2>Add New Contact</h2>
        <form action="" className="add-contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name..."
            value={formData?.name}
            onChange={handleChange}
            className={error?.name && "error-input"}
          />
          {error?.name && <div className="error">{error?.name}</div>}

          <input
            type="number"
            name="phone"
            placeholder="Phone number..."
            value={formData?.phone}
            onChange={handleChange}
            className={error?.phone && "error-input"}
          />
          {error?.phone && <div className="error">{error?.phone}</div>}
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={formData?.email}
            onChange={handleChange}
            className={error?.email && "error-input"}
          />
          {error?.email && <div className="error">{error?.email}</div>}
          <input
            type="text"
            name="city"
            placeholder="City..."
            value={formData?.city}
            onChange={handleChange}
            className={error?.city && "error-input"}
          />
          {error?.city && <div className="error">{error?.city}</div>}
          <input
            type="text"
            name="image"
            placeholder="Image url..."
            value={formData?.image}
            onChange={handleChange}
            className={error?.image && "error-input"}
          />
          {error?.image && <div className="error">{error?.image}</div>}
          <button className="add-btn">Add</button>
        </form>
      </div>
    </div>,
    document.getElementById("portal-root")!
  );
};
