import React, { useState, useContext } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { PostContext } from "../../contexts/PostContext"
import { toast } from "react-toastify"
import _ from "lodash"

const AddPostModal = () => {
    // Context
    const { showAddPostModal, setShowAddPostModal, addPost } =
        useContext(PostContext)

    // State
    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        url: "",
        status: "TO LEARN",
    })

    // local state
    const { title, description, url, status } = newPost

    // set event change input
    const onChangeNewPostForm = (event) =>
        setNewPost({ ...newPost, [event.target.name]: event.target.value })

    // reset Form data input
    const resetAddPostData = () => {
        setNewPost({
            title: "",
            description: "",
            url: "",
            status: "TO LEARN",
        })
        setShowAddPostModal(false)
    }

    // event close modal
    const closeDialog = () => {
        resetAddPostData()
    }

    // event submit form
    const onSubmit = async (event) => {
        event.preventDefault()
        const { success, message } = await addPost(newPost)
        if (success) {
            toast.success(_.capitalize(message))
        } else {
            toast.error(_.capitalize(message))
        }
        resetAddPostData()
    }

    return (
        <Modal
            show={showAddPostModal}
            size="lg"
            centered
            animation={true}
            onHide={closeDialog}
        >
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
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
                            onChange={onChangeNewPostForm}
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
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial"
                            name="url"
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="success" type="submit">
                        LearnIt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal
