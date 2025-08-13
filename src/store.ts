import { create } from "zustand";
import type { FilmState } from "./interfaces";

export const useFilmStore = create<FilmState>()((set) => ({
    customer_id: 1,

    filmArray: [],
    setFilmArray(filmArray) { set({ filmArray }) },

    requestInfo: { additionalUrl: "/", method: "GET" },
    setRequestInfo(requestInfo) { set({ requestInfo }) },

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
    addFilmComment(filmComment) {
        set((state) => ({ filmCommentArray: [filmComment, ...state.filmCommentArray] }))
    },
    deleteFilmComment(filmComment) {
        set((state) => {
            const filmCommentArray = state.filmCommentArray.filter((el) => el.comment_id !== filmComment.comment_id)
            return { filmCommentArray }
        })
    },
    putFilmComment(filmComment) {
        set((state) => {
            const filmCommentArray = state.filmCommentArray.map((el) => el.comment_id === filmComment.comment_id ? filmComment : el)
            return {filmCommentArray}
        })
    },

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

    postWhat: null,
    setPostWhat(postWhat) { set({ postWhat }) },
}))