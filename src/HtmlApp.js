import React from "react";
import styled from "styled-components";
import Header from "./Header";
import useStore from "./useStore";
import { TfiClose } from "react-icons/tfi";
import { useSpring, animated } from "react-spring";
import macroLogo from "./images/macro.png";
import Projects from "./Projects";

const HtmlApp = () => {
  const isOpen = useStore((state) => state.isOpen);
  const setIsOpen = useStore((state) => state.setIsOpen);

  const closeButtonProps = useSpring({
    opacity: isOpen ? 1 : 0,
    top: isOpen ? 42 : 25,
    delay: isOpen ? 1000 : 0,
    config: { duration: isOpen ? 250 : 0 },
  });

  const aboutProps = useSpring({
    opacity: isOpen ? 1 : 0,
    y: isOpen ? 0 : 25,
    delay: isOpen ? 750 : 0,
    config: { duration: isOpen ? 250 : 0 },
  });

  return (
    <StyledHTML isOpen={isOpen}>
      <MainContentContainer>
        <StyledClose onClick={() => setIsOpen(false)} style={closeButtonProps}>
          <TfiClose />
        </StyledClose>
        <Header isOpen={isOpen} />

        <animated.p style={aboutProps}>
          <em className="hello">Hello!</em> I'm a{" "}
          <span className="creative">creative</span> developer with{" "}
          <em>over 7 years of professional experience.</em> I've worked on
          projects for comapnies such as{" "}
          <StyledCompany
            gradient=" linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%);"
            className="company"
          >
            Apple
          </StyledCompany>
          ,{" "}
          <StyledCompany
            gradient="linear-gradient(45deg, #4285F4, #DB4437, #F4B400 )"
            className="company"
          >
            Google
          </StyledCompany>
          ,{" "}
          <StyledCompany
            gradient="linear-gradient(45deg, #6772e5 75%, orange )"
            className="company"
          >
            Stripe
          </StyledCompany>{" "}
          and{" "}
          <StyledCompany
            gradient="linear-gradient(45deg, #111111 25%, white  )"
            className="company"
          >
            Nike
          </StyledCompany>
          .
        </animated.p>
        <animated.p style={aboutProps}>
          I've recently graduated from{" "}
          <a
            className="macro"
            target="_blank"
            href="https://0xmacro.com/engineering-fellowship"
            rel="noreferrer"
          >
            Macro Fellowship
            <img className="macro-logo" src={macroLogo} alt="macro logo" />
          </a>{" "}
          and am currently the lead front end developer for{" "}
          <a
            className="wanderers"
            target="_blank"
            href="https://www.wanderers.ai/"
            rel="noreferrer"
          >
            Wanderers.ai 👾
          </a>
        </animated.p>
        <ViewWork></ViewWork>
      </MainContentContainer>
      {isOpen && <Projects isOpen={isOpen} />}
    </StyledHTML>
  );
};

const StyledHTML = styled.div`
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  position: absolute;
  top: 0;

  .macro,
  .wanderers {
    color: #dc4597;
    font-weight: 900;
    position: relative;
  }
  .macro {
    background: -webkit-linear-gradient(45deg, #ffa965, #2a5eb9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .macro-logo {
    width: 7vw;
    transform: translateX(-16px);
  }
  em {
    font-weight: bolder;
    position: relative;
    z-index: 1;
  }
  p {
    color: black;
    font-weight: 500;
    font-size: 3.75vw;
    line-height: 160%;
    margin-top: 0;
  }
  .hello {
    font-size: 5vw;
  }
  .creative {
    text-shadow: 2px 2px white, 4px 4px orange;
  }
`;

const StyledCompany = styled.em`
  :after {
    content: "";
    height: 10px;
    width: 100%;
    background: ${(props) => props.gradient};
    position: absolute;
    left: 0;
    bottom: 0px;
    z-index: -1;
  }
`;

const StyledClose = styled(animated.button)`
  position: absolute;
  right: 30px;
  border: 0;
  background: 0;
  top: 42px;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.25s;
  &:hover {
    transform: scale(0.95);
  }
  svg {
    width: 50px;
    fill: black;
    height: 50px;
  }
`;

const MainContentContainer = styled.div`
  padding: 30px;
  height: 100vh;
  position: relative;
`;

const ViewWork = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 52px;
  padding-top: 10px;
  width: 100%;
  text-align: center;
  h5 {
    font-weight: 500;
  }
`;

export default HtmlApp;
