import { useRef } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

const [selectedImage, setSelectedImage] = useState(null);
const [previewImage, setPreviewImage] = useState("");
const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
    course: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = res.data.user;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        college: user.college || "",
        phone: user.phone || "",
        course: user.course || "",
        bio: user.bio || "",
      });
      setPreviewImage(user.profilePhoto || "");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setSelectedImage(file);
  setPreviewImage(URL.createObjectURL(file));
};

const uploadPhoto = async () => {
  if (!selectedImage) return;

  try {
    setUploading(true);

    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("photo", selectedImage);

    const res = await axios.put(
      "http://localhost:5000/api/users/profile/photo",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPreviewImage(res.data.profilePhoto);

    alert("Photo updated successfully!");

  } catch (error) {
    console.log(error);
    alert("Photo upload failed.");
  } finally {
    setUploading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: formData.name,
          college: formData.college,
          phone: formData.phone,
          course: formData.course,
          bio: formData.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");

      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">

      <h1>Edit Profile</h1>
<p>Keep your CampusCrate profile up to date.</p>

<div className="edit-profile-content">

  <div className="profile-card">

    <input
  type="file"
  accept="image/*"
  hidden
  ref={fileInputRef}
  onChange={handleImageChange}
/>

<div className="profile-avatar">

  {previewImage ? (
    <img
      src={previewImage}
      alt="Profile"
      className="profile-image"
    />
  ) : (
    formData.name.charAt(0).toUpperCase()
  )}

</div>

<h3>{formData.name || "Your Name"}</h3>

<p>{formData.email}</p>

<button
  type="button"
  className="change-photo-btn"
  onClick={() => fileInputRef.current.click()}
>
  Choose Photo
</button>

{selectedImage && (
  <button
    type="button"
    className="change-photo-btn"
    onClick={uploadPhoto}
    style={{ marginTop: "10px" }}
  >
    {uploading ? "Uploading..." : "Upload Photo"}
  </button>
)}

  </div>

  <form
    className="profile-form"
    onSubmit={handleSubmit}
  >

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label>College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

       </form>

</div>

</div>
</div>
  );
};

export default EditProfile;