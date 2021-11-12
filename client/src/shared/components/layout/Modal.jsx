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
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.DARK};
  border-radius: 14px;
  z-index: 30;
  box-sizing: border-box;

  @media (min-width: 768px) {
    position: absolute;
    top: 5vh;
    width: 100%;
    max-width: 600px;
    height: initial;
    max-width: 600px;
    background-color: ${colors.DARK};
    border-radius: 14px;
    z-index: 30;
    box-sizing: border-box;
  }
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
