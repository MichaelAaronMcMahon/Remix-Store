/**
 * tsx file for the increment action in index.tsx
 * Calls updatePrice with the ID submitted in the form, increasing the quantity of the cart item and thus its overall price.
 */

import { updatePrice } from "../cartItems";
import { redirect, ActionFunctionArgs } from "@remix-run/node";

  export const action = async ({
    request,
  }:ActionFunctionArgs) => {
    const formData = await request.formData();
    const id = formData.get('id') as string
    await updatePrice(id);
    return redirect(`/`);
  };