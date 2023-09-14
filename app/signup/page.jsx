"use client";

import classes from "./signup.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
const SignUp = () => {
  const { data: session, status } = useSession();
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
  if (!session) {
    return (
      <>
        <div className={classes.container}>
          
          <div>
            <h2 className={classes.heading}>Register</h2>
            <form onSubmit={registerUser}>
              <div>
                <div className="mt-2">
                  <input
                    placeholder="Name"
                    className={classes.input}
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
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    className={classes.input}
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <div></div>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    className={classes.input}
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
                <button className={classes.btn} type="submit">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    router.push("/dashboard");
  }
};

export default SignUp;
