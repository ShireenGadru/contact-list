import { useContext } from "react";
import { ContactContext } from "../context/Contact";

export const useContact = () => {
  const contacts = useContext(ContactContext);
  return contacts;
};
