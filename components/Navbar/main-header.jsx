import Link from "next/link";

import classes from "./main-header.module.css";
import Image from "next/image";

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Image src="/images/dsceLogo.png" alt="logo" width={200} height={100} />
        <Link href="/">DSCE</Link>
      </div>

      <div className={classes.lists}>
        <Link href="/admin">Admin</Link>

        <Link href="/signup">Sign Up</Link>

        <Link href="/signin">Sign In</Link>
      </div>
    </header>
  );
}

export default MainHeader;
