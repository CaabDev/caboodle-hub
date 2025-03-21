
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Car, Calendar, Clock, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedCard from "./AnimatedCard";

// Sample booking data
interface Booking {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: Date;
  pickupTime: string;
  status: "completed" | "upcoming" | "cancelled";
}

const generateSampleBookings = (): Booking[] => {
  const statuses: Array<"completed" | "upcoming" | "cancelled"> = ["completed", "upcoming", "cancelled"];
  
  return Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (i % 5 - 2)); // Some dates in past, some in future
    
    return {
      id: `booking-${i + 1}`,
      pickupLocation: "Main Office",
      dropLocation: `Home Address ${i + 1}`,
      pickupDate: date,
      pickupTime: `${17 + (i % 4)}:${i % 2 === 0 ? "00" : "30"}`,
      status: statuses[i % 3],
    };
  });
};

const BookingHistory = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    setBookings(generateSampleBookings());
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter((booking) =>
      booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600";
      case "upcoming":
        return "bg-blue-500/10 text-blue-600";
      case "cancelled":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search bookings..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-10">
          <Car className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No bookings found</h3>
          <p className="mt-1 text-muted-foreground">
            You don't have any bookings matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => (
            <AnimatedCard 
              key={booking.id} 
              delay={index * 100}
              className="flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">
                    {booking.pickupLocation} to {booking.dropLocation}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(booking.pickupDate, "PPP")}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {booking.pickupTime}
                  </div>
                </div>
              </div>
              
              <div className="mt-2 sm:mt-0 flex items-center justify-between sm:justify-end sm:space-x-4">
                <span className={`text-xs px-2 py-1 rounded-full uppercase font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
