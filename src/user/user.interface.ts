interface IChild {
  id: string;
  parentId: string;
  name: string;
  dob: Date;
}

interface IUser {
  id: string;
  name: string;
  dob: Date;
  address: string;
  contactNumber: string;
  children: Array<IChild>;
}

export {IChild, IUser}
