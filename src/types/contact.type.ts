export interface IContact {
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
