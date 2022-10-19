import React from "react";
import styled from "styled-components";
import Header from "./Header";
import useStore from "./useStore";

const HtmlApp = () => {
  const isOpen = useStore((state) => state.isOpen);
  return (
    <StyledHTML>
      <Header />
      {isOpen && (
        <>
          <p>
            Hello! I'm a creative developer with over 7 years of professional
            expereince. I've worked on projects for comapnies such as Apple,
            Google and Nike.
          </p>
          <p>I'm currently looking to get into Web3.</p>
        </>
      )}
    </StyledHTML>
  );
};

const StyledHTML = styled.div`
  position: absolute;
  top: 0;
  padding: 30px;
  p {
    max-width: 70%;
    color: black;
    font-size: 16px;
  }
`;

export default HtmlApp;
