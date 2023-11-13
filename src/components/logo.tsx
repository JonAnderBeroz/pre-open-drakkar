import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="bg-[#050808]/75 p-4 backdrop-blur-lg rounded-lg m-auto md:m-0" href="/">
      <Image alt="Crossfit drakkar Hondarribia logo" height={150} src="/logo.webp" width={250} />
    </Link>
  );
}
