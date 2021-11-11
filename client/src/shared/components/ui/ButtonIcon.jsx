import styled from "styled-components";
import colors, { colorKeys } from "../../data/colors";

const ButtonIcon = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  border-color: rgba(0, 0, 0, 0);
  font-size: 1rem;
  outline-style: none;
  cursor: pointer;
  color: ${colors.LIGHT};
  background: rgba(0, 0, 0, 0);

  &:hover {
    background: ${props => {
      const { hover } = props;
      const defaultValue = colors.LIGHT_OPAQUE;

      if (hover === undefined) {
        return defaultValue;
      }

      const color = colorKeys[hover.background];
      return color ? colors[color] : defaultValue;
    }};
    color: ${props => {
      const { hover } = props;
      const defaultValue = colors.LIGHT;

      if (hover === undefined) {
        return defaultValue;
      }

      const color = colorKeys[hover.color];
      return color ? colors[color] : defaultValue;
    }};
  }
`;

export default ButtonIcon;
