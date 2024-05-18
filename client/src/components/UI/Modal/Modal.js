import React from "react";
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiReducer";


const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onHide}></div>
  );
};

const Overlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div> 
  )
}

const getOverlayElement = document.getElementById('overlays');

const Modal = (props) => {
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(uiActions.toggleModal());
  };

  return (
    <>
    ReactDOM.createPortal(<Backdrop onHide={toggleModal}/>, getOverlayElement);
    ReactDOM.createPortal(<Overlay onHide={toggleModal}>{props.children}</Overlay>, getOverlayElement);
    </>
  )
}

export default Modal;