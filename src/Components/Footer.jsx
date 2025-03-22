import React from "react";

const Footer = () => {
  return (
    <footer className="mt-40 bg-slate-700 text-white py-16 pt-30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Topsportslab Column */}
            <div>
              <h3 className="font-bold text-lg  mb-6">Topsportslab</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-orange-400 hover:underline">
                    Athlete Management System
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Doctor Management System
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Coach Management System
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="font-bold text-lg mb-6">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Conditions of use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Privacy Statement
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-bold text-lg mb-6">Contact</h3>
              <p className="mb-2">We'd love to hear from you!</p>
              <p className="mb-6">Questions or suggestions?</p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded transition duration-300">
                CONTACT US
              </button>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-600 flex flex-col items-center">
            <div className="mb-4">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-white"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M15 6.5l-3 7.5-3-7.5z" />
              </svg>
            </div>
            <p className="text-sm text-center">
              All rights reserved - Google Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
