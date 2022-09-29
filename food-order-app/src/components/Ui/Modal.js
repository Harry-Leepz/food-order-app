import ReactDom from "react-dom";
import classes from "./Modal.module.css";

// Dark backdrop for the modal
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideCart}></div>;
};

// Overlay to show the Modal
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Html element being used to portal modal
const portalElement = document.getElementById("overlay");

// Actual Modal
const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
