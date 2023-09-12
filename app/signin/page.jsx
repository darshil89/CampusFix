"use client";
import { useRouter } from "next/navigation";
import classes from "./login.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";

const LoginIn = () => {
  useEffect(() => {
    toast.success("Welcome to DSCE");
  }, []);

  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const LoginUser = async (e) => {
    e.preventDefault();
    toast.info("Logging in", { autoClose: 5000 });

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log("res = ", res);
    if (res.error) {
      toast.error("Invalid Credentials");
    } else {
      toast.success("Login Successful");
    }

    router.push("/dashboard");
  };
  if (!session) {
    return (
      <>
        <div className={classes.container}>
          <div>
            <Image
              className="mx-auto h-10 w-auto"
              width={200}
              height={100}
              src="/images/dsceLogo.png"
              alt="Your Company"
            />
          </div>

          <div>
            <h2 className={classes.heading}>Sign In</h2>
            <form onSubmit={LoginUser}>
              <div>
                {/* <label className={classes.label}>Email address</label> */}
                <div className="mt-2">
                  <input
                    className={classes.input}
                    id="email"
                    name="email"
                    placeholder="Email"
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
                <div>
                  {/* <label className={classes.label}>Password</label> */}
                </div>
                <div className="mt-2">
                  <input
                    className={classes.input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
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
  }
};

export default LoginIn;
