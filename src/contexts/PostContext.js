import { createContext, useReducer, useState } from "react"
import { postReducer } from "../reducers/postReducer"
import { apiUrl } from "./constants"
import axios from "axios"
import {
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAIL,
    ADD_NEW_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from "./constants"

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        // init state
        posts: [],
        postLoading: true,
        postUpdate: null,
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

    // find post when user is updating post
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId)
        dispatch({
            type: FIND_POST,
            payload: post ? post : null,
        })
    }

    // get all post
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)

            if (response.data.success) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts,
                })
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAIL,
            })
        }
    }

    // add a new post
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if (response.data.success) {
                dispatch({
                    type: ADD_NEW_POST,
                    payload: response.data.post,
                })
                return response.data
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server Error" }
        }
    }

    // delete a post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if (response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: postId,
                })
            }

            // Trả về dữ liệu để xử lý ở mặt trên
            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Error Server" }
        }
    }

    // update post
    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(
                `${apiUrl}/posts/${updatedPost._id}`,
                updatedPost
            )

            if (response.data.success) {
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post,
                })
            }

            return response.data
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Error Server" }
        }
    }

    // post context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        deletePost,
        updatePost,
        findPost,
        showUpdatePostModal,
        setShowUpdatePostModal,
    }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider
