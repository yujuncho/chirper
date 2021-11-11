import styled from "styled-components";
import colors from "../../data/colors";

const Nav = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1rem;
  background: ${colors.DARK};
  border: 1px solid rgba(255, 255, 255, 0.2);

  & h1 {
    margin: 0;
    font-size: 1.25rem;
  }
`;

export default Nav;
