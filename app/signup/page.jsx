"use client";

import classes from "./signup.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.ok) {
      router.push("/signin");
    }

    const result = await res.json();
    console.log(result);
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
          <h2>Register</h2>
        </div>

        <div>
          <form onSubmit={registerUser}>
            <div>
              <label>Name</label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
              </div>
            </div>
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
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
