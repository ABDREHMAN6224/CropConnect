"use client";

import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "/app/globals.css";
import { SocketProvider } from "./context/socketContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "/app/store/store";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "HarvestHub",
//   description: "A modern and responsive web application for farmers and buyers",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900 dark:text-white`}>
        <SocketProvider>
          <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
              <main className="">{children}</main>
            {/* </PersistGate> */}
          </Provider>
        </SocketProvider>
      </body>
    </html>
  );
}
