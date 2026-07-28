import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="dashboard">

      <h1>Welcome {user?.name || "User"} 👋</h1>

      <p>Manage your lost and found items from one place.</p>

      <br />

      <div className="dashboard-stats">

        <div className="card">
          <h2>0</h2>
          <p>Total Posts</p>
        </div>

        <div className="card">
          <h2>0</h2>
          <p>Lost Items</p>
        </div>

        <div className="card">
          <h2>0</h2>
          <p>Found Items</p>
        </div>

      </div>

      <br />

      <div className="dashboard-actions">

        <Link to="/post-lost">
          <button>+ Report Lost Item</button>
        </Link>

        <Link to="/post-found">
          <button>+ Report Found Item</button>
        </Link>

      </div>

      <br />

      <h2>My Recent Posts</h2>

      <div className="recent-posts">

        <div className="card">
          <h3>No Posts Yet</h3>
          <p>Your lost and found items will appear here.</p>
        </div>

      </div>

    </section>
  );
}

export default Dashboard;