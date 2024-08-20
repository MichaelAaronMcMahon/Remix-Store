import { deleteAll } from "../cartItems";
import { redirect } from "@remix-run/node";

export const action = async () => {
    await deleteAll();
    return redirect(`/`);
  };

