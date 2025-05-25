// src/pages/admin/Participants.jsx


const participants = [
  {
    id: 1,
    name: "Ali Raza",
    email: "ali@example.com",
    rollNo: "SMIT123",
    event: "Hackathon 2025",
    status: "approved",
  },
  {
    id: 2,
    name: "Sana Ahmed",
    email: "sana@example.com",
    rollNo: "SMIT124",
    event: "Frontend Workshop",
    status: "pending",
  },
];

export default function Participants() {
  return (
    <div className="flex">

      <div className=" p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Participants
        </h1>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">S.No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Roll No</th>
                <th className="px-6 py-3">Event</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, index) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{p.name}</td>
                  <td className="px-6 py-4">{p.email}</td>
                  <td className="px-6 py-4">{p.rollNo}</td>
                  <td className="px-6 py-4">{p.event}</td>
                  <td className="px-6 py-4 capitalize">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
