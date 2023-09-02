"use client";
import { useRouter } from "next/navigation";
import classes from "./admin.module.css";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
const Admin = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const LoginUser = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    router.push("/adminPortal");
  };
  return (
    <>
      <div>
        <div>
          <Image
            className="mx-auto h-10 w-auto"
            width={200}
            height={100}
            src="/images/dsceLogo.png"
            alt="Your Company"
          />
          <h2>Admin Login</h2>
        </div>

        <div>
          <form onSubmit={LoginUser}>
            <div>
              <label>Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <div>
                <label>Password</label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
