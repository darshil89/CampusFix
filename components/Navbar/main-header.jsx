"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import classes from "./main-header.module.css";
import Image from "next/image";
import { useState } from "react";
function MainHeader() {
  const [checkAdmin, setCheckAdmin] = useState(false);
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  if (email === "manasa3@gmail.com") {
    setCheckAdmin(true);
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image src="/images/dsceLogo.png" alt="logo" width={200} height={100} />
        <Link href="/">DSCE</Link>
      </div>

      <div className={classes.lists}>
        {checkAdmin && <Link href="/adminPortal">Admin Portal</Link>}

        {!checkAdmin && !session && <Link href="/admin">Admin</Link>}

        {!session && (
          <>
            <Link href="/signup">Sign Up</Link>

            <Link href="/signin">Sign In</Link>
          </>
        )}
        {session && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button className={classes.btn} onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
