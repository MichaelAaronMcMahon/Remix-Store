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