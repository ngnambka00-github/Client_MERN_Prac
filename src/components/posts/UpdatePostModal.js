import React, { useState, useContext, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { PostContext } from "../../contexts/PostContext"
import { toast } from "react-toastify"
import _ from "lodash"

const UpdatePostModal = () => {
    // Context
    const {
        postState: { postUpdate },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
    } = useContext(PostContext)

    // State
    const [post, setPost] = useState({
        title: "",
        description: "",
        url: "",
        status: "TO LEARN",
    })

    useEffect(() => {
        if (postUpdate) {
            setPost({
                title: postUpdate.title,
                description: postUpdate.description,
                url: postUpdate.url,
                status: postUpdate.status,
            })
        }
    }, [postUpdate])

    // local state
    const { title, description, url, status } = post

    // set event change input
    const onChangeUpdatePostForm = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value,
        })
    }

    // event close modal
    const closeDialog = () => {
        setShowUpdatePostModal(false)
    }

    // event submit form
    const onSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await updatePost({
            ...post,
            _id: postUpdate._id,
        })
        if (success) {
            toast.success(_.capitalize(message))
        } else {
            toast.error(_.capitalize(message))
        }
        setShowUpdatePostModal(false)
    }

    return (
        <Modal
            show={showUpdatePostModal}
            size="lg"
            centered
            animation={true}
            onHide={closeDialog}
        >
            <Modal.Header closeButton>
                <Modal.Title>Make process?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            require
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeUpdatePostForm}
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onChangeUpdatePostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial"
                            name="url"
                            value={url}
                            onChange={onChangeUpdatePostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="select"
                            placeholder="Youtube Tutorial"
                            name="status"
                            value={status}
                            onChange={onChangeUpdatePostForm}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="success" type="submit">
                        Update Post
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal
