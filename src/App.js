import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Landing from "./components/layout/Landing"
import Auth from "./views/Auth"
import AuthContextProvider from "./contexts/AuthContext"
import Dashboard from "./views/Dashboard"
import ProtectedRoute from "./components/routing/ProtectedRoute"
import About from "./views/About"
import PostContextProvider from "./contexts/PostContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route
                            path="/login"
                            render={(props) => (
                                <Auth {...props} authRoute={"login"} />
                            )}
                        />
                        <Route
                            path="/register"
                            render={(props) => (
                                <Auth {...props} authRoute={"register"} />
                            )}
                        />

                        <ProtectedRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />

                        <ProtectedRoute exact path="/about" component={About} />
                    </Switch>
                </Router>

                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="colored"
                />
            </PostContextProvider>
        </AuthContextProvider>
    )
}

export default App
