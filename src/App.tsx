import { useState } from "react";
import "./App.css";
import { initialContacts } from "./mock/contactState";
import { Contact } from "./types/contact.type";
import { AddContact } from "./components/AddContact/AddContact";
import phoneIcon from "./assets/telephone.png";
import emailIcon from "./assets/email.png";

function App() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <h1>Your Contacts</h1>
      <div>
        <button onClick={() => setIsModalOpen(true)}>Add new contact</button>
      </div>
      <div className="contacts-wrapper">
        {contacts?.map((contact) => {
          return (
            <div className="contact-card">
              <div className="image-background">
                <img src={contact?.image} className="avatar" />
              </div>

              <div className="name">{contact?.name}</div>
              <div className="city">{contact?.city}</div>
              <div className="phone-wrapper">
                <img src={phoneIcon} alt="" className="icon-phone" />
                <div className="phone">{contact?.phone}</div>
              </div>

              <div className="email-wrapper">
                <img src={emailIcon} alt="" className="icon-email" />
                <div className="email">{contact?.email}</div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && <AddContact onSubmit={setContacts} />}
    </>
  );
}

export default App;
