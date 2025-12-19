// AdminUserTable.jsx
export default function AdminUserTable() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", role: "User", ratings: 45 },
    { id: 2, name: "Alice Smith", email: "alice@example.com", status: "Active", role: "Premium", ratings: 89 },
    // ... tambahkan data lainnya
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="text-left p-3">ID</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="p-3">
                <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                <button className="text-red-400 hover:text-red-300">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}