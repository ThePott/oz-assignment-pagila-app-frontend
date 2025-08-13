// Enums
export type MpaaRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'

export type ReactionType = 'LIKE' | 'HEART' | 'SMILE' | 'ANGRY'

// Base interfaces
export interface Customer {
    customer_id: number;
    store_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    address_id: number;
    activebool: boolean;
    create_date: Date;
    last_update?: Date;
    active?: number;
}

export interface Film {
    film_id: number;
    title: string;
    description?: string;
    release_year?: number;
    language_id: number;
    original_language_id?: number;
    rental_duration: number;
    rental_rate: number;
    length?: number;
    replacement_cost: number;
    rating?: MpaaRating;
    last_update: Date;
    special_features: string[];
}

export interface FilmPost {
    post_id: number;
    film_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface PostReaction {
    reaction_id: number;
    reaction_type: ReactionType;
    post_id: number;
    customer_id: number;
    created_at: Date;
}

export interface FilmComment {
    comment_id: number;
    post_id: number;
    customer_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"

export interface RequestInfoGroup {
    additionalUrl: string
    method: RequestMethod
    body?: any
}

export interface FilmState {
    customer_id: number

    filmArray: Film[]
    setFilmArray: (filmArray: Film[]) => void

    requestInfo: RequestInfoGroup | null
    setRequestInfo: (requestInfo: RequestInfoGroup | null) => void

    selectedFilm: Film | null
    setSelectedFilm: (selectedFilm: Film | null) => void
    clearSelectedFilm: () => void

    filmPost: FilmPost | null
    setFilmPost: (filmPost: FilmPost | null) => void

    filmCommentArray: FilmComment[]
    setFilmCommentArray: (filmCommentArray: FilmComment[]) => void
    addFilmComment: (filmComment: FilmComment) => void
    deleteFilmComment: (filmComment: FilmComment) => void

    likeCount: number
    privateToApiSetLikeCount: (likeCount: number) => void

    doILikeIt: boolean
    setDoILikeIt: (doILikeIt: boolean) => void
    toggleDoILikeIt: () => void

    postWhat: any
    setPostWhat: (postWhat: any) => void
}

