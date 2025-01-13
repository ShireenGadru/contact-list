import { createContext, useState } from "react";
import { initialContacts } from "../mock/contactState";
import { IContact, IContactContext } from "../types/contact.type";

export const ContactContext = createContext<IContactContext>({
  contacts: [],
  setContacts: () => {},
});

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contacts, setContacts] = useState<IContact[]>(initialContacts);

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
