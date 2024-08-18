import { json, redirect } from "@remix-run/node";
import { useEffect } from "react";
import {
  Form,
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import type { 
  LinksFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs
} from "@remix-run/node";
// existing imports
import appStylesHref from "./app.css?url";
import { createEmptyContact, getContacts, updateTotal } from "./cartItems";
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  return json({
    items: [
      {
        id: "Blue Shirt",
        picture: "/blue-shirt.jpg",
        price: 5
      },
      {
        id: "Red Shirt",
        picture: "/red-shirt.jpg",
        price: 6
      },
      {
        id: "Green Shirt",
        picture: "/green-shirt.jpg",
        price: 4
      },
      {
        id: "Yellow Shirt",
        picture: "/yellow-shirt.jpg",
        price: 5
      },
      {
        id: "Purple Shirt",
        picture: "/purple-shirt.jpg",
        price: 8
      },
      {
        id: "Orange Shirt",
        picture: "/orange-shirt.png",
        price: 7
      },

    ],
  });
};

export const action = async ({
  params,
  request,
}:ActionFunctionArgs) => {
  // var id = document.getElementById("id").value
  // var picture = document.getElementById("picture").value
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const contact = await createEmptyContact(updates);
  for (const value of formData.values()) {
    console.log(value);
  }
  //console.log(valueOf(formData.get("price").toString()) + 1)
  //await updateTotal(updates.price)
  //return json({ contact });
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
        {/* <link href="./app/output.css" rel="stylesheet"></link> */}
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
