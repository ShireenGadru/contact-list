import React from "react";
import { IContact } from "../../types/contact.type";
import { useContact } from "../../customhooks/useContact";
import { PhoneIcon } from "../../icons/PhoneIcon";
import { EmailIcon } from "../../icons/EmailIcon";
import { LocationIcon } from "../../icons/LocationIcon";
import "./ContactCard.css"
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { TickIcon } from "../../icons/TickIcon";
import { CancelIcon } from "../../icons/CancelIcon";


interface IContactCard {
  contact: IContact;
}

export const ContactCard: React.FC<IContactCard> = (props) => {
  const { contact } = props;
  const { setContacts } = useContact();
  const [newData, setNewData] = React.useState(contact);

  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleDelete = () => {
    setContacts((prev) => {
      const updatedContacts = prev.filter((item) => {
        return item?.id !== contact?.id;
      });
      return updatedContacts;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSave = () => {
    setContacts((prev) => {
      const updatedContacts = prev.map((item) => {
        if (item.id === contact.id) {
          return { ...newData, id: contact?.id };
        }
        return item;
      });

      return updatedContacts;
    });

    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setNewData(contact);
  };

  return (
    <div className="contact-card">
      <div className="image-background">
        <img src={contact?.image} className="avatar" />
      </div>

      {isEditMode ? (
        <div>
          {" "}
          <input
            type="text"
            name="name"
            className="edit-name"
            value={newData?.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            className="edit-city"
            value={newData?.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            className="edit-phone"
            value={newData?.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            className="edit-email"
            value={newData?.email}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <div className="name">{contact?.name}</div>
          <div className="city-wrapper">
            {" "}
            <LocationIcon />
            <div className="city">{contact?.city}</div>
          </div>

          <div className="phone-wrapper">
            <PhoneIcon />
            <div className="phone">{contact?.phone}</div>
          </div>

          <div className="email-wrapper">
            <EmailIcon />
            <div className="email">{contact?.email}</div>
          </div>
        </div>
      )}
      {isEditMode ? (
        <div className="button-wrapper">
          <button onClick={handleSave} className="save-btn"> <TickIcon /></button>
          <button onClick={handleCancel} className="cancel-btn"> <CancelIcon /></button>
        </div>
      ) : (
        <div className="button-wrapper">
          {!isEditMode && <button onClick={handleEdit} className="edit-button"><EditIcon/></button>}
          <button onClick={handleDelete} className="delete-button"><DeleteIcon /></button>
        </div>
      )}
    </div>
  );
};
