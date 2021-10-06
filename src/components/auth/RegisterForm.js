import React from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import AlertMessage from "../layout/AlertMessage"

const RegisterForm = () => {
    // context
    const { registerUser } = useContext(AuthContext)

    // local state
    const [registerForm, setRegisterForm] = useState({
        usename: "",
        password: "",
        confirmPassword: "",
    })

    const [alert, setAlert] = useState(null)

    const { username, password, confirmPassword } = registerForm

    const onChangeRegisterForm = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })
    }

    const register = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            // Hiện thông báo xác thực mật khẩu không đúng
            setAlert({ type: "danger", message: "Password do not match" })

            // Set timeout hiện alert
            setTimeout(() => setAlert(null), 4000)
            return
        }

        // all done check -> register new user
        try {
            const registerData = await registerUser(registerForm)

            // check register not success
            if (!registerData.success) {
                setAlert({ type: "danger", message: registerData.message })
                setTimeout(() => setAlert(null), 4000)
            }

            // register success -> auto login because having token
        } catch (error) {}
    }

    return (
        <>
            <Form onSubmit={register}>
                <AlertMessage infor={alert} />
                <Form.Group className="my-3">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>

                <Form.Group className="my-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>

                <Form.Group className="my-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>

                <Form.Group>
                    <Button
                        variant="success"
                        type="submit"
                        className="mb-3 w-100"
                    >
                        Register
                    </Button>
                </Form.Group>
            </Form>
            <p>
                <span>Already have an account?</span>
                <Link to="/login">
                    <Button variant="info" size="sm" className="mx-3">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm
