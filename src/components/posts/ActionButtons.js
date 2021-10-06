import { Button } from "react-bootstrap"
import playIcon from "../../assets/play-btn.svg"
import editIcon from "../../assets/pencil.svg"
import deleteIcon from "../../assets/trash.svg"

const ActionButtons = ({ url, _id }) => (
    <>
        <Button
            className="post-button"
            href={url}
            target="_black"
            style={{ border: "none", background: "transparent" }}
        >
            <img src={playIcon} alt="play" width="32" height="32" />
        </Button>
        <Button
            className="post-button"
            style={{ border: "none", background: "transparent" }}
        >
            <img src={editIcon} alt="edit" width="24" height="24" />
        </Button>
        <Button
            className="post-button"
            style={{ border: "none", background: "transparent" }}
        >
            <img src={deleteIcon} alt="delete" width="24" height="24" />
        </Button>
    </>
)

export default ActionButtons
