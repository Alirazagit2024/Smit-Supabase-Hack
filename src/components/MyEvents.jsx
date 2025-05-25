import React, { useState, useEffect } from "react";
import supabase from "../lib/supabase"; // Adjust path to your Supabase client

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's events from Supabase on component mount
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          console.error("Authentication error:", authError);
          setError("You must be logged in to view your events.");
          setLoading(false);
          return;
        }

        console.log("Authenticated user:", user); // Debug: Log user details

        // Fetch events where created_by matches the user's ID
        const { data, error } = await supabase
          .from("events")
          .select("id, title, description, date_time, location, category, image_url, status")
          .eq("created_by", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching events:", error);
          setError(`Failed to load your events: ${error.message}`);
          return;
        }

        console.log("Fetched events:", data); // Debug: Log fetched data
        setEvents(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError(`Unexpected error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="flex">
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Events</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Loading your events...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Event Title</th>
                  <th className="px-6 py-3">Date & Time</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Image</th>
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
                    <td className="px-6 py-4">
                      {new Date(event.date_time).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{event.location}</td>
                    <td className="px-6 py-4">{event.category || "N/A"}</td>
                    <td className="px-6 py-4 capitalize">{event.status}</td>
                    <td className="px-6 py-4">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                  </tr>
                ))}

                {events.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      You have not created any events yet.
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