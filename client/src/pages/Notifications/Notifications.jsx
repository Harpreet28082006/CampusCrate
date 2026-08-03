import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("FULL RESPONSE", data);

      console.log("NOTIFICATIONS", data.notifications);

      setNotifications(data.notifications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = useMemo(() => {
    if (filter === "all") {
      return notifications;
    }

    if (filter === "unread") {
      return notifications.filter((n) => !n.isRead);
    }

    return notifications.filter((n) => n.type === filter);
  }, [notifications, filter]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/notifications/${id}/read`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="notifications-page">
      {/* HEADER */}

      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>

          <p>Stay updated with all activities.</p>
        </div>

        <button className="read-btn">✓ Mark all as read</button>
      </div>

      {/* FILTERS */}

      <div className="filter-row">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "unread" ? "active-filter" : ""}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>

        <button
          className={filter === "claim" ? "active-filter" : ""}
          onClick={() => setFilter("claim")}
        >
          Claims
        </button>

        <button disabled>Messages</button>
      </div>

      {/* LIST */}

      <div className="notifications-list">
        {loading ? (
          <h2 style={{ textAlign: "center" }}>Loading...</h2>
        ) : filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <h2> You're all caught up!</h2>

            <p>No notifications available.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {filteredNotifications.map((notification) => (
              <div
                className="notification-card"
                key={notification._id}
                onClick={() => markAsRead(notification._id)}
              >
                <div className="notification-left">
                  <div className={`notification-icon ${notification.type}`}>
                    {notification.type === "claim" && "🙋"}

                    {notification.type === "match" && "✨"}

                    {notification.type === "report" && "🚩"}

                    {notification.type === "system" && "🔔"}
                  </div>

                  <div className="notification-content">
                    <h3>{notification.title}</h3>

                    <p>{notification.message}</p>

                    {!notification.isRead && (
                      <span className="unread-badge">NEW</span>
                    )}
                  </div>
                </div>

                <div className="notification-right">
                  <span>
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>

                  <div className="arrow">→</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAGINATION */}

      <div className="pagination">
        <button>←</button>

        <button className="active-page">1</button>

        <button>2</button>

        <button>→</button>
      </div>
    </section>
  );
}

export default Notifications;
