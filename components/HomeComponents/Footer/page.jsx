import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <>
      <>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        <meta content="" name="description" />
        <meta content="" name="keywords" />
        {/* Favicons */}
        <link href="/assets/img/favicon.png" rel="icon" />
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Jost:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        />
        {/* Vendor CSS Files */}
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/boxicons/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
        <link
          href="/assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />
        <link href="/assets/css/style.css" rel="stylesheet" />

        <footer id="footer">
          <div className="footer-top ">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 footer-contact">
                  <div className="d-flex justify-content-between">
                    <div className="flex-glow-1">
                      <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="flex-glow-1 mt-1 ml-1.5">
                      <h4>Dayananda Sagar Colledge of Engineering</h4>
                    </div>
                  </div>
                  <p>
                    DAYANANDA SAGAR COLLEGE OF ENGINEERING,
                    <br />
                    SHAVIGE MALLESHWARA HILLS,
                    <br />
                    KUMARSWAMY LAYOUT, BANGALORE - 560 111 <br />
                    <br />
                    <strong>Phone:</strong> 9741882324, 9741889394, 9741214448
                    <br />
                    <strong>Email:</strong> admissions@dayanandasagar.edu
                    <br />
                  </p>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right" />{" "}
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />{" "}
                      <Link href="/dashboard">Dashboard</Link>``
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />{" "}
                      <Link href="https://www.dsce.edu.in/about/leadership/principal-message">
                        Principal Message
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Developer Team</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right" />{" "}
                      <a href="#">Darshil Mahraur</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />{" "}
                      <a href="#">Gautam Shorewala</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />{" "}
                      <a href="#">Niruth Anand</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Our Social Networks</h4>
                  <p>
                    Cras fermentum odio eu feugiat lide par naso tierra videa
                    magna derita valies
                  </p>
                  <div className="social-links mt-3">
                    <a href="#" className="twitter">
                      <i className="bx bxl-twitter" />
                    </a>
                    <a href="#" className="facebook">
                      <i className="bx bxl-facebook" />
                    </a>
                    <a href="#" className="instagram">
                      <i className="bx bxl-instagram" />
                    </a>
                    <a href="#" className="google-plus">
                      <i className="bx bxl-skype" />
                    </a>
                    <a href="#" className="linkedin">
                      <i className="bx bxl-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container footer-bottom cl earfix">
            <div className="copyright">
              © Copyright{" "}
              <strong>
                <span>DSCE</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/ */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
        {/* End Footer */}
      </>
    </>
  );
};

export default Footer;
