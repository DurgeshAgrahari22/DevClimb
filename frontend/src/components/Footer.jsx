import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content w-full mt-auto p-6 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo and Info */}
        <div className="flex items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
              10-4.48 10-10S17.52 2 12 2zM4 12c0-4.41 
              3.59-8 8-8s8 3.59 8 8-3.59 8-8 
              8-8-3.59-8-8z" />
          </svg>
          <p className="text-sm">
            © {new Date().getFullYear()} DevClimb. All rights reserved.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-5">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 
              4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 
              4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 
              20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 
              0 0023 3z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 8H6v4h3v12h5V12h3.5L18 
              8h-3V6.5a1.5 1.5 0 011.5-1.5H18V2h-3a4 4 
              0 00-4 4v2z" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 
              5v14c0 2.76 2.24 5 5 5h14c2.76 0 
              5-2.24 5-5v-14c0-2.76-2.24-5-5-5zM8 
              19h-3v-10h3v10zM6.5 7c-.97 0-1.75-.78-1.75-1.75S5.53 
              3.5 6.5 3.5 8.25 4.28 8.25 5.25 7.47 
              7 6.5 7zM20 19h-3v-5.5c0-1.38-1.12-2.5-2.5-2.5S12 
              12.12 12 13.5V19h-3v-10h3v1.32c.68-1.26 
              2.18-2.32 3.88-2.32 2.86 0 5.12 2.32 
              5.12 5.18V19z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
