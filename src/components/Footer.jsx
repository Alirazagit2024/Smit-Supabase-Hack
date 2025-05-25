import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "flowbite";

function Footer() {
  return (
    <>
      <footer className="bg-[#121212] border-t border-b border-gray-700">
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
            <div className="text-center">
              <h2 className="md:text-left text-2xl font-bold text-[#FF6B00] text-shadow-md">
                Ali Raza
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Transforming ideas into reality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center">
              <Link
                to="#"
                className="text-gray-400 hover:text-[#F9F9F9] transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-[#F9F9F9] transition"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-[#F9F9F9] transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-700 my-6"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">
              &copy; 2025 Ali Raza. All Rights Reserved.
            </p>

            <p className="text-sm text-gray-500 text-center">
              Designed & coded with 💻 by{" "}
              <span className="text-[#FF5C00]">Ali Raza</span>
            </p>

            <div className="flex gap-4 justify-center text-2xl">
              <Link
                to="https://wa.me/923342129678"
                target="_blank"
                className="text-gray-400 text-[1.7rem] hover:text-[#FF3D00] transition"
                aria-label="whatsapp"
              >
                <FaWhatsapp />
              </Link>
              <Link
                to="https://github.com/Alirazagit2024"
                target="_blank"
                className="text-gray-400 hover:text-[#FF3D00] transition"
                aria-label="Github"
              >
                <FaGithub />
              </Link>
              <Link
                to="https://www.linkedin.com/in/aliraza-reactjs"
                target="_blank"
                className="text-gray-400 hover:text-[#FF3D00] transition"
                aria-label="linkedin"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
