import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        alt="Crossfit drakkar Hondarribia logo"
        className="bg-[#050808]/75 sm:p-4 backdrop-blur-lg rounded-lg m-auto md:m-0"
        height={150}
        src="/logo.webp"
        width={250}
      />
    </Link>
  );
}
