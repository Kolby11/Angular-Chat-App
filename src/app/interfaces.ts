export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}
export interface IUserData {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}
export interface IGenderData {
  count: number;
  gender: string;
  name: string;
  probability: number;
}
export interface IStateInfo {
  post_code: number;
  country: string;
  country_abbreviation: string;
  places: [
    {
      place_name: string;
      longitude: number;
      state: string;
      state_abbreviation: string;
      latitude: number;
    }
  ];
}
export interface IChat {
  id: number;
  users: number[];
  messages: IMessage[];
}

export interface IMessage {
  from: number;
  message: string;
  sendDate: string;
}
