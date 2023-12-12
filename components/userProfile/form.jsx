"use client";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Form() {
  const { data: session, update } = useSession();
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const profilePhotoRef = useRef("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", profilePhotoRef.current.files[0]);
    formData.append("upload_preset", "jx3jfkqs");
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadImageData = await uploadResponse.json();

    await update({
      ...session,
      user: {
        ...session?.user,
        image: uploadImageData.secure_url,
      },
    });

   

    const data = {
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      userId: session.user.id,
      image: uploadImageData.secure_url,
    };

    try {
      toast.info("Updating Profile");
      const res = await fetch("/api/userUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      const result = await res.json();
      console.log("data = ", result);
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error = ", error);
    } finally {
      toast.success("Profile Updated Successfully");
    }

     profilePhotoRef.current.value = "";
     passwordRef.current.value = "";
     confirmPasswordRef.current.value = "";
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            name="password"
            type="password"
            placeholder="Enter New Password"
            className="w-full border rounded-md py-2 px-3"
            ref={passwordRef}
          />
        </div>
        <div className="mb-4">
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            className="w-full border rounded-md py-2 px-3"
            ref={confirmPasswordRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Profile Photo:
          </label>
          <input
            name="profilePhoto"
            type="file"
            className="w-full border rounded-md py-2 px-3"
            ref={profilePhotoRef}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
