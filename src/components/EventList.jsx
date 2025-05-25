import { useState } from "react";

const EventList = () => {
  const [events, setEvents] = useState([
    { id: 1, name: "AI Workshop", status: "Pending" },
    { id: 2, name: "Tech Conference", status: "Pending" },
    { id: 3, name: "Hackathon", status: "Pending" },
  ]);

  const updateStatus = (id, newStatus) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, status: newStatus } : event
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="overflow-x-auto mt-10 text-black">
      <h2 className="text-2xl text-white font-semibold mb-4">Event Listings</h2>

      <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-3 px-4">S.No</th>
            <th className="py-3 px-4">Event Name</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.id} className="border-t hover:bg-gray-50">
              <td className="py-3 px-4">{index + 1}</td>
              <td className="py-3 px-4">{event.name}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : event.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {event.status}
                </span>
              </td>
              <td className="py-3 px-4 space-x-2">
                <button
                  onClick={() => updateStatus(event.id, "Approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(event.id, "Rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
