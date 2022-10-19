import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <h1>MATT GREENBERG</h1>
      <h3>Creative Developer // Web3</h3>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  font-size: 40px;
  color: white;
  h1 {
    -webkit-text-stroke: 1px black;
  }
  h3 {
    -webkit-text-stroke: 1px black;
    text-transform: uppercase;
    font-size: 36px;
  }
`;

export default Header;
