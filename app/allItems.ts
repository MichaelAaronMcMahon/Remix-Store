import { json, LoaderFunction, LoaderFunctionArgs, redirect } from "@remix-run/node";


type ItemMutation = {
    id?: string;
    picture?: string;
    price?: number;
    quantity?: 1;
    description?: string;
  };
  
  export type ItemRecord = ItemMutation & {
    id: string;
  };

  const allItems = {
    records: {
        "BlueShirt": {id: "Blue Shirt", picture: "/blue-shirt.jpg", price: 5, quantity: 1,
            description: "A blue T-Shirt of the highest quality."
        },
        "RedShirt": {id: "Red Shirt", picture: "/red-shirt.jpg", price: 6, quantity: 1,
            description: "A red T-Shirt of the highest quality."
        },
        "GreenShirt": {id: "Green Shirt", picture: "/green-shirt.jpg", price: 4, quantity: 1,
            description: "A green T-Shirt of the highest quality."
        },
        "YellowShirt": {id: "Yellow Shirt", picture: "/yellow-shirt.jpg", price: 5, quantity: 1,
            description: "A yellow T-Shirt of the highest quality."
        },
        "PurpleShirt": {id: "Purple Shirt", picture: "/purple-shirt.jpg", price: 8, quantity: 1,
            description: "A purple T-Shirt of the highest quality."
        },
        "OrangeShirt": {id: "Orange Shirt", picture: "/orange-shirt.png", price: 7, quantity: 1,
            description: "An orange T-Shirt of the highest quality."
        },

    } as Record<string, ItemRecord>,

    async get(id: string): Promise<ItemRecord | null> {
        return allItems.records[id] || null;
    }
  };

  export async function getItem(id: string) {
    return allItems.get(id);
  }

//   async create(values: ItemMutation): Promise<ItemRecord> {
//     const id = values.id|| Math.random().toString(36).substring(2, 9);
//     const picture = values.picture;
//     const createdAt = new Date().toISOString();
//     const newItem = { id, picture, createdAt, ...values };
//     cartItems.records[id] = newItem;
//     newItem.quantity = 1;
//     //total = total + values.price;
//     cartItems.total[id] = values.price;
    
//     return newItem;
//   },
  
  var total = 0 as number;
  
  