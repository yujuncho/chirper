import styled from "styled-components";
import colors, { colorKeys } from "../../data/colors";

const Callout = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  background: ${props => {
    const color = colorKeys[props.color];
    return color ? colors[color] : colors.LIGHT_OPAQUE;
  }};
`;

export default Callout;
