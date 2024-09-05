/**
 * The typescript file which handles the data model for the cart and defines the functions which are used to edit it. 
 * The functions are imported across the other routes to add items, delete items and edit item quantity.
 */

type ItemMutation = {
  id?: string;
  picture?: string;
  price?: number;
  quantity?: 1;
};

export type ItemRecord = ItemMutation & {
  id: string;
  createdAt: string;
};

var total = 0 as number;

const cartItems = {

  records: {} as Record<string, ItemRecord>,
  //total: 0 as number,
  total: {} as Record<string, number>,
  
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
    newItem.quantity = 1;
    //total = total + values.price;
    cartItems.total[id] = values.price;
    
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

export async function createItem(values: ItemMutation) {
  const Item = await cartItems.create(values);
  return Item;
}

export async function updatePrice(id: string){
  let updateItem = cartItems.records[id];
  updateItem.quantity += 1;
  //updateItem.price += parseInt(updateItem.price);
  var origPrice = 0
  if(id == "Blue Shirt" || id == "Yellow Shirt"){
    origPrice = 5
  }
  if(id == "Red Shirt"){
    origPrice = 6
  }
  if(id == "Green Shirt"){
    origPrice = 4
  }
  if(id == "Purple Shirt"){
    origPrice = 8
  }
  if(id == "Orange Shirt"){
    origPrice = 7
  }
  var newPrice = 0 as number;
  newPrice = parseInt(origPrice) * parseInt(updateItem.quantity);
  updateItem.price = newPrice;

}

export async function decrementPrice(id: string){
  let updateItem = cartItems.records[id];
  if (updateItem.quantity == 1){
    deleteItem(id);
  }
  else{
    updateItem.quantity -= 1;
    //updateItem.price += parseInt(updateItem.price);
    var origPrice = 0
    if(id == "Blue Shirt" || id == "Yellow Shirt"){
      origPrice = 5
    }
    if(id == "Red Shirt"){
      origPrice = 6
    }
    if(id == "Green Shirt"){
      origPrice = 4
    }
    if(id == "Purple Shirt"){
      origPrice = 8
    }
    if(id == "Orange Shirt"){
      origPrice = 7
    }
    var newPrice = 0 as number;
    newPrice = parseInt(origPrice) * parseInt(updateItem.quantity);
    updateItem.price = newPrice;
  }
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

export async function confirmFunction() {
  
  confirm()
}