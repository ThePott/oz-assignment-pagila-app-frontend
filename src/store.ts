import { create } from "zustand";
import type { FilmState } from "./interfaces";



export const useFilmStore = create<FilmState>()((set) => ({
    filmArray: [],
    setFilmArray(filmArray) { set({ filmArray }) },

    additionalUrl: "/",
    setAdditionalUrl(additionalUrl) { set({ additionalUrl }) },

}))