import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <>
      <footer className="text-center flex justify-center flex-col items-center border-t border-white mx-4 my-2 box-border">
        <div className="m-2 flex flex-col items-center justify-center ">
          Made with pressure by Ismaeel
          <div className="socials">
            <FontAwesomeIcon icon="fa-brands fa-github" size="2x" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
