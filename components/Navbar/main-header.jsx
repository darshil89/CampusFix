"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import classes from "./main-header.module.css";
import Image from "next/image";
import { toast } from "react-toastify";

function MainHeader() {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(true);

  // console.log("nav bar wala session ", session);
  const email = session?.user?.email;
  const checkAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const handleSignOut = () => {
    toast.info("Logging out", {
      autoClose: 4000,
    });
    setTimeout(() => {
      signOut();
    }, 2000);
  };

  const handler = () => {
    setShow(!show);
  }
  ;

  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Image
            src="/images/logo.svg"
            className={classes.image}
            alt="logo"
            width={100}
            height={100}
          />
          <Link href="/" className="ml-6">
            DSCE
          </Link>

          <button onClick={() => handler()} className={classes.trigger}>
            <svg
              width="60px"
              height="60px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5.5C2 4.94772 2.44772 4.5 3 4.5H21C21.5523 4.5 22 4.94772 22 5.5V6.5C22 7.05228 21.5523 7.5 21 7.5H3C2.44772 7.5 2 7.05228 2 6.5V5.5Z"
                fill="#ffffff"
              />
              <path
                d="M2 11.5C2 10.9477 2.44772 10.5 3 10.5H21C21.5523 10.5 22 10.9477 22 11.5V12.5C22 13.0523 21.5523 13.5 21 13.5H3C2.44772 13.5 2 13.0523 2 12.5V11.5Z"
                fill="#ffffff"
              />
              <path
                d="M3 16.5C2.44772 16.5 2 16.9477 2 17.5V18.5C2 19.0523 2.44772 19.5 3 19.5H21C21.5523 19.5 22 19.0523 22 18.5V17.5C22 16.9477 21.5523 16.5 21 16.5H3Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>

        {show && (
          <div className={classes.lists}>
            <Link className={classes.option} href="/">
              Home
            </Link>
            {session &&checkAdmin && (
              <>
                <Link className={classes.option} href="/allProblems">
                  Dashboard
                </Link>
                <Link className={classes.option} href="/allUsers">
                  Users
                </Link>
                <Link className={classes.option} href="/AdminFeedback">
                  Feedback
                </Link>
                <button className={classes.btn} onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            )}

            {!session && (
              <>
                <Link className={classes.option} href="/signup">
                  Sign Up
                </Link>

                <Link className={classes.option} href="/signin">
                  Sign In
                </Link>
              </>
            )}
            {session && !checkAdmin && (
              <>
                <Link className={classes.option} href="/dashboard">
                  Dashboard
                </Link>
                <Link className={classes.option} href="/problemStatement">
                  {" "}
                  Problem{" "}
                </Link>
                <Link className={classes.option} href="/feedback">
                  Feedback
                </Link>
                <Link className={classes.option} href="/notification">
                  Notification
                </Link>
                <button className={classes.btn} onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default MainHeader;
