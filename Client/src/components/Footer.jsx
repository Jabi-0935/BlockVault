import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <footer className="text-center flex justify-center flex-col items-center border-t border-white mx-4 my-2 box-border">
        <div className="m-2 flex flex-col items-center justify-center ">
          Made with pressure by Ismaeel
          <div className="socials">
            <a href="https://github.com/Jabi-0935" target="_blank">
              <FontAwesomeIcon icon="fa-brands fa-github" size="2x" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
