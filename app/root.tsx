import { json, redirect } from "@remix-run/node";
import {
  Form,
  Outlet,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import type { 
  LinksFunction,
  ActionFunctionArgs
} from "@remix-run/node";
// existing imports
import appStylesHref from "./app.css?url";
import { createItem, } from "./cartItems";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  return json({
    items: [
      {
        id: "Blue Shirt",
        picture: "/blue-shirt.jpg",
        price: 5,
        quantity: 1
      },
      {
        id: "Red Shirt",
        picture: "/red-shirt.jpg",
        price: 6,
        quantity: 1
      },
      {
        id: "Green Shirt",
        picture: "/green-shirt.jpg",
        price: 4,
        quantity: 1
      },
      {
        id: "Yellow Shirt",
        picture: "/yellow-shirt.jpg",
        price: 5,
        quantity: 1
      },
      {
        id: "Purple Shirt",
        picture: "/purple-shirt.jpg",
        price: 8,
        quantity: 1
      },
      {
        id: "Orange Shirt",
        picture: "/orange-shirt.png",
        price: 7,
        quantity: 1
      },
    ],
  });
};

export const action = async ({
  request,
}:ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const Item = await createItem(updates);
  return redirect(`/`);
};

export default function App() {
  const { items } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="store" style={{float:"left"}}>
          
          <h1>Shop</h1>
          <br></br>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.id}
                <br></br>
                ${item.price}
                <br></br>
                <img src={item.picture} width="120" ></img>
                <Form method="post" className="border-2">
                  <input type="hidden" id="id" name="id" value={item.id}></input>
                  <input type="hidden" id="picture" name="picture" value={item.picture}></input><br></br>
                  <input type="hidden" id="price" name="price" value={item.price}></input><br></br>
                  <button type="submit" >Add to cart</button>
                </Form>
                <br></br>
                <br></br>
              </li>
            ))}
          </ul>
        </div>
        <div id="cart" style={{float:"right"}}>
          <Outlet />
        </div>
      </body>
    </html>
  );
}
