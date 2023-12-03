"use client";
import { useRouter } from "next/navigation";
import classes from "./login.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";


const LoginIn = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const checkAdmin = email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const LoginUser = async (e) => {
    e.preventDefault();
    toast.info("Logging in", { autoClose: 4500 });

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    console.log("res = ", res);
    if (res.error) {
      toast.error("Invalid Credentials");
    } else if (res.ok) {
      toast.success("Login Successful");
    } else if (!checkAdmin) {
      router.push("/dashboard");
    } else {
      router.push("/allProblems");
    }
  };
  if (!session) {
    return (
      <div className="flex w-full justify-center">
        <div className="flex lg:w-3/4  ">
          <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
            <div className="max-w-md text-center">
              <Image
                src="/images/signupImg.jpg"
                width={600}
                height={600}
                alt="img"
              ></Image>
            </div>
          </div>

          <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
            <div className="max-w-md w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Sign In
              </h1>

              <form onSubmit={LoginUser} className="space-y-4">
                <div>
                  <label
                    for="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link href="/signup">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    if (!checkAdmin) {
      router.push("/dashboard");
    } else {
      router.push("/allProblems");
    }
  }
};

export default LoginIn;
