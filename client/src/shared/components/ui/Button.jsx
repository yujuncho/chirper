import styled from "styled-components";
import colors from "../../data/colors";

const Button = styled.button`
  border-width: 1px;
  border-style: solid;
  border-radius: 9999px;
  border-color: rgba(0, 0, 0, 0);
  font-size: ${props => (props.small ? "0.75rem" : "1rem")};
  padding: 8px 16px;
  outline-style: none;
  cursor: pointer;
  color: ${props => (props.primary ? colors.LIGHT : colors.DARK)};
  background: ${props => (props.primary ? colors.PRIMARY : colors.LIGHT)};
`;

export default Button;
