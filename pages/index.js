import Head from "next/head";
import i18n from "../i18n";
import gambar1 from "../public/naufal.webp";
import gambar2 from "../public/laptop.webp";
import logo1 from "../public/html.webp";
import logo2 from "../public/css.webp";
import logo3 from "../public/js.webp";
import logo4 from "../public/php.webp";
import logo5 from "../public/laravel.webp";
import logo6 from "../public/codeigniter.webp";
import logo7 from "../public/nodejs.webp";
import logo8 from "../public/reactjs.webp";
import logo9 from "../public/nextjs.webp";
import logo10 from "../public/express.webp";
import logo11 from "../public/mysql.webp";
import logo12 from "../public/mongodb.webp";
import flagid from "../public/id.svg";
import flagen from "../public/gb.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BsMoonStarsFill,
  BsBrightnessHighFill,
  BsFileEarmarkText,
  BsHourglass,
} from "react-icons/bs";
import { FaLaravel, FaRegPaperPlane } from "react-icons/fa";
import Slider from "react-slick";
import {
  AiFillHtml5,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { FaCss3Alt } from "react-icons/fa";
import { RiArrowUpSLine } from "react-icons/ri";
import { BiCopyright } from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io";
import { DiCodeigniter } from "react-icons/di";
import { useRouter } from "next/router";
import Script from "next/script";
import { sendContactForm } from "@/lib/api";
import { toast } from "react-toastify";

const initValues = {
  name: "",
  email: "",
  subject: "Email From NaufalSaif WEB",
  message: "",
};

const initState = { values: initValues };

export default function Home() {
  const [navBar, setNavbar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [styleMessage, setStyleMessage] = useState(false);
  const [styleEmail, setStyleEmail] = useState(false);
  const [state, setState] = useState(initState);

  const { values, isLoading, errorForm } = state;

  let menuRef = useRef();
  const router = useRouter();
  const { locale } = router;
  const themeToast = darkMode ? "dark" : "light";

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }

    let menuHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setHamburgerActive(false);
      }
    };

    document.addEventListener("mousedown", menuHandler);

    window.onscroll = function () {
      const header = document.querySelector("header");
      const fixedNav = header.offsetTop;

      if (window.pageYOffset > fixedNav) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    const darkToggle = document.getElementById("dark-toggle");
    let darkToggleHandler = () => {
      if (darkToggle.getAttribute("data-dark") == 1) {
        localStorage.theme = "light";
      } else {
        localStorage.theme = "dark";
      }
    };
    darkToggle.addEventListener("click", darkToggleHandler);

    const dataLanguage = document.getElementById("language");

    let languageHandler = () => {
      locale === "en"
        ? (window.location.href = "/id")
        : (window.location.href = "/en");
    };

    dataLanguage.addEventListener("click", languageHandler);

    return () => {
      document.removeEventListener("mousedown", menuHandler);
      document.removeEventListener("click", darkToggleHandler);
      document.removeEventListener("click", languageHandler);
    };
  }, []);

  const messageToast = (type, message) => {
    if (type == "success") {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: themeToast,
      });
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: themeToast,
      });
    }
  };

  const handleChangeMessage = ({ target }) => {
    target.value.length > 0 ? setStyleMessage(true) : setStyleMessage(false);
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const handleChangeEmail = ({ target }) => {
    target.value.length > 0 ? setStyleEmail(true) : setStyleEmail(false);
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const handleBlurEmail = ({ target }) => {
    const emailValue = target.value;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailValue.match(emailRegex)) {
      messageToast("error", "Email tidak valid!");
    }
  };

  const handleChangeContact = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setState(initState);
      setStyleEmail(false);
      setStyleMessage(false);
      messageToast("success", "Pesan berhasil terkirim!");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        errorForm: error.message,
      }));
      messageToast("error", error.message);
    }
  };

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Head>
        <title>{i18n.t("judul-naufalsaif")}</title>
        <meta
          name="description"
          content={i18n.t("meta-description")}
          itemProp="description"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="text/html; charSet=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={i18n.t("naufalsaif")} />
        <meta property="og:title" content={i18n.t("judul-naufalsaif")} />
        <meta property="og:image" content={i18n.t("meta-og")} />
        <meta property="og:description" content={i18n.t("meta-description")} />
        <meta property="og:url" content={i18n.t("meta-url")} />
        <meta property="og:locale" content={i18n.t("meta-locale")} />
        <meta
          name="copyright"
          content={i18n.t("hak-cipta-naufalsaif")}
          itemProp="dateline"
        />

        <meta property="og:image:url" content={i18n.t("meta-og")} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={i18n.t("naufalsaif")} />

        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <meta content={i18n.t("meta-description")} itemProp="headline" />
        <meta
          name="keywords"
          content="Naufal Saif, Jasa Pembuat Website, Web Developer, Fullstack Developer, Universitas Bina Insani"
          itemProp="keywords"
        />
        <meta
          name="thumbnailUrl"
          content={i18n.t("meta-og")}
          itemProp="thumbnailUrl"
        />

        <meta content={i18n.t("meta-url")} itemProp="url" />
        <link rel="canonical" href={i18n.t("meta-url")} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={i18n.t("meta-twitter-username")} />
        <meta
          name="twitter:site:id"
          content={i18n.t("meta-twitter-username")}
        />
        <meta
          name="twitter:creator"
          content={i18n.t("meta-twitter-username")}
        />
        <meta name="twitter:description" content={i18n.t("meta-description")} />
        <meta name="twitter:image" content={i18n.t("meta-og")} />

        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-6LH45X6JZ1"
        />

        <Script strategy="lazyOnload">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-6LH45X6JZ1');
    `}
        </Script>
        <link rel="icon" href="/naufal.ico" />
      </Head>
      <div className="bg-white text-slate-500 dark:bg-dark dark:text-light">
        <header
          ref={menuRef}
          className={`absolute top-0 left-0 z-10 flex w-full items-center bg-transparent lg:px-40 ${
            navBar
              ? `${
                  darkMode ? "navbar-fixed-dark" : "navbar-fixed"
                } bg-white bg-opacity-70 backdrop-blur-sm dark:bg-dark dark:bg-opacity-50`
              : ""
          } `}
        >
          <div className="container">
            <div className="relative flex items-center justify-between">
              <div className="px-4 lg:px-0">
                <a
                  aria-label={`Website ${i18n.t("naufalsaif")}`}
                  href="#home"
                  className="block py-6 text-lg font-bold uppercase text-primary font-burtons"
                >
                  {i18n.t("naufalsaif")}
                </a>
              </div>
              <div className="flex items-center px-4 lg:px-0">
                <button
                  aria-label={i18n.t("aria-label-menu")}
                  id="hamburger"
                  name="hamburger"
                  type="button"
                  className={`absolute right-4 block lg:hidden ${
                    hamburgerActive ? "hamburger-active" : ""
                  }`}
                  onClick={() => setHamburgerActive(!hamburgerActive)}
                >
                  <span
                    className={`my-2 block h-[2px] w-[30px] bg-dark dark:bg-white origin-top-left transition duration-300 ease-in-out`}
                  ></span>
                  <span
                    className={`my-2 block h-[2px] w-[30px] bg-dark dark:bg-white transition duration-300 ease-in-out`}
                  ></span>
                  <span
                    className={`my-2 block h-[2px] w-[30px] bg-dark dark:bg-white origin-bottom-left transition duration-300 ease-in-out`}
                  ></span>
                </button>

                <nav
                  id="nav-menu"
                  className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark dark:shadow-slate-500 lg:static lg:block lg:max-w-full lg:rounded-none lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
                    !hamburgerActive ? "hidden" : ""
                  }`}
                >
                  <ul className="block lg:flex">
                    <li className="group">
                      <a
                        aria-label={i18n.t("beranda")}
                        href="#home"
                        className="flex py-2 mx-8 text-base lg:mx-7 text-dark dark:text-white group-hover:text-primary"
                      >
                        {i18n.t("beranda")}
                      </a>
                    </li>
                    <li className="group">
                      <a
                        aria-label={i18n.t("tentang-saya")}
                        href="#about"
                        className="flex py-2 mx-8 text-base lg:mx-7 text-dark dark:text-white group-hover:text-primary"
                      >
                        {i18n.t("tentang-saya")}
                      </a>
                    </li>
                    <li className="group">
                      <a
                        aria-label={i18n.t("proyek")}
                        href="#projects"
                        className="flex py-2 mx-8 text-base lg:mx-7 text-dark dark:text-white group-hover:text-primary"
                      >
                        {i18n.t("proyek")}
                      </a>
                    </li>
                    <li className="group">
                      <a
                        aria-label={i18n.t("linimasa")}
                        href="#timeline"
                        className="flex py-2 mx-8 text-base lg:mx-7 text-dark dark:text-white group-hover:text-primary"
                      >
                        {i18n.t("linimasa")}
                      </a>
                    </li>
                    <li className="group">
                      <a
                        aria-label={i18n.t("kontak")}
                        href="#kontak"
                        className="flex py-2 mx-8 text-base lg:mx-7 text-dark dark:text-white group-hover:text-primary"
                      >
                        {i18n.t("kontak")}
                      </a>
                    </li>
                    <li className="flex items-center justify-between mt-3 ml-8 mr-8 lg:mr-0 lg:mt-0">
                      <div className="flex">
                        <input
                          type="checkbox"
                          className="hidden"
                          id="dark-toggle"
                          data-dark={darkMode ? "1" : "0"}
                          onClick={() => setDarkMode(!darkMode)}
                        />
                        <label htmlFor="dark-toggle">
                          <div className="flex justify-between h-6 w-11 cursor-pointer items-center rounded-full bg-dark dark:bg-white p-[3px]">
                            <div
                              className={`${
                                darkMode ? "toggle-circle" : ""
                              } h-[18px] w-[18px] rounded-full bg-white dark:bg-dark transition duration-300 ease-in-out`}
                            ></div>
                            {darkMode ? (
                              <BsMoonStarsFill
                                className={`text-moon transition duration-300 ease-in-out ${
                                  darkMode ? "min-toggle-circle" : ""
                                }`}
                              />
                            ) : (
                              <BsBrightnessHighFill
                                className={`text-brightness transition duration-300 ease-in-out ${
                                  darkMode ? "min-toggle-circle" : ""
                                }`}
                              />
                            )}
                          </div>
                        </label>
                      </div>
                      <div
                        id="language"
                        className="w-6 h-6 overflow-hidden transition duration-300 border-2 rounded-full cursor-pointer border-dark dark:border-white lg:ml-4 hover:scale-110"
                      >
                        {locale === "id" ? (
                          <Image src={flagen} alt="Bendera United Kingdom" />
                        ) : (
                          <Image src={flagid} alt="Bendera Indonesia" />
                        )}
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <section
          id="home"
          className="flex items-center min-h-screen px-4 lg:px-0"
        >
          <div className="container">
            <div className="text-center">
              <h1 className="text-3xl font-medium md:text-4xl lg:text-5xl text-primary">
                Muhammad Naufal{" "}
                <div className="inline-block animate-fly">🚀</div>
              </h1>
              <h2 className="text-xl font-semibold md:text-2xl text-dark dark:text-white">
                {i18n.t("pengembang-web")}
              </h2>
            </div>
            <div className="mx-auto mt-6 overflow-hidden border-2 rounded-full w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-slate-700 dark:border-white">
              <Image src={gambar1} priority alt="Naufal Dev Profile Picture" />
            </div>
            <div className="mt-3 text-center">
              <a
                aria-label={i18n.t("mempekerjakan-saya")}
                href="#kontak"
                className="inline-block px-4 py-2 mt-4 text-base font-medium text-white rounded-lg shadow-sm shadow-slate-300 dark:shadow-slate-600 bg-primary lg:text-base hover:opacity-80"
              >
                {i18n.t("mempekerjakan-saya")}
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="px-4 py-24">
          <div className="container">
            <div className="flex flex-wrap">
              <div className="w-full mb-4 md:w-1/3 lg:w-1/2 md:mb-0 md:pr-4">
                <Image
                  src={gambar2}
                  alt="Laptop"
                  className="w-full lg:w-[600px] rounded-lg mx-auto shadow-lg"
                />
              </div>
              <div className="w-full md:w-2/3 lg:w-1/2">
                <h1 className="relative text-xl lg:text-3xl text-primary mb-14 uppercase before:content-[''] before:absolute before:w-10 before:h-[2px] before:bg-primary before:top-12 before:left-0 after:content-[''] after:absolute after:w-20 after:h-[2px] after:bg-primary after:top-10 after:left-0">
                  {i18n.t("tentang-saya")}
                </h1>
                <h2 className="mb-4 text-3xl lg:text-5xl text-dark dark:text-white">
                  {i18n.t("saya-naufal")}
                </h2>
                <p className="text-base text-justify lg:text-lg text-slate-700 dark:text-light">
                  {i18n.t("deskripsi-tentang-saya")}
                </p>
                <a
                  aria-label={i18n.t("unduh-cv")}
                  href="#"
                  className="inline-block px-4 py-2 mt-6 text-base font-medium text-white rounded-lg shadow-sm shadow-slate-300 dark:shadow-slate-600 bg-primary lg:text-base hover:opacity-80"
                >
                  {i18n.t("unduh-cv")}{" "}
                  <BsFileEarmarkText className="inline-block mb-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="px-4 dark:bg-slate-500">
          <div className="container py-4">
            <Slider {...settings}>
              <div className="px-4 slide">
                <Image src={logo1} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo2} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo3} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo4} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo5} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo6} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo7} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo8} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo9} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo10} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo11} alt="logos" className="mx-auto" />
              </div>
              <div className="px-4 slide">
                <Image src={logo12} alt="logos" className="mx-auto" />
              </div>
            </Slider>
          </div>
        </section>

        {/* color from simple icons */}
        <section id="projects" className="px-4 pt-24 pb-4">
          <div className="container">
            <div className="flex justify-center mb-4">
              <h1
                className={`relative text-xl lg:text-3xl flex text-primary mb-14 uppercase before:content-[''] before:absolute before:w-10 before:h-[2px] before:bg-primary before:top-12 after:content-[''] after:absolute after:w-20 after:h-[2px] after:bg-primary after:top-10`}
              >
                {i18n.t("proyek-saya")}
              </h1>
            </div>
            <div className="flex flex-wrap justify-center w-full gap-10">
              <div className="shadow-lg dark:shadow-md rounded overflow-hidden w-full md:w-[340px] lg:w-[350px] dark:shadow-white">
                <div className="w-full h-[250px] sm:h-[350px] image-card1"></div>
                <div className="px-4 pt-2 pb-6">
                  <h1 className="mb-3 text-lg font-semibold lg:text-xl text-dark dark:text-white">
                    <a
                      href="https://groupvista.000webhostapp.com/"
                      target="_blank"
                    >
                      {i18n.t("judul-card-1")}
                    </a>
                  </h1>
                  <div className="flex flex-wrap gap-1">
                    <div className="bg-[#E34F26] text-base lg:text-base px-3 py-1 text-white rounded-lg uppercase font-medium">
                      <span className="flex items-center h-full gap-1">
                        <AiFillHtml5 />
                        html
                      </span>
                    </div>
                    <div className="bg-[#1572B6] px-3 py-1 text-base lg:text-base text-white rounded-lg uppercase font-medium">
                      <span className="flex items-center h-full gap-1">
                        <FaCss3Alt />
                        css
                      </span>
                    </div>
                    <div className="bg-[#F7DF1E] px-3 py-1 text-base lg:text-base text-white rounded-lg uppercase font-medium">
                      <span className="flex items-center h-full gap-1">
                        <IoLogoJavascript />
                        javascript
                      </span>
                    </div>
                    <div className="bg-[#EF4223] px-3 py-1 text-base lg:text-base text-white rounded-lg uppercase font-medium">
                      <span className="flex items-center h-full gap-1">
                        <DiCodeigniter />
                        codeigniter
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow-lg dark:shadow-md rounded overflow-hidden w-full md:w-[340px] lg:w-[350px] dark:shadow-white">
                <div className="w-full h-[250px] sm:h-[350px] image-card2"></div>
                <div className="px-4 pt-2 pb-6">
                  <h1 className="mb-3 text-lg font-semibold lg:text-xl text-dark dark:text-white">
                    <a
                      href="https://bisikin7.000webhostapp.com/"
                      target="_blank"
                    >
                      {i18n.t("judul-card-2")}
                    </a>
                  </h1>
                  <div className="flex flex-wrap gap-1">
                    <div className="bg-[#E34F26] text-base lg:text-base px-3 py-1 text-white rounded-lg uppercase font-medium">
                      <span className="flex items-center h-full gap-1">
                        <AiFillHtml5 />
                        html
                      </span>
                    </div>
                    <div className="bg-[#1572B6] px-3 py-1 text-base lg:text-base text-white rounded-lg uppercase font-medium">
                      <span className="flex items-center h-full gap-1">
                        <FaCss3Alt />
                        css
                      </span>
                    </div>
                    <div className="bg-[#F7DF1E] px-3 py-1 text-base lg:text-base text-white rounded-lg uppercase font-medium">
                      <span className="flex items-center h-full gap-1">
                        <IoLogoJavascript />
                        javascript
                      </span>
                    </div>
                    <div className="bg-[#FF2D20] px-3 py-1 text-base lg:text-base text-white rounded-lg uppercase font-medium">
                      <span className="flex items-center h-full gap-1">
                        <FaLaravel />
                        laravel
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="timeline"
          className="flex flex-col items-center px-4 pt-24 timeline"
        >
          <h1
            className={`relative text-xl lg:text-3xl flex text-primary mb-14 uppercase before:content-[''] before:absolute before:w-10 before:h-[2px] before:bg-primary before:top-12 after:content-[''] after:absolute after:w-20 after:h-[2px] after:bg-primary after:top-10`}
          >
            {i18n.t("linimasa")}
          </h1>
          <div className="w-full lg:w-1/2">
            <ul>
              <li className="relative flex items-baseline gap-6 pb-5">
                <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    className="bi bi-circle-fill fill-primary"
                    viewBox="0 0 16 16"
                  >
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium lg:text-base text-primary">
                    2021 - Sekarang
                  </p>
                  <p className="mt-1 text-base text-slate-700 dark:text-light lg:text-lg">
                    {i18n.t("timeline-2")}
                  </p>
                </div>
              </li>
              <li className="relative flex items-baseline gap-6 pb-5">
                <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    className="bi bi-circle-fill fill-primary"
                    viewBox="0 0 16 16"
                  >
                    <circle cx="8" cy="8" r="8" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium lg:text-base text-primary">
                    2017 - 2020
                  </p>
                  <p className="mt-1 text-base text-slate-700 dark:text-light lg:text-lg">
                    {i18n.t("timeline-1")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col items-center px-4 pt-24" id="kontak">
          <h1
            className={`relative text-xl lg:text-3xl flex text-primary mb-14 uppercase before:content-[''] before:absolute before:w-10 before:h-[2px] before:bg-primary before:top-12 after:content-[''] after:absolute after:w-20 after:h-[2px] after:bg-primary after:top-10`}
          >
            {i18n.t("hubungi-saya")}
          </h1>
          <form method="POST" action="#" className="w-full lg:w-1/3">
            <div className="relative w-full h-[45px] lg:h-[50px] mb-6">
              <input
                type="text"
                className="absolute w-full h-full px-4 tracking-wide transition-all duration-200 ease-linear border border-solid rounded-lg outline-none border-slate-400 peer focus:border-primary focus:ring-2 valid:border-primary valid:ring-2 dark:text-white dark:bg-dark"
                name="name"
                onChange={handleChangeContact}
                required
                value={values.name}
              />
              <label className="absolute text-base tracking-wide transition-all duration-200 ease-in-out -translate-y-1/2 lg:text-base text-light dark:text-white top-1/2 left-4 peer-focus:top-0 peer-focus:bg-white dark:peer-focus:bg-dark peer-focus:px-1 peer-focus:text-primary peer-valid:top-0 peer-valid:bg-white dark:peer-valid:bg-dark peer-valid:px-1 peer-valid:text-primary autofill:bg-red-300">
                {i18n.t("nama")}
              </label>
            </div>
            <div className="relative w-full h-[45px] lg:h-[50px] mb-6">
              <input
                type="email"
                className={`absolute w-full h-full px-4 tracking-wide transition-all duration-200 ease-linear border border-solid rounded-lg outline-none peer focus:border-primary focus:ring-2 ${
                  !styleEmail
                    ? "border-light ring-0"
                    : "border-primary ring-2 dark:border-primary"
                }  dark:text-white dark:bg-dark`}
                required
                name="email"
                onChange={handleChangeEmail}
                onBlur={handleBlurEmail}
                value={values.email}
              />
              <label
                className={`absolute text-base tracking-wide transition-all duration-200 ease-in-out -translate-y-1/2 lg:text-base text-light top-1/2 left-4 peer-focus:top-0 peer-focus:bg-white dark:peer-focus:bg-dark peer-focus:px-1 peer-focus:text-primary 
                ${
                  !styleEmail
                    ? "text-light dark:text-white px-0"
                    : "top-[0px] bg-white dark:bg-dark px-1 text-primary dark:text-primary"
                }`}
              >
                Email
              </label>
            </div>
            <div className="relative w-full h-[135px] lg:h-[150px] mb-6">
              <textarea
                id="pesan"
                onChange={handleChangeMessage}
                className={`absolute h-full w-full outline-none border border-solid rounded-lg transition-all duration-200 ease-linear px-4 peer focus:border-primary focus:ring-2 dark:text-white dark:bg-dark ${
                  !styleMessage
                    ? "border-light ring-0"
                    : "border-primary ring-2"
                } tracking-wide py-3`}
                required
                name="message"
                value={values.message}
              ></textarea>
              <label
                className={`absolute text-base lg:text-base -translate-y-1/2 transition-all duration-200 ease-in-out left-4 bg-white peer-focus:top-0  peer-focus:px-1 peer-focus:text-primary dark:peer-focus:bg-dark dark:bg-dark ${
                  !styleMessage
                    ? "text-light dark:text-white top-[15%] px-0 "
                    : "top-0  px-1 text-primary dark:bg-dark"
                } tracking-wide`}
              >
                {i18n.t("pesan")}
              </label>
            </div>
            <button
              aria-label={i18n.t("kirim-pesan")}
              type="button"
              onClick={onSubmit}
              disabled={
                !values.name || !values.email || !values.message || isLoading
              }
              className={`inline-block px-4 py-2 text-base font-medium text-white rounded-lg shadow-sm shadow-slate-300 dark:shadow-slate-600 bg-primary lg:text-base hover:opacity-80 ${
                !values.name || !values.email || !values.message || isLoading
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              {!isLoading ? (
                <>
                  {i18n.t("kirim-pesan")}
                  <FaRegPaperPlane className="inline-block mb-1 ml-1" />
                </>
              ) : (
                <div className="flex">
                  <svg
                    class="mr-2 mt-[2px] h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="animate-pulse">Loading...</span>
                </div>
              )}
            </button>
          </form>
        </section>

        <a
          aria-label={i18n.t("aria-label-to-top")}
          href="#home"
          className={`fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-[99] ${
            !navBar ? "hidden" : ""
          } w-12 h-12 md:h-13 md:w-13 lg:h-14 lg:w-14 rounded-full bg-primary p-4 hover:animate-pulse animate-bounce flex justify-center items-center text-white`}
          id="to-top"
        >
          <div>
            <RiArrowUpSLine className="text-4xl md:text-5xl" />
          </div>
        </a>

        <section className="pt-24 dark:before:content-[''] dark:before:absolute dark:before:w-full dark:before:h-[1px] dark:before:bg-white ">
          <div className="pt-10 pb-16 lg:pt-16 lg:pb-24 bg-sky-400 dark:bg-primary">
            <div className="flex flex-col items-center">
              <h1 className="pb-3 text-xl text-white uppercase font-burtons lg:text-3xl dark:text-slate-100 lg:pb-4">
                {i18n.t("naufalsaif")}
              </h1>
              <div className="flex flex-wrap justify-center w-full gap-4 pb-5 lg:gap-6 lg:pb-6">
                <a
                  aria-label={i18n.t("aria-label-instagram")}
                  target="_blank"
                  href="https://www.instagram.com/nov06al"
                  className="bg-[#E4405F] w-8 h-8 lg:w-10 lg:h-10 rounded-full flex justify-center items-center hover:cursor-pointer shadow hover:scale-110 transition duration-200 ease-linear"
                >
                  <AiOutlineInstagram className="text-xl text-white lg:text-2xl dark:text-slate-100" />
                </a>
                <a
                  aria-label={i18n.t("aria-label-github")}
                  target="_blank"
                  href="https://github.com/naufalsaif"
                  className="bg-[#181717] w-8 h-8 lg:w-10 lg:h-10 rounded-full flex justify-center items-center hover:cursor-pointer shadow hover:scale-110 transition duration-200 ease-linear"
                >
                  <AiOutlineGithub className="text-xl text-white lg:text-2xl dark:text-slate-100" />
                </a>
                <a
                  aria-label={i18n.t("aria-label-linkedin")}
                  target="_blank"
                  href="https://www.linkedin.com/in/m-naufal-saif-alfauzan-2373b3260"
                  className="bg-[#0A66C2] w-8 h-8 lg:w-10 lg:h-10 rounded-full flex justify-center items-center hover:cursor-pointer shadow hover:scale-110 transition duration-200 ease-linear"
                >
                  <AiOutlineLinkedin className="text-xl text-white lg:text-2xl dark:text-slate-100" />
                </a>
              </div>
              <span className="flex items-center text-base font-normal tracking-wide text-white dark:text-slate-100 lg:text-base">
                <BiCopyright /> {i18n.t("hak-cipta-naufalsaif")}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
