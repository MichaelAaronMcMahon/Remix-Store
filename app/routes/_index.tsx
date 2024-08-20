import type { MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { 
  Link, 
  Outlet, 
  useLoaderData,
  useNavigation,
  Form,
  NavLink,

 } from "@remix-run/react";
 import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
 import invariant from "tiny-invariant";



export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

import { getContact, getContacts, deleteContact, getTotal, updateTotal } from "../cartItems";
var total = 0;
export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const items = await getContacts();
  if (!items) {
    throw new Response("Not Found", { status: 404 });
  }
  total = await getTotal();
  return json({ items });
};
export const action = async ({
  request,
}:ActionFunctionArgs) => {
  // var id = document.getElementById("id").value
  // var picture = document.getElementById("picture").value
  const formData = await request.formData();
  const id = formData.get('id') as string
  const contact = await deleteContact(id);
  //await updateTotal(formData.get('price'))
  for (const value of formData.values()) {
    console.log(value);
  }
  //return json({ contact });
  return redirect(`/`);
};

export default function Index() {
  const { items } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="store">
          <h1>Cart</h1>
          {/* <h1>Total: ${total}</h1> */}
          <Form
             action="purchase"
             method="post"
             onSubmit={(event) => {
               const response = confirm(
                 "Would you like to place this order?"
               );
               if (!response) {
                 event.preventDefault();
               }
             }}
           >
            <button type="submit">Purchase</button>
          </Form>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.id}
                <br></br>
                ${item.price}
                {/* ${items.total} */}
                <br></br>
                <img src={item.picture} width="120" ></img>
                <Form method="post">
                  <input type="hidden" id="id" name="id" value={item.id}></input>
                  <input type="hidden" id="picture" name="picture" value={item.picture}></input><br></br>
                  <input type="hidden" id="price" name="price" value={item.price}></input><br></br>
                  <button type="submit">Delete</button>
                </Form>
                <br></br>
                <br></br>
              </li>
            ))}
          </ul>
        </div>

      </body>
    </html>
