"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import classes from "./problem.module.css";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";


export default function Problems(props) {
  const { data: session , update } = useSession();
  const id = props.id;
  const name = props.name;
  const status = props.status;

  const [file, setFile] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFile([...file, ...acceptedFiles]);
    },
  });
  const [data, setData] = useState({
    title: "",
    content: "",
    buildingNumber: "",
    floorNumber: "",
    roomNumber: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();

    toast.info("on going", { autoClose: 5000 });
    const filePaths = [];
    console.log(file);
    const uploadedImageUrls = [];

    for (const f of file) {
      const formData = new FormData();
      formData.append("file", f);
      formData.append(
        "upload_preset",
        "jx3jfkqs"
      );
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadImageData = await uploadResponse.json();
      console.log(uploadImageData);
      uploadedImageUrls.push(uploadImageData.secure_url);
    }
    console.log(uploadedImageUrls);
    const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://dayanand.vercel.app";
    const res = await fetch(`${baseUrl}/api/problems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, id, name, status, uploadedImageUrls }),
    });

    const result = await res.json();

    console.log(result.error);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    // update({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     problems: [...session.user.problems, result],
    //   },
    // })
    toast.success("Problem Added", { autoClose: 4000 });
    // console.log("result  =  ", result);
    setData({
      title: "",
      content: "",
      buildingNumber: "",
      floorNumber: "",
      roomNumber: "",
    });
    setFile([]);
  };
  if (!session) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Please Signin</h1>
      </div>
    );
  } 
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.box1}>
        <label className={classes.label}> Problem Type</label>
        <select
          id="title"
          name="title"
          className={classes.select}
          placeholder="Problem Type"
          value={data.title}
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
        >
          <option className={classes.option} value="null">
            Select Problem{" "}
          </option>
          <option className={classes.option} value="Electrical">
            Electrical
          </option>
          <option className={classes.option} value="Carpentary">
            Carpentary
          </option>
          <option className={classes.option} value="Plumber">
            Plumber
          </option>
          <option className={classes.option} value="other">
            other
          </option>
        </select>
      </div>
      <div className={classes.box2}>
        {/* <label className={classes.label}>content</label> */}
        <textarea
          className={classes.textarea}
          type="text"
          placeholder="Content"
          value={data.content}
          onChange={(e) => {
            setData({ ...data, content: e.target.value });
          }}
        />
      </div>

      <div className={classes.box3}>
        {/* <label className={classes.label}>Location</label> */}
        <input
          className={classes.input}
          type="number"
          placeholder="Building Number"
          value={data.buildingNumber}
          onChange={(e) => {
            setData({ ...data, buildingNumber: e.target.value });
          }}
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Floor Number"
          value={data.floorNumber}
          onChange={(e) => {
            setData({ ...data, floorNumber: e.target.value });
          }}
        />
        <input
          className={classes.input}
          type="number"
          placeholder="Room Number"
          value={data.roomNumber}
          onChange={(e) => {
            setData({ ...data, roomNumber: e.target.value });
          }}
        />
      </div>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {file.length > 0 ? (
          <div>
            {file.map((f) => (
              <p key={f.name}>{f.name}</p>
            ))}
          </div>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
      <button className={classes.submit} type="submit">
        Submit
      </button>
    </form>
  );
}
