// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx}',
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   safelist: [
//     "hidden",
//     "block",
//     "md:hidden",
//     "md:block",
//     "text-white",
//     "text-blue-500",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [scrollbarHide, scrollbar],
//   // plugins: [
//   //   require("tailwind-scrollbar-hide"),
//   //   require("tailwind-scrollbar"),
//   // ],
// };

// import scrollbarHide from "tailwind-scrollbar-hide";
// import scrollbar from "tailwind-scrollbar";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx}',
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],

//   safelist: [
//     "hidden",
//     "block",
//     "md:hidden",
//     "md:block",
//     "text-white",
//     "text-blue-500",
//   ],

//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },

//   plugins: [scrollbar],
// };






import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  safelist: [
    "pl-4",
    "pr-6",
    "space-x-6",
    "p-3",
    "py-4",
    "px-5",
    "rounded-full",
    "flex",
    "items-center",
    "justify-between",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },

  plugins: [scrollbar],
};