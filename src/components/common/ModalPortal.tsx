import React from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const cropModal = document.getElementById("imageCropModal") as Element;
  return cropModal ? ReactDOM.createPortal(<>{children},</>, cropModal) : null;
};

export default ModalPortal;
