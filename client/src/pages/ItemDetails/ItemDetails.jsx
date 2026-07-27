import { useParams } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();

  return (
    <section>
      <h1>Item Details</h1>

      <h2>Black Wallet</h2>

      <p><strong>Item ID:</strong> {id}</p>

      <p><strong>Category:</strong> Wallet</p>

      <p><strong>Location:</strong> Library Block</p>

      <p><strong>Date:</strong> 26 July 2026</p>

      <p><strong>Description:</strong> Black leather wallet with college ID inside.</p>

      <p><strong>Status:</strong> Lost</p>
    </section>
  );
}

export default ItemDetails;