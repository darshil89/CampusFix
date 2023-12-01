"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import classes from "./main-header.module.css";
import Image from "next/image";
import { toast } from "react-toastify";

function MainHeader() {
  const { data: session, status } = useSession();
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

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image
          src="/images/logo.svg"
          className="ml-32"
          alt="logo"
          width={100}
          height={100}
        />
        <Link href="/" className="ml-6">
          DSCE
        </Link>
      </div>

      <div className={classes.lists}>
        <Link href="/">Home</Link>
        {checkAdmin && (
          <>
            <Link href="/allProblems">Dashboard</Link>
            <Link href="/allUsers">Users</Link>
            <Link href="/AdminFeedback">Feedback</Link>
            <button className={classes.btn} onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        )}

        

        {!session && (
          <>
            <Link href="/signup">Sign Up</Link>

            <Link href="/signin">Sign In</Link>
          </>
        )}
        {session && !checkAdmin && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="problemStatement"> Problem </Link>
            <Link href="/feedback">Feedback</Link>
            <Link href="/notification">Notification</Link>
            <button className={classes.btn} onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
