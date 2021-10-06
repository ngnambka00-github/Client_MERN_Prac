import { Button } from "react-bootstrap"
import playIcon from "../../assets/play-btn.svg"
import editIcon from "../../assets/pencil.svg"
import deleteIcon from "../../assets/trash.svg"
import React, { useContext } from "react"
import { PostContext } from "../../contexts/PostContext"
import { toast } from "react-toastify"

const ActionButtons = ({ url, _id }) => {
    const { deletePost, findPost, setShowUpdatePostModal } =
        useContext(PostContext)

    // event click delete a post
    const handlerDeletePost = async () => {
        const data = await deletePost(_id)
        if (data.success) {
            toast.success(`Delete post: ${data.post.title} success`)
        } else {
            toast.error(data.message)
        }
    }

    // event click edit a post
    const handlerEditPost = (postId) => {
        findPost(postId)
        setShowUpdatePostModal(true)
    }

    return (
        <>
            <Button
                className="post-button"
                href={url}
                target="_black"
                style={{ border: "none", background: "transparent" }}
            >
                <img src={playIcon} alt="play" width="32" height="32" />
            </Button>
            <Button
                className="post-button"
                style={{ border: "none", background: "transparent" }}
                onClick={handlerEditPost.bind(this, _id)}
            >
                <img src={editIcon} alt="edit" width="24" height="24" />
            </Button>
            <Button
                className="post-button"
                style={{ border: "none", background: "transparent" }}
                onClick={handlerDeletePost}
            >
                <img src={deleteIcon} alt="delete" width="24" height="24" />
            </Button>
        </>
    )
}

export default ActionButtons
