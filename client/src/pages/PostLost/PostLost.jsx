import Button from "../../components/Button/Button";

function PostLost() {
  return (
    <section>
      <h1>Report Lost Item</h1>

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
          placeholder="Lost Location"
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

        <Button text="Submit Lost Item" />
      </form>
    </section>
  );
}

export default PostLost;