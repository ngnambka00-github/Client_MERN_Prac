import { createContext, useReducer, useEffect } from "react"
import axios from "axios"
import { authReducer } from "../reducers/authReducer"
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants"
import setAuthToken from "../utils/setAuthTolen"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        // Nếu axios không hợp lệ thì xóa token đó tại localStorage
        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if (response.data.success) {
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    },
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: "SET_AUTH",
                payload: { isAuthenticated: false, user: null },
            })
        }
    }

    useEffect(() => loadUser(), [])

    // login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success) {
                // lưu accessToken vào localStorage
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                )
            }
            await loadUser()
            return response.data
        } catch (error) {
            // lỗi từ backend trả về
            if (error.response.data) {
                return error.response.data
            }
            return { success: false, message: error.message }
        }
    }

    // register
    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(
                `${apiUrl}/auth/register`,
                userForm
            )
            if (response.data.success) {
                // lưu accessToken vào localStorage
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                )
            }
            await loadUser()
            return response.data
        } catch (error) {
            // console.log("Lỗi rồi nè: hehe", error.response.data)

            // lỗi từ backend trả về
            if (error.response.data) {
                return error.response.data
            }
            return { success: false, message: error.message }
        }
    }

    // logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: "SET_AUTH",
            payload: { isAuthenticated: false, user: null },
        })
    }

    // Context data
    const authContextData = {
        loginUser,
        authState,
        registerUser,
        logoutUser,
    }

    // return Provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
