import { json, redirect, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { getItem } from "~/allItems";
import {
    Form,
  } from "@remix-run/react";
import { createItem } from "~/cartItems";

export const loader = async ({context, params, request}: LoaderFunctionArgs) => {
    const {handle} = params;
    const item = await getItem(handle);
    return item;
  };

  export const action = async ({
    request,
  }:ActionFunctionArgs) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const Item = await createItem(updates);
    return redirect(`/`);
  };

  export default function Product(){
    const item = useLoaderData<typeof loader>();
    return(
        <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="store" style={{float:"left"}}>
            <h1 >Product View</h1>
            {item.id}
            <br></br>
            ${item.price}
            <br></br>
            <img src={item.picture} width="380" ></img>
            <br></br>
            <br></br>
            {item?.description}
            <Form method="post" className="border-2">
                <input type="hidden" id="id" name="id" value={item.id}></input>
                <input type="hidden" id="picture" name="picture" value={item.picture}></input><br></br>
                <input type="hidden" id="price" name="price" value={item.price}></input><br></br>
                <button type="submit" >Add to cart</button>
            </Form>
            <br></br>
            <Link to="/">Back</Link>
        </div>
      </body>
    </html>
    )
  }