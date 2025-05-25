import EventCard from "../../components/MyEvents";

const EventPage = () => {
  const sampleEvent = {
    name: "AI & Tech Hackathon",
    image: "https://source.unsplash.com/600x400/?technology,event",
    participants: ["Ali Raza", "Fatima Khan", "Usman Ali", "Ayesha Noor"],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <EventCard
        name={sampleEvent.name}
        image={sampleEvent.image}
        participants={sampleEvent.participants}
      />
    </div>
  );
};

export default EventPage;
