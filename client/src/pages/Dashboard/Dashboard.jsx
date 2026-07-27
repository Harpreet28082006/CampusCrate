import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section>
      <h1>User Dashboard</h1>

      <ul>
        <li>
          <Link to="/post-lost">Post Lost Item</Link>
        </li>

        <li>
          <Link to="/post-found">Post Found Item</Link>
        </li>

        <li>My Posts</li>

        <li>Profile</li>
      </ul>
    </section>
  );
}

export default Dashboard;