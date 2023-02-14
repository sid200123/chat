import React, { useState } from "react";
import "./Register.scss";
import Add from "../../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            navigate("/");
          } catch (err) {
            setError(true);
          }
        });
      });
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Fake Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Name" />
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <input
            type="file"
            id="filee"
            style={{
              display: "none",
            }}
          />
          <label htmlFor="filee">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {error && <span>Something Went Wrong</span>}
        </form>
        <p>
          do you have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
