"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [coordinatorId, setCoordinatorId] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Add Event
  const addEvent = (e) => {
    e.preventDefault();
    if (!title || !description || !coordinator || !coordinatorId || !mobile || !date || !image) return;
    setEvents([...events, { id: Date.now(), title, description, coordinator, coordinatorId, mobile, date, image }]);
    resetForm();
  };

  // Start Editing
  const startEdit = (event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setCoordinator(event.coordinator);
    setCoordinatorId(event.coordinatorId);
    setMobile(event.mobile);
    setDate(event.date);
    setImage(event.image);
  };

  // Save Edited Event
  const saveEdit = (e) => {
    e.preventDefault();
    setEvents(events.map((event) => 
      event.id === editingId ? { id: editingId, title, description, coordinator, coordinatorId, mobile, date, image } : event
    ));
    setEditingId(null);
    resetForm();
  };

  // Delete Event
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Reset Form Fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCoordinator("");
    setCoordinatorId("");
    setMobile("");
    setDate("");
    setImage(null);
  };

  return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-900">
      <div className="w-full max-w-7xl bg-gray-800 shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Event Dashboard</h1>

        {/* Form to Add or Edit Event */}
        <form onSubmit={editingId ? saveEdit : addEvent} className="bg-gray-700 shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">{editingId ? "Edit Event" : "Create an Event"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="text" placeholder="Event Name" value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border rounded-md bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 w-full" />
            <input type="text" placeholder="Event Description" value={description} 
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border rounded-md bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 w-full" />
            <input type="text" placeholder="Coordinator Name" value={coordinator} 
              onChange={(e) => setCoordinator(e.target.value)}
              className="p-3 border rounded-md bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 w-full" />
            <input type="text" placeholder="Coordinator ID" value={coordinatorId} 
              onChange={(e) => setCoordinatorId(e.target.value)}
              className="p-3 border rounded-md bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 w-full" />
            <input type="tel" placeholder="Mobile Number" value={mobile} 
              onChange={(e) => setMobile(e.target.value)}
              className="p-3 border rounded-md bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 w-full" />
            <input type="date" value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="p-3 border rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 w-full" />
            <input type="file" accept="image/*" onChange={handleImageUpload}
              className="p-3 border rounded-md bg-gray-900 text-white file:bg-blue-600 file:text-white file:py-2 file:px-4 file:border-none file:rounded-md w-full cursor-pointer" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md mt-4 hover:bg-blue-700 transition">
            {editingId ? "Save Changes" : "Add Event"}
          </button>
        </form>

        {/* Event List */}
        <h2 className="text-2xl font-semibold text-white mb-4">📅 Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.length === 0 && <p className="text-gray-400 text-center w-full">No events added yet.</p>}
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 shadow-lg rounded-lg p-6 border-l-4 border-blue-500 transition-transform transform hover:scale-105"
            >
              <img src={event.image} alt="Event" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-3xl font-bold text-white">{event.title}</h3>
              <p className="text-gray-400 mt-3">{event.description}</p>
              <p className="text-gray-400 mt-3 flex items-center">
                <strong className="text-blue-400">📅 Date:</strong> <span className="ml-2 text-white">{event.date}</span>
              </p>
              <p className="text-gray-400 mt-3">
                <strong className="text-yellow-400">👤 Coordinator:</strong> <span className="text-white">{event.coordinator}</span> (ID: {event.coordinatorId})
              </p>
              <p className="text-gray-400"><strong>📞 Mobile:</strong> <span className="text-white">{event.mobile}</span></p>
              <div className="flex gap-2 mt-6">
                <button onClick={() => startEdit(event)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">Edit</button>
                <button onClick={() => deleteEvent(event.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}