import Nav from "@components/Nav";
import React from "react";
import "@styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "conceptsy",
  description: "Discover & share concepts",
};

const Rootlayout = ({ children }) => {
  return (
  
    <html lang="en">
      <body suppressHydrationWarning={true}>
      <ClerkProvider >
        <div className="main ">
          <div className="gradient" />
        </div>
        <main className="flex flex-col px-16  justify-center  ">
          <Nav />
          <section className="flex min-h-screen flex-col   ">
            {children}
          </section>
        </main>
        </ClerkProvider >
      </body>
   
    </html>

  );
};

export default Rootlayout;
