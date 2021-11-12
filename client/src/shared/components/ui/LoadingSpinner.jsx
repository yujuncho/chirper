import styled from "styled-components";
import colors from "../../data/colors";

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => (props.small ? "20px" : "48px")};
  height: ${props => (props.small ? "20px" : "48px")};

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${props => (props.small ? "16px" : "32px")};
    height: ${props => (props.small ? "16px" : "32px")};
    margin: ${props => (props.small ? "2px" : "8px")};
    border: ${props => {
      const color = props.color ? props.color : colors.PRIMARY;
      return props.small ? `2px solid ${color}` : `4px solid ${color}`;
    }};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${props => {
      const color = props.color ? props.color : colors.PRIMARY;
      return `${color} transparent transparent transparent`;
    }};
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoadingSpinner(props) {
  const { style, small, color } = props;
  return (
    <SpinnerContainer style={style}>
      <Spinner small={small} color={color}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Spinner>
    </SpinnerContainer>
  );
}
