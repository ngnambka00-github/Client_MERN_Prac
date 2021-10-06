import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Link, useHistory } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import AlertMessage from "../layout/AlertMessage"

const LoginForm = () => {
    // context
    const { loginUser } = useContext(AuthContext)

    // router
    const history = useHistory()

    // local state
    const [loginForm, setLoginForm] = useState({ username: "", password: "" })

    const [alert, setAlert] = useState(null)

    const onChangeLoginForm = (event) =>
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value,
        })

    const { username, password } = loginForm

    const login = async (event) => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                // history.push(`/dashboard`);
            } else {
                // Nếu login không thành công sẽ hiện ra alert
                setAlert({
                    type: "danger",
                    message: loginData.message,
                })

                // Alert hiển thị 4s rồi sẽ tự biến mất
                setTimeout(() => {
                    setAlert(null)
                }, 4000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={login}>
                <AlertMessage infor={alert} />
                <Form.Group className="my-3">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>

                <Form.Group className="my-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>

                <Form.Group>
                    <Button
                        variant="success"
                        type="submit"
                        className="mb-3 w-100"
                    >
                        Login
                    </Button>
                </Form.Group>
            </Form>
            <p>
                <span>Don't have an account?</span>
                <Link to="/register">
                    <Button variant="info" size="sm" className="mx-3">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm
