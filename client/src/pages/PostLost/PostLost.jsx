import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./PostLost.css";
import Button from "../../components/Button/Button";

function PostLost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      setFormData({
        ...formData,
        image: file,
      });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const title = formData.title.trim();
    const location = formData.location.trim();
    const description = formData.description.trim();

    if (!title) {
      return toast.error("Item title is required.");
    }

    if (title.length < 3) {
      return toast.error("Title must be at least 3 characters.");
    }

    if (!formData.category) {
      return toast.error("Please select a category.");
    }

    if (!location) {
      return toast.error("Location is required.");
    }

    if (location.length < 3) {
      return toast.error("Please enter a valid location.");
    }

    if (!formData.date) {
      return toast.error("Please select a date.");
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return toast.error("Future dates are not allowed.");
    }

    if (!description) {
      return toast.error("Description is required.");
    }

    if (description.length < 15) {
      return toast.error("Description must contain at least 15 characters.");
    }

    setLoading(true);

    try {
      const form = new FormData();

      form.append("type", "lost");
      form.append("title", title);
      form.append("category", formData.category);
      form.append("location", location);
      form.append("date", formData.date);
      form.append("description", description);

      if (formData.image) {
        form.append("photo", formData.image);
      }

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        "https://campuscrate-1vil.onrender.com/api/items",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message || "Lost item posted successfully!");

      setFormData({
        title: "",
        category: "",
        location: "",
        date: "",
        description: "",
        image: null,
      });

      setPreview("");
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="post-lost-page">

  <div className="post-lost-card">

    <div className="post-header">

      <h1>Report Lost Item</h1>

      <p>
        Tell us about your lost item so we can help you find it.
      </p>

    </div>

    <form
      className="lost-form"
      onSubmit={handleSubmit}
    >

      <div className="form-group">
        <label>Item Name *</label>

        <input
          type="text"
          name="title"
          placeholder="e.g. Black Wallet"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Category *</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select category</option>
          <option value="Electronics">Electronics</option>
          <option value="ID Card">ID Card</option>
          <option value="Wallet">Wallet</option>
          <option value="Keys">Keys</option>
          <option value="Books">Books</option>
          <option value="Bottle">Bottle</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="form-group">
        <label>Lost Location *</label>

        <input
          type="text"
          name="location"
          placeholder="e.g. Library Block C"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Date Lost *</label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group full-width">
        <label>Description *</label>

        <textarea
          rows="5"
          name="description"
          placeholder="Provide more details..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group full-width">

        <label>Upload Photo (Optional)</label>

        <label
          htmlFor="image"
          className="upload-box"
        >

          <span className="upload-icon">☁️</span>

          <h4>Drag & Drop Image</h4>

          <p>or click to browse</p>

          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            hidden
          />

        </label>

      </div>

      {preview && (

        <div className="preview-box full-width">

          <img
            src={preview}
            alt="Preview"
          />

        </div>

      )}

      <div className="full-width submit-area">

        <Button
          text={loading ? "Submitting..." : "Submit Lost Item"}
          type="submit"
          disabled={loading}
        />

      </div>

    </form>

  </div>

</section>
  );
}

export default PostLost;
