import React from "react"
import { PostContext } from "../contexts/PostContext"
import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import SinglePost from "../components/posts/SinglePost"
import AddPostModal from "../components/posts/AddPostModal"
import UpdatePostModal from "../components/posts/UpdatePostModal"
import addIcon from "../assets/plus-circle-fill.svg"
import {
    OverlayTrigger,
    Tooltip,
    Row,
    Card,
    Button,
    Col,
    Spinner,
} from "react-bootstrap"

const Dashboard = () => {
    // Context
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext)

    const {
        postState: { posts, postLoading, postUpdate },
        getPosts,
        setShowAddPostModal,
    } = useContext(PostContext)

    // Start: Get all posts
    useEffect(() => getPosts(), []) // [] tức là chỉ chạy 1 lần đầu tiên

    let body = null

    if (postLoading) {
        body = <Spinner animation="border" variant="infor" />
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to learnIt</Card.Title>
                        <Card.Text>
                            Click to button bellow to track your first skill to
                            learn
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={setShowAddPostModal.bind(this, true)}
                        >
                            LearnIt
                        </Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => (
                        <Col key={post._id} className="my-2">
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>

                {/* Open add post modal */}
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip>Add a new thing to learn</Tooltip>}
                >
                    <Button
                        style={{
                            background: "transparent",
                            border: "none",
                            outline: "none",
                        }}
                        className="btn-floating"
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        <img
                            src={addIcon}
                            alt="Add post"
                            width="60"
                            height="60"
                        />
                    </Button>
                </OverlayTrigger>
            </>
        )
    }

    return (
        <>
            {body}
            <AddPostModal />
            <UpdatePostModal />
        </>
    )
}

export default Dashboard
