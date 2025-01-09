export interface Contact {
  name: string;
  phone: string;
  city: string;
  image: string;
  email: string;
}

export interface IAddContact {
  onSubmit: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export interface IErrorState {
  nameError: string;
  phoneError: string;
  emailError: string;
  cityError: string;
  imageError: string;
}
