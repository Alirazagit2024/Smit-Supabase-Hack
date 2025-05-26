import React, { useState, useEffect } from "react";
import supabase from "../lib/supabase";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          setError("You must be logged in to view your events.");
          setLoading(false);
          return;
        }

        const role = user.user_metadata?.role || "user";
        setUserRole(role);

        let query = supabase.from("events").select("*");
        if (role !== "admin") query = query.eq("created_by", user.id);
        query = query.order("created_at", { ascending: false });

        const { data, error } = await query;
        if (error) {
          setError(`Failed to load events: ${error.message}`);
          return;
        }

        setEvents(data || []);
      } catch (err) {
        setError(`Unexpected error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("events")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, status: newStatus } : event
        )
      );
    }
  };

  return (
    <div className="flex justify-center px-4 py-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          My Events
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-black text-lg">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
              >
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                </div>

                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-gray-400 italic border-b">
                    No Image
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col gap-2 text-sm text-gray-700">
                  <div><strong>Date & Time:</strong> {new Date(event.date_time).toLocaleString()}</div>
                  <div><strong>Location:</strong> {event.location}</div>
                  <div><strong>Category:</strong> {event.category || "N/A"}</div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                        ${event.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : event.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {event.status || "Pending"}
                    </span>
                  </div>
                </div>

                {userRole === "admin" && (
                  <div className="p-4 border-t flex justify-center gap-4">
                    <button
                      onClick={() => updateStatus(event.id, "approved")}
                      className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(event.id, "rejected")}
                      className="px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
