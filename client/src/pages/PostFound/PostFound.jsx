import Button from "../../components/Button/Button";

function PostFound() {
  return (
    <section>
      <h1>Report Found Item</h1>

      <form>
        <input
          type="text"
          placeholder="Item Name"
        />

        <br /><br />

        <input
          type="text"
          placeholder="Category"
        />

        <br /><br />

        <input
          type="text"
          placeholder="Found Location"
        />

        <br /><br />

        <input
          type="date"
        />

        <br /><br />

        <textarea
          placeholder="Description"
          rows="5"
        ></textarea>

        <br /><br />

        <Button text="Submit Found Item" />
      </form>
    </section>
  );
}

export default PostFound;