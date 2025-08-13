import { create } from "zustand";
import type { FilmState } from "./interfaces";



export const useFilmStore = create<FilmState>()((set) => ({
    filmArray: [],
    setFilmArray(filmArray) { set({ filmArray }) },

    additionalUrl: "/",
    setAdditionalUrl(additionalUrl) { set({ additionalUrl }) },

    selectedFilm: null,
    setSelectedFilm(selectedFilm) { set({ selectedFilm }) },
    clearSelectedFilm() {
        set(() => {
            return {
                selectedFilm: null,
                filmPost: null,
                likeCount: 0,
                doILikeIt: false
            }
        })
    },

    filmPost: null,
    setFilmPost(filmPost) { set({ filmPost }) },

    filmCommentArray: [],
    setFilmCommentArray(filmCommentArray) { set({ filmCommentArray }) },

    likeCount: 0,
    privateToApiSetLikeCount(likeCount) { set({ likeCount }) },

    doILikeIt: false,
    setDoILikeIt(doILikeIt) { set({ doILikeIt }) },
    toggleDoILikeIt() {
        set((state) => {
            const delta = state.doILikeIt ? -1 : 1
            return { doILikeIt: !state.doILikeIt, likeCount: state.likeCount + delta }
        })
    },

}))