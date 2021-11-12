import styled from "styled-components";
import colors from "../../data/colors";

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  max-width: 600px;
  height: 70px;
  padding: 1rem;
  background: ${colors.DARK};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;

  & h1 {
    margin: 0;
    font-size: 1.25rem;
  }
`;

export default Nav;
