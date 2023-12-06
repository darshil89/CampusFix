"use client";

import classes from "./signup.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Link from "next/link";
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
    toast.info("Registering User");
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
    const result = await res.json();
    if (res.ok) {
      toast.success("User Registered");
      router.push("/signin");
    } else {
      toast.error(result.error);
    }

    console.log(result);
  };
  if (!session) {
    return (
     
      <>
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
                Register
              </h1>

              <form onSubmit={registerUser} className="space-y-4">
              <div>
                  <label
                    for="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                  placeholder="Name"
                    id="name"
                    name="name"
                    type="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    placeholder="Email"
                    id="email"
                    name="email"
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
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
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
                    Register
                  </button>
                </div>
              </form>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  Already have an account?{" "}
                  <Link href="/signin">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  } else {
    router.push("/dashboard");
  }
};

export default SignUp;
