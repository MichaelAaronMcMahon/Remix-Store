/**
 * tsx file for the decrement action in index.tsx
 * Calls decrementPrice with the ID submitted in the form, decreasing the quantity of the cart item and thus its overall price.
 */

import { decrementPrice } from "../cartItems";
import { redirect, ActionFunctionArgs } from "@remix-run/node";

  export const action = async ({
    request,
  }:ActionFunctionArgs) => {
    const formData = await request.formData();
    const id = formData.get('id') as string
    await decrementPrice(id);
    return redirect(`/`);
  };