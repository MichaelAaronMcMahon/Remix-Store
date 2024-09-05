 import type { Config } from "tailwindcss";

 export default {
   content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./app/root.tsx",
    "./app/routes/_index.tsx"
   ],
   theme: {
     extend: {},
   },
   plugins: [],
 } satisfies Config;
