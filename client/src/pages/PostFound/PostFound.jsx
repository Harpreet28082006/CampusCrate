import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";

function PostFound() {
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

      form.append("type", "found");
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
        "http://localhost:5000/api/items",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(data.message || "Found item posted successfully!");

      setPreview("");

      setFormData({
        title: "",
        category: "",
        location: "",
        date: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.log(error.response);
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="post-found">
      <h1>Report Found Item</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Item Name"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="ID Card">ID Card</option>
          <option value="Wallet">Wallet</option>
          <option value="Keys">Keys</option>
          <option value="Books">Books</option>
          <option value="Bottle">Bottle</option>
          <option value="Others">Others</option>
        </select>

        <br />
        <br />

        <input
          type="text"
          name="location"
          placeholder="Found Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <br />
        <br />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <br />
        <br />

        <Button
          text={loading ? "Submitting..." : "Submit Found Item"}
          type="submit"
          disabled={loading}
        />
      </form>



{preview && (
  <>
    <br />

    <img
      src={preview}
      alt="Preview"
      style={{
        width: "220px",
        borderRadius: "10px",
        objectFit: "cover",
      }}
    />

    <br />
    <br />
  </>
)}

    </section>
  );
}

export default PostFound;
