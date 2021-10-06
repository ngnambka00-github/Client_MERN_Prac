import React from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { useContext } from "react"
import { PostContext } from "../../contexts/PostContext"

const AddPostModal = () => {
    // Context
    const { showAddPostModal, setShowAddPostModal } = useContext(PostContext)

    const closeDialog = () => {
        setShowAddPostModal(false)
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
            <Form>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            require
                            aria-describedby="title-help"
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
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial"
                            name="url"
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
