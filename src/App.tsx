import { useState } from "react";
import "./App.css";
import { AddContact } from "./components/AddContact/AddContact";
import { useScrollLock } from "./customhooks/useScrollLock";
import { ContactCard } from "./components/ContactCard/ContactCard";
import { useContact } from "./customhooks/useContact";
import { AddIcon } from "./icons/AddIcon";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { contacts, setContacts } = useContact();

  useScrollLock(isModalOpen);

  return (
    <>
      <h1>Your Contacts</h1>
      <div className="add-btn-wrapper">
        <button
          onClick={() => setIsModalOpen(true)}
          className="add-contact-btn"
        >
          Add <AddIcon />
        </button>
      </div>
      <div className="contacts-wrapper">
        {contacts?.map((contact) => {
          return <ContactCard contact={contact} key={contact?.id} />;
        })}
      </div>

      {isModalOpen && (
        <AddContact
          onSubmit={setContacts}
          onCloseModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
