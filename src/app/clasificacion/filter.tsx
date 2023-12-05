"use client";

import {usePathname, useRouter} from "next/navigation";
import {ChangeEvent} from "react";

export default function Filter({selectedWod}: {selectedWod: number}) {
  const router = useRouter();
  const pathName = usePathname();

  function selectionChanged(e: ChangeEvent<HTMLSelectElement>) {
    router.replace(`${pathName}?filter=${e.target.value}`);
  }

  return (
    <select
      className="text-black bg-white px-4 py-2 rounded-lg mb-5 wod-selector mr-auto"
      value={selectedWod}
      onChange={selectionChanged}
    >
      <option value="0">Overall</option>
      <option value="1">23.1</option>
      <option value="2">23.2</option>
      <option value="3">23.3</option>
    </select>
  );
}
