import classes from "./Modal.module.css";

// Dark backdrop for the modal
const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

// Overlay to show the Modal
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

// Actual Modal
const Modal = () => {
  return <div>Modal</div>;
};

export default Modal;
