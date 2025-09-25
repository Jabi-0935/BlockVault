import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-center flex justify-center flex-col items-center border-t border-white mx-4 my-2 box-border">
        <div className="m-2 flex flex-col items-center justify-center ">
          Made with pressure by Ismaeel
          <div className="socials">
            <img
              className="w-6 h-6 m-2"
              src="src\assets\github-mark-white.svg"
              alt=""
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
