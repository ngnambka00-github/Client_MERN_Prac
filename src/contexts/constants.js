export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "https://hidden-hamlet-21072.herokuapp.com/api"
        : "https://hidden-hamlet-21072.herokuapp.com/api"

export const LOCAL_STORAGE_TOKEN_NAME = "learnit_mern"

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS"
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL"
export const ADD_NEW_POST = "ADD_NEW_POST"
export const DELETE_POST = "DELETE_POST"
export const UPDATE_POST = "UPDATE_POST"
export const FIND_POST = "FIND_POST"
