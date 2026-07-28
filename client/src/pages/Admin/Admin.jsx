import "./Admin.css";

function Admin() {
  return (
    <section className="admin">

      <h1>Admin Dashboard</h1>

      <p className="subtitle">
        Manage users and monitor lost & found activities.
      </p>

      <div className="admin-stats">

        <div className="admin-card">
          <h2>50</h2>
          <p>Total Users</p>
        </div>

        <div className="admin-card">
          <h2>18</h2>
          <p>Lost Items</p>
        </div>

        <div className="admin-card">
          <h2>12</h2>
          <p>Found Items</p>
        </div>

      </div>

      <h2>Recent Activity</h2>

      <div className="activity-card">
        <p>• Black Wallet reported lost.</p>
        <p>• College ID Card marked as found.</p>
        <p>• New user registered.</p>
      </div>

    </section>
  );
}

export default Admin;