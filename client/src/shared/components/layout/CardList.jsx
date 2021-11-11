import styled from "styled-components";
import Card from "./Card";

const CardList = styled.div`
  & ${Card} {
    border-bottom: 0 !important;
  }
`;

export default CardList;
