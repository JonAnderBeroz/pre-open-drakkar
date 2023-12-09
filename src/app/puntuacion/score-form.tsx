"use client";

import {Toaster, toast} from "react-hot-toast";

import {Team, Wod} from "@/db/types";

export default function ScoreForm({
  data: {teams, wods},
  action,
}: {
  data: {teams: Team[]; wods: Partial<Wod>[]};
  action: (formData: FormData) => Promise<number>;
}) {
  async function clientAction(formData: FormData) {
    const promise = action(formData);

    toast.promise(promise, {
      loading: "Creando puntuación...",
      success: "Puntuación creada 🎉",
      error: "Error creando la puntuación",
    });
  }

  return (
    <form action={clientAction} className="flex flex-col gap-6">
      <div>
        <label className="block mb-2 text-md font-semibold text-gray-900" htmlFor="teams">
          Selecciona tu equipo:
        </label>
        <select
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:ring-2 outline-none"
          id="teams"
          name="teams"
        >
          {teams.map(({id, name}) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-md font-semibold text-gray-900" htmlFor="wods">
          Selecciona el wod:
        </label>
        <select
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:ring-2 outline-none"
          id="wods"
          name="wods"
        >
          {wods.map(({id, name}) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-md font-semibold text-gray-900" htmlFor="score">
          Score:
        </label>
        <input
          required
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:ring-2 outline-none"
          id="score"
          name="score"
          type="number"
        />
      </div>
      <button
        className="text-white w-fit focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700"
        type="submit"
      >
        Añadir puntuación
      </button>
    </form>
  );
}
