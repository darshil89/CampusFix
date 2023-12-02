import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/footer";
import Provider from "@/context/Provider";
import Toster from "@/context/Toster";
// Import Font Awesome CSS in your component or layout
import "@fortawesome/fontawesome-svg-core/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DSCE",
  description:
    "This is a ticketing system for DSCE students and staffs where they can post their problems and get it solved by the admin.",
    openGraph: {
      type: "website",
      locale: "en_IE",
      url: "https://dayanand.vercel.app/",
      site_name: "DSCE",
      images: [
        {
          url: "/images/navimg2.jpeg",
          width: 1260,
          height: 800,
          alt: "DSCE",
        },
      ],

    },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <NavBar />
          {children}
          <Footer />
          <Toster />
        </body>
      </Provider>
    </html>
  );
}
