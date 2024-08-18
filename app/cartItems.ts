
type ContactMutation = {
  id?: string;
  picture?: string;
  price?: BigInteger;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

const fakeContacts = {

  records: {} as Record<string, ContactRecord>,
    total: 0,
  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {

    const id = values.id|| Math.random().toString(36).substring(2, 9);
    const picture = values.picture;
    const createdAt = new Date().toISOString();
    const newContact = { id, picture, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  return contacts;
}

export async function deleteAll() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  console.log(contacts.length);
  for(var i = 0; i < contacts.length; i++){
    console.log(contacts[i].id);
    deleteContact(contacts[i].id);
  }
  return contacts;
}

export async function createEmptyContact(values: ContactMutation) {
  const contact = await fakeContacts.create(values);
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function deleteContact(id: string) {
    fakeContacts.destroy(id);
}

export async function getTotal() {
    return fakeContacts.total;
  }

export async function updateTotal(price: number){
    fakeContacts.total = fakeContacts.total + price;
}

// export async function sumPrice(){
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     let contacts = await fakeContacts.getAll();
//     var len = contacts.length;
//     let sum = 0
//     for (var i=0; i<contacts.length; i++){
//         let sum = sum + contacts[i].price;
//     }
//     return sum;
// }
