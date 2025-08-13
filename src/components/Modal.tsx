import React, { useEffect } from "react"
import type { FilmComment, RequestInfoGroup } from "../interfaces"
import { useFilmStore } from "../store"
import RoundedBox from "./RoundedBox"

interface AdditionalProps {
    likeCount: number
    doILikeIt: boolean
}

type LikeButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & AdditionalProps

const LikeButton = (props: LikeButtonProps) => {
    const setRequestInfo = useFilmStore((state) => state.setRequestInfo)
    const filmPost = useFilmStore((state) => state.filmPost)
    const customer_id = useFilmStore((state) => state.customer_id)
    const toggleDoILikeIt = useFilmStore((state) => state.toggleDoILikeIt)

    const { likeCount, doILikeIt, ...rest } = props
    const baseClassName = "transition py-1 px-3 rounded-full border-1 border-black/0"
    const conditionalClassName = doILikeIt ? "text-white bg-black" : "border-black/100"
    const className = `${baseClassName} ${conditionalClassName}`

    const handleClick = () => {
        if (!filmPost) { throw new Error("CANNOT CLICK WHEN NO FILM POST") }

        const requestInfo: RequestInfoGroup = {
            additionalUrl: `/film-post/${filmPost.post_id}/like/customer/${customer_id}`,
            method: "POST",
            body: { doLike: !doILikeIt }
        }

        setRequestInfo(requestInfo)
        toggleDoILikeIt()
    }
    return (
        <div onClick={handleClick} className={className} {...rest}>{`Like(${likeCount})`}</div>
    )
}

const CommentBox = ({ filmComment }: { filmComment: FilmComment }) => {
    return (
        <RoundedBox>
            <p>{`customer id: ${filmComment.customer_id}`}</p>
            <p>{filmComment.content}</p>
            <p>{JSON.stringify(filmComment.created_at)}</p>
        </RoundedBox>
    )
}

const Modal = React.memo(() => {
    const selectedFilm = useFilmStore((state) => state.selectedFilm)
    const filmPost = useFilmStore((state) => state.filmPost)
    const filmCommentArray = useFilmStore((state) => state.filmCommentArray)
    const likeCount = useFilmStore((state) => state.likeCount)
    const doILikeIt = useFilmStore((state) => state.doILikeIt)
    const customer_id = useFilmStore((state) => state.customer_id)
    const setPostWhat = useFilmStore((state) => state.setPostWhat)
    const addFilmComment = useFilmStore((state) => state.addFilmComment)
    
    const clearSelectedFilm = useFilmStore((state) => state.clearSelectedFilm)
    const setRequestInfo = useFilmStore((state) => state.setRequestInfo)

    useEffect(() => {
        if (!selectedFilm) {
            throw new Error("MODAL SHOULD NOT BE RENDERED WITHOUT SELECTED FILM")
        }
        console.log("---- fetch when mount")
        setRequestInfo({ additionalUrl: `/${selectedFilm.film_id}/film-post/customer/1`, method: "GET" })
    }, [selectedFilm])

    const handleSubmit = (event: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        event.preventDefault()

        const target = event.target as HTMLFormElement
        const commentContent = target.comment_content.value

        if (!filmPost) { throw new Error("---- NO FILM POST WHEN SUBMIT") }

        const comment = {
            content: commentContent,
            customer_id,
            post_id: filmPost?.post_id,
            updated_at: new Date()
        } as FilmComment

        setPostWhat(comment)
        console.log("---- submitted!")
        setRequestInfo({
            additionalUrl: `/film-post/${filmPost.film_id}/comment`,
            method: "POST",
            body: comment
        })
        addFilmComment(comment)

        target.comment_content.value = ""
    }
    
    if (!selectedFilm) {
        throw new Error("MODAL SHOULD NOT BE RENDERED WITHOUT SELECTED FILM")
    }
    console.log("---- modal mounted")
    return (
        <div onClick={clearSelectedFilm} className={`z-10 w-screen h-screen fixed top-0 left-0 backdrop-blur-xs flex justify-center items-center`}>
            <div onClick={(event) => { event.stopPropagation() }} className="max-w-[500px] w-full max-h-[500px] h-full bg-white overflow-x-hidden overflow-y-scroll">
                <RoundedBox>
                    <p>영화 제목</p>
                    <p className="text-xl font-semibold">{selectedFilm.title}</p>
                    <p>{selectedFilm.release_year}</p>
                </RoundedBox>
                <RoundedBox>
                    <p>좋아요 버튼</p>
                    <LikeButton likeCount={likeCount} doILikeIt={doILikeIt} />
                </RoundedBox>

                <RoundedBox>
                    <p>영화 세부 정보</p>
                    <p>{selectedFilm.description}</p>
                </RoundedBox>
                <RoundedBox>
                    <p>필름 포스트 콘텐트</p>
                    <p>{filmPost?.content}</p>
                </RoundedBox>

                <form onSubmit={handleSubmit}>
                    <RoundedBox>
                        <p>댓글 등록</p>
                        <div className="flex gap-3">
                            <textarea name="comment_content" className="border-1 border-amber-600 grow block" />
                            <button className="block">등록</button>
                        </div>
                    </RoundedBox>
                </form>

                <RoundedBox>
                    <p>댓글 영역</p>
                    {filmCommentArray.map((comment) => <CommentBox key={comment.comment_id} filmComment={comment} />)}
                </RoundedBox>

            </div>
        </div>
    )
})

export default Modal