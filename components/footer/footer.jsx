"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./footer.module.css";
import {
  faLinkedin,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="p-10 bg-white   text-gray-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="mb-5 col-span-2 w-4/5">
              <div>
                <div className="flex items-center ">
                  <Image
                    width={50}
                    height={50}
                    src="/images/logo.svg"
                    alt="logo"
                    className="h-14 mb-5 w-14 mr-2"
                  />
                  <h1 className="text-xl pb-4 text-blue-900 font-bold">
                    Dayananda Sagar Colledge Of Engineering
                  </h1>
                </div>
              </div>
              <p>
                Shavige Malleshwara Hills,
                <br />
                91st Main Rd, 1st Stage,
                <br />
                Kumaraswamy Layout, <br />
                Bengaluru, Karnataka 560078 <br />
                <br />
                <strong>Phone:</strong>+91-80-42161750 / 1 <br />
                <strong>Email:</strong>admissions@dayanandasagar.edu
              </p>
            </div>
            <div className="mb-5">
              <h4 className="text-blue-900 font-bold">Quick Links</h4>
              <ul>
                <li className="pb-5">
                  <FontAwesomeIcon
                    className="text-gray-600"
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                  <a href="#" className="hover:text-gray-800 ml-2">
                    Home
                  </a>
                </li>
                <li className="pb-5">
                  <FontAwesomeIcon
                    className="text-gray-600"
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                  <a href="#" className="hover:text-gray-800 ml-2">
                    Dashboard
                  </a>
                </li>
                <li className="pb-5">
                  <FontAwesomeIcon
                    className="text-gray-600"
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                  <a href="#" className="hover:text-gray-800 ml-2">
                    Principal Message
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="text-blue-900 font-bold">Developers</h4>
              <ul className="text-grey-500">
                <li className="pb-5">
                  <FontAwesomeIcon
                    className="text-gray-600"
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                  <a href="#" className="hover:text-gray-800 ml-2">
                    Darshil Mahraur
                  </a>
                </li>
                <li className="pb-5">
                  <FontAwesomeIcon
                    className="text-gray-600"
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                  <a href="#" className="hover:text-gray-800 ml-2">
                    Gautam Shorewala
                  </a>
                </li>
                <li className="pb-5">
                  <FontAwesomeIcon
                    className="text-gray-600"
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                  <a href="#" className="hover:text-gray-800 ml-2">
                    Niruth Anand
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="text-blue-900 font-bold">Our Social Networks</h4>
              <p className="text-grey-500">
                You can connect with us on any of our social networks listed
                below
              </p>
              <div className="flex items-center ">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-blue-600 text-2xl mr-4 "
                />
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-blue-600 text-2xl mr-4"
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-blue-600 text-2xl mr-4"
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-blue-600 text-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white">
        <div className={classes.footer}>
          <div className="text-center">
            <div>
              Copyright
              <strong>
                <span>company</span>
              </strong>
              . All Rights Reserved
            </div>
            <br />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
