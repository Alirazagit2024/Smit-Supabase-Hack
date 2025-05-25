import { useRef, useState } from "react";
import supabase from "../lib/supabase";

const EventFormInput = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date_time: "",
    location: "",
    category: "",
    status: "pending", // Default status
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;

    try {
      // Get the current user from Supabase Auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to create an event.");
        return;
      }

      // Image upload to storage
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("event-images")
          .upload(filePath, image);

        if (uploadError) {
          console.error("Storage Upload Error:", uploadError);
          alert("Image upload failed: " + uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("event-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
        console.log("Public URL:", imageUrl);
      }

      // Insert data into events table
      const { error: insertError } = await supabase.from("events").insert([
        {
          title: formData.title,
          description: formData.description,
          date_time: formData.date_time,
          location: formData.location,
          category: formData.category,
          image_url: imageUrl,
          status: formData.status,
          created_by: user.id, // Associate with logged-in user
        },
      ]);

      if (insertError) {
        console.error("Insert Error:", insertError);
        alert("Error saving event: " + insertError.message);
        return;
      }

      // Success case
      alert("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        date_time: "",
        location: "",
        category: "",
        status: "pending",
      });
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert("Unexpected error: " + error.message);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 text-black bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>

      <div className="flex flex-col items-center mb-6">
        <div
          onClick={handleImageClick}
          className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 cursor-pointer hover:ring-2 hover:ring-blue-400"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full"
            />
          ) : (
            <span className="text-gray-500 text-sm">Click to Upload</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">Event Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter event title"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter event description"
            rows="4"
          />
        </div>

        <div>
          <label className="block font-medium">Date and Time</label>
          <input
            name="date_time"
            value={formData.date_time}
            onChange={handleInputChange}
            type="datetime-local"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter event location"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="e.g. Workshop, Conference"
          />
        </div>

        {/* <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div> */}

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventFormInput;