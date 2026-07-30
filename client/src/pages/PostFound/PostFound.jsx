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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const form = new FormData();

      form.append("type", "found");
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("location", formData.location);
      form.append("date", formData.date);
      form.append("description", formData.description);

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
        }
      );

      toast.success(data.message || "Found item posted successfully!");

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

      toast.error(
        error.response?.data?.message || error.message
      );
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
    </section>
  );
}

export default PostFound;