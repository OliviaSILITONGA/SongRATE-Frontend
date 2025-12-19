export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>
      <p>Logged in as: <b>{user.email}</b></p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
