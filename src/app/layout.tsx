import type {Metadata} from "next";

import "./globals.css";
import LayoutContainer from "@/components/layout-container/layout-container";

export const metadata: Metadata = {
  title: "Pre Open Drakkar 2023",
  description: "Website for the Pre Open Drakkar Competition",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <LayoutContainer>{children}</LayoutContainer>
    </html>
  );
}
