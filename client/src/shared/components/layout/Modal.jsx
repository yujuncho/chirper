import { Fragment } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import colors from "../../data/colors";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 10px;
  height: 100vh;
  z-index: 20;
  background-color: ${colors.LIGHT_OPAQUE};
  display: flex;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 5vh;
  width: 100%;
  max-width: 600px;
  background-color: ${colors.DARK};
  border-radius: 14px;
  z-index: 30;
`;

export default function Modal({ children }) {
  return ReactDOM.createPortal(
    <Fragment>
      <ModalBackdrop>
        <ModalContainer>{children}</ModalContainer>
      </ModalBackdrop>
    </Fragment>,
    document.getElementById("modal")
  );
}
