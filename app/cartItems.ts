
type ItemMutation = {
  id?: string;
  picture?: string;
  price?: BigInteger;
};

export type ItemRecord = ItemMutation & {
  id: string;
  createdAt: string;
};

const cartItems = {

  records: {} as Record<string, ItemRecord>,
    total: 0,
  
  async getAll(): Promise<ItemRecord[]> {
    return Object.keys(cartItems.records)
      .map((key) => cartItems.records[key])
  },

  async get(id: string): Promise<ItemRecord | null> {
    return cartItems.records[id] || null;
  },

  async create(values: ItemMutation): Promise<ItemRecord> {
    const id = values.id|| Math.random().toString(36).substring(2, 9);
    const picture = values.picture;
    const createdAt = new Date().toISOString();
    const newItem = { id, picture, createdAt, ...values };
    cartItems.records[id] = newItem;
    return newItem;
  },

  destroy(id: string): null {
    delete cartItems.records[id];
    return null;
  },
};

export async function getItems(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let Items = await cartItems.getAll();
  return Items;
}

export async function deleteAll() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let Items = await cartItems.getAll();
  for(var i = 0; i < Items.length; i++){
    deleteItem(Items[i].id);
  }
  return Items;
}

export async function createEmptyItem(values: ItemMutation) {
  const Item = await cartItems.create(values);
  return Item;
}

export async function getItem(id: string) {
  return cartItems.get(id);
}

export async function deleteItem(id: string) {
    cartItems.destroy(id);
}

export async function getTotal() {
    return cartItems.total;
  }

export async function updateTotal(price: number){
    cartItems.total = cartItems.total + price;
}