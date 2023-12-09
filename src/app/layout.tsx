import type {Metadata} from "next";

import "./globals.css";
import {Toaster} from "react-hot-toast";

import LayoutContainer from "@/components/layout-container/layout-container";

export const metadata: Metadata = {
  title: "Pre Open Drakkar 2023",
  description: "Website for the Pre Open Drakkar Competition",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <LayoutContainer>
        <main className="w-full h-full md:p-10 p-2 flex flex-col">{children}</main>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#374151",
              color: "#fff",
            },
          }}
        />
      </LayoutContainer>
    </html>
  );
}
