import {inter} from "@/fonts";

import Header from "./header";

export default function LayoutContainer({children}: {children: React.ReactNode}) {
  return (
    <body
      className={`${inter.className} bg-[url('/background.webp')] bg-cover bg-center text-black h-screen flex flex-col`}
    >
      <Header />
      {children}
    </body>
  );
}
