"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {teko} from "@/fonts";
import Menu from "@/icons/menu";

import X from "@/icons/x";

import {links} from "@/links";

import Logo from "../logo";

export function SideBard({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <aside
      className={`absolute top-0  z-30 h-screen w-screen transition-transform flex flex-row  ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <section className="bg-[#050808] h-full relative max-w-sm w-full text-white">
        <button
          className="absolute top-4 left-4 hover:bg-zinc-700/70 p-2 hover:rounded-full transition-all"
          type="button"
          onClick={() => setVisible(false)}
        >
          <X />
        </button>
        <nav className="p-10 flex flex-col gap-5 mt-10">
          {links.map(({url, content}, i) => (
            <Link
              key={i}
              className={`border-b-2 h-14 flex items-center font-semibold text-3xl ${teko.className}`}
              href={url}
            >
              {content}
            </Link>
          ))}
        </nav>
      </section>
      <div
        className="flex-grow bg-zinc-700/70 h-full float-right overflow-scroll"
        onClick={() => setVisible(false)}
      />
    </aside>
  );
}

export function NavBar({path}: {path: string}) {
  return (
    <nav className="hidden flex-row gap-5 md:flex items-center px-5 bg-[#050808]/75 h-full backdrop-blur-lg rounded-lg text-white">
      {links.map(({url, content}, i) => (
        <Link
          key={i}
          className={`relative font-semibold md:text-lg lg:text-2xl ${
            teko.className
          }  after:bg-white ${
            url === path ? "after:w-full" : "after:w-0"
          } after:left-0 after:-bottom-[0.15rem] after:rounded-xl after:h-[3px] after:absolute hover:after:w-full after:transition-all`}
          href={url}
        >
          {content}
        </Link>
      ))}
    </nav>
  );
}

export default function Header() {
  const [visible, setVisible] = useState<boolean>(false);
  const path = usePathname();
  const openSidebar = () => {
    setVisible(true);
  };

  useEffect(() => {
    setVisible(false);
  }, [path]);

  return (
    <>
      <header className="flex flex-row md:gap-5 items-center justify-center md:justify-start px-4 pt-5">
        <button className="block md:hidden" type="button" onClick={openSidebar}>
          <Menu />
        </button>
        <Logo />
        <NavBar path={path} />
      </header>
      <SideBard setVisible={setVisible} visible={visible} />
    </>
  );
}
