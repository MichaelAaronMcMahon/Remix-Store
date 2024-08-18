import { getContact, deleteAll } from "../cartItems";
import type { ActionFunctionArgs,
    LoaderFunctionArgs 
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

export const action = async () => {
    await deleteAll();
    return redirect(`/`);
  };

