export interface IContact {
  id: string;
  name: string;
  phone: string;
  city: string;
  image: string;
  email: string;
}

export interface IAddContact {
  onSubmit: React.Dispatch<React.SetStateAction<IContact[]>>;
  onCloseModal: () => void;
}

export interface IContactContext {
  contacts: IContact[];
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
}
