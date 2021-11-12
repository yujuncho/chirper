import styled from "styled-components";
import Card from "./Card";

const CardList = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  flex: 1;

  & ${Card} {
    border-right: 0 !important;
    border-left: 0 !important;
    border-bottom: 0 !important;
  }
`;

export default CardList;
