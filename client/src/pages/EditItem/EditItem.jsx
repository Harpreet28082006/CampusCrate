import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditItem.css";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  type: "",
  title: "",
  category: "",
  location: "",
  date: "",
  status: "",
  description: "",
});

  useEffect(() => {
    fetchItem();
  }, []);

  async function fetchItem() {
    try {
      const { data } = await axios.get(
        `https://campuscrate-1vil.onrender.com/api/items/${id}`
      );

      setFormData({
  type: data.item.type || "",
  title: data.item.title || "",
  category: data.item.category || "",
  location: data.item.location || "",
  date: data.item.date
    ? data.item.date.split("T")[0]
    : "",
  status: data.item.status || "",
  description: data.item.description || "",
});
    } catch (error) {
      console.error("Error fetching item:", error);
      alert("Failed to load item.");
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await axios.put(
        `https://campuscrate-1vil.onrender.com/api/items/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item updated successfully!");
      navigate("/my-items");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="edit-item">
      <h1>Edit Item</h1>

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

        <div className="form-group">
  <label>Item Type</label>

  <select
    name="type"
    value={formData.type}
    onChange={handleChange}
    required
  >
    <option value="">Select Type</option>
    <option value="lost">Lost Item</option>
    <option value="found">Found Item</option>
  </select>
</div>

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
          placeholder="Location"
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

        <div className="form-group">
  <label>Status</label>

  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    required
  >
    <option value="active">Active</option>
    <option value="claimed">Claimed</option>
    <option value="returned">Returned</option>
  </select>
</div>

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Item"}
        </button>
      </form>
    </section>
  );
}

export default EditItem;