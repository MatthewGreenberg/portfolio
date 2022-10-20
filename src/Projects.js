import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Projects = ({ isOpen }) => {
  const animProps = useSpring({
    opacity: isOpen ? 1 : 0,
    y: isOpen ? 0 : 25,
    delay: isOpen ? 1100 : 0,
  });

  return (
    <StyledProjects style={animProps}>
      <h1>Selected Work</h1>
    </StyledProjects>
  );
};

const StyledProjects = styled(animated.div)`
  margin-top: 50px;
  height: 100%;
  padding: 20px;
  h1 {
    font-size: 44px;
    color: white;
    -webkit-text-stroke: 1px black;
  }
  ul {
    padding: 0;
  li {
    color: black;
    font-size: 23px;
    list-style: square;
  }
`;

export default Projects;
