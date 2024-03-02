import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< Updated upstream
import "/app/globals.css";
=======
import "@/app/globals.css";
import { SocketProvider } from "./context/socketContext";
>>>>>>> Stashed changes

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HarvestHub",
  description: "A modern and responsive web application for farmers and buyers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900 dark:text-white`}>
        <SocketProvider>
        {children}
        </SocketProvider>
      </body>
    </html>
  );
}
