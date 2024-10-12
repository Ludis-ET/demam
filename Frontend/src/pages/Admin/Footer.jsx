import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-clayBrown text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-lg font-semibold mb-2">Developers</h2>

        <div className="mb-4">
          <h3 className="text-md font-semibold">Frontend Developers</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Developer One</li>
            <li>Developer Two</li>
            <li>Developer Three</li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-md font-semibold">Backend Developers</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Developer Four</li>
            <li>Developer Five</li>
            <li>Developer Six</li>
          </ul>
        </div>

        <p className="mb-1">Address: 123 Developer Lane, Code City, DE 12345</p>
        <p className="mb-1">Email: contact@yourcompany.com</p>
        <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>

        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-white hover:text-gray-300" size={24} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-white hover:text-gray-300" size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn
              className="text-white hover:text-gray-300"
              size={24}
            />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-white hover:text-gray-300" size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};
