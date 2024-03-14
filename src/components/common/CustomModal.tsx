//import ModalPortal from "./ModalPortal";
import React from "react";
import { Modal } from "antd";

type CustomModalProp = {
  open: boolean;
  title?: string;
  performAction:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;

  hideModal:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
};

const CustomModal = (props: CustomModalProp) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Confirmation"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
