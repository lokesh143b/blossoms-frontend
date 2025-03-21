import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.css";
import { assets } from "../../assets/frontend_assets/assets";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../../context/MyContext";
import Cookies from "js-cookie";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    image: "",
  });

  const [changePasswordDetails, setChangePasswordDetails] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
    errMsg: "",
  });

  const [changePasswordActive, setChangePasswordActive] = useState(false);

  const { url, token } = useContext(MyContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(url + "/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setProfile({
            name: result.profile.name || "",
            phone: result.profile.phone || "",
            address: result.profile.address || "",
            email: result.profile.email || "",
            image: result.profile.image || "",
          });
          setImagePreview(
            result.profile.image
              ? url + "/images/" + result.profile.image
              : assets.profile_pic
          );
        } else {
          toast.error("Failed to load profile data.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching profile data.");
      }
    };

    fetchProfile();
  }, [url, token]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (event) => {
    setChangePasswordDetails({
      ...changePasswordDetails,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image); // Add the image file
      }

      const response1 = await fetch(url + "/food/add-profile-pic", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response1.ok) {
        const result = await response1.json();
        console.log(result);
      } else {
        toast.error("Failed to update profile pic.");
      }
      const response = await fetch(url + "/user/add-profile-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile.");
    }
  };

  const clickOnChangePassword = async () => {
    setChangePasswordActive(true);
    setLoader(true);
    try {
      const response = await fetch(url + "/auth/request-otp", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success("OTP sent your Email and Phone");
        const result = await response.json();
        setLoader(false);
        console.log(result);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error);
    } finally {
      setLoader(false);
    }
  };

  const onclickSetPassword = async () => {
    const { otp, newPassword, confirmPassword } = changePasswordDetails;

    if (!otp || !newPassword || !confirmPassword) {
      setChangePasswordDetails((prev) => ({
        ...prev,
        errMsg: "*All fields are required",
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangePasswordDetails((prev) => ({
        ...prev,
        errMsg: "*Passwords do not match",
      }));
      return;
    }

    setChangePasswordDetails((prev) => ({ ...prev, errMsg: "" }));

    const data = { otp, newPassword };

    try {
      const response = await fetch(`${url}/auth//verify-otp/password-change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        console.error("Error response:", errorResult);
        setChangePasswordDetails({
          otp: "",
          newPassword: "",
          confirmPassword: "",
          errMsg: "",
        });
        toast.error(errorResult.message || "An error occurred.");
        setChangePasswordActive(false);
        return;
      }

      const result = await response.json();
      console.log(result);
      toast.success(result.message);
      setChangePasswordDetails({
        otp: "",
        newPassword: "",
        confirmPassword: "",
        errMsg: "",
      });
      setChangePasswordActive(false);
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const profileRightBlock = () => {
    return (
      <ul className="profile-right">
        {changePasswordActive ? (
          ""
        ) : (
          <li onClick={clickOnChangePassword}>change password</li>
        )}

        {changePasswordActive ? (
          <div className="profile-right-set-password">
            <label htmlFor="Otp">OTP</label>
            <input
              onChange={handlePasswordChange}
              name="otp"
              id="Otp"
              value={changePasswordDetails.otp}
              type="text"
              placeholder="Enter your OTP"
            />
            <label htmlFor="newPassword">Set new password</label>
            <input
              onChange={handlePasswordChange}
              name="newPassword"
              id="newPassword"
              value={changePasswordDetails.newPassword}
              type="password"
              placeholder="Enter new password"
            />
            <label htmlFor="cofirmPassword">Confirm new password</label>
            <input
              onChange={handlePasswordChange}
              name="confirmPassword"
              id="cofirmPassword"
              value={changePasswordDetails.confirmPassword}
              type="password"
              placeholder="Confirm new password"
            />
            <p className="error-msg">{changePasswordDetails.errMsg}</p>
            <button onClick={onclickSetPassword} type="button">
              Set password
            </button>
          </div>
        ) : (
          ""
        )}
      </ul>
    );
  };

  const renderLoader = () => {
    return (
      <>
        {loader ? (
          <div className="profile-loader-container">
            <div className="loader-container">
              <div className="circular-loader"></div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <div className="profile-main-container">
      {/* -----------------loader--------------- */}
      {renderLoader()}
      <form onSubmit={submitForm} className="profile-container">
        <ToastContainer />

        {isEditing ? (
          <label htmlFor="profilePic" className="profile-img-container">
            <img
              className="profile-pic"
              src={imagePreview || assets.profile_pic}
              alt="Profile"
            />
            <img
              className="profile-pic-add-icon"
              src={assets.add_icon_white}
              alt=""
            />
          </label>
        ) : (
          <img className="profile-pic" src={imagePreview} alt="" />
        )}

        <input
          onChange={handleImageChange}
          id="profilePic"
          type="file"
          accept="image/*"
        />

        <div className="profile-details">
          {isEditing ? (
            <>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your name"
              />
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your phone number"
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your address"
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="profile-input"
                placeholder="Enter your email"
              />
            </>
          ) : (
            <>
              <label>Name</label>
              <p>{profile.name}</p>
              <label>Phone</label>
              <p>{profile.phone}</p>
              <label>Address</label>
              <p>{profile.address}</p>
              <label>Email</label>
              <p>{profile.email}</p>
            </>
          )}

          {isEditing ? (
            <div className="btn-group">
              <button type="submit" className="edit-btn">
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="edit-btn"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className="edit-btn"
            >
              Edit
            </button>
          )}
        </div>
      </form>
      {profileRightBlock()}
    </div>
  );
};

export default MyProfile;
