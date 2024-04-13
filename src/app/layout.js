import { Inter , M_PLUS_Rounded_1c} from "next/font/google";
import "./globals.css";

const inter = M_PLUS_Rounded_1c({ subsets: ["latin"] ,weight:['300','400','500'],display:"swap"});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
