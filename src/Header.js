import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Header = ({ isOpen }) => {
  const animProps = useSpring({
    transform: isOpen
      ? "translate(0, 0) scale(0.75)"
      : "translate(0, 0) scale(1)",
    delay: isOpen ? 250 : 0,
  });
  return (
    <StyledHeader style={animProps}>
      <h1>MATT GREENBERG</h1>
      <h3>Creative & Web3 Developer</h3>
    </StyledHeader>
  );
};

const StyledHeader = styled(animated.header)`
  font-size: 40px;
  color: white;
  left: 0;
  top: 0;
  transform-origin: 0 0;
  h1 {
    -webkit-text-stroke: 1px black;
  }
  h3 {
    -webkit-text-stroke: 1px black;
    text-transform: uppercase;
    font-size: 32px;
  }
`;

export default Header;
