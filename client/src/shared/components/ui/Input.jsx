import styled from "styled-components";
import colors from "../../data/colors";

const Input = styled.input`
  border-radius: 4px;
  inset: 0;
  border: 1px solid ${colors.LIGHT_OPAQUE};
  padding: 8px;
  outline-style: none;
  flex: 1;
  background: ${colors.DARK};
  color: ${colors.LIGHT};
  line-height: 1.5rem;

  &:focus {
    outline-style: none;
    border: 1px solid ${colors.PRIMARY};
  }
`;

export default Input;
