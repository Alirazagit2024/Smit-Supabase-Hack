
import React, { useState, useEffect } from "react";


export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from Supabase on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching events:", error);
          setError("Failed to load events: " + error.message);
          return;
        }

        setEvents(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Unexpected error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle approving an event
  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from("events")
        .update({ status: "approved" })
        .eq("id", id);

      if (error) {
        console.error("Error approving event:", error);
        alert("Failed to approve event: " + error.message);
        return;
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, status: "approved" } : event
        )
      );
      alert("Event approved successfully!");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error: " + err.message);
    }
  };

  // Handle rejecting an event
  const handleReject = async (id) => {
    try {
      const { error } = await supabase
        .from("events")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) {
        console.error("Error rejecting event:", error);
        alert("Failed to reject event: " + error.message);
        return;
      }

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, status: "rejected" } : event
        )
      );
      alert("Event rejected successfully!");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error: " + err.message);
    }
  };

  return (
    <div className="flex">
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Events</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Loading events...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Event Title</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{event.title}</td>
                    <td className="px-6 py-4 capitalize">{event.status}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleApprove(event.id)}
                        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
                        disabled={event.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(event.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                        disabled={event.status === "rejected"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}

                {events.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}