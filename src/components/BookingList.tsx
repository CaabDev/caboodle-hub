
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Car, Calendar, Clock, MapPin, Search, User, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AnimatedCard from "./AnimatedCard";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Sample booking data
interface Booking {
  id: string;
  employeeId: string;
  employeeName: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: Date;
  pickupTime: string;
  status: "pending" | "approved" | "rejected" | "completed";
}

const generateSampleBookings = (): Booking[] => {
  const statuses: Array<"pending" | "approved" | "rejected" | "completed"> = 
    ["pending", "approved", "rejected", "completed"];
  
  const employees = [
    { id: "emp-1", name: "Alex Johnson" },
    { id: "emp-2", name: "Sarah Williams" },
    { id: "emp-3", name: "David Chen" },
    { id: "emp-4", name: "Maria Rodriguez" },
    { id: "emp-5", name: "James Wilson" },
  ];
  
  return Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (i % 7 - 3)); // Some dates in past, some in future
    const employee = employees[i % employees.length];
    
    return {
      id: `booking-${i + 1}`,
      employeeId: employee.id,
      employeeName: employee.name,
      pickupLocation: "Main Office",
      dropLocation: `Home Address ${i + 1}`,
      pickupDate: date,
      pickupTime: `${17 + (i % 4)}:${i % 2 === 0 ? "00" : "30"}`,
      status: statuses[i % 4],
    };
  });
};

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    setBookings(generateSampleBookings());
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        booking =>
          booking.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.dropLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const handleStatusChange = (bookingId: string, newStatus: "approved" | "rejected") => {
    // In a real app, you would send this update to your backend
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    );
    
    setBookings(updatedBookings);
    
    toast.success(`Booking ${newStatus}`, {
      description: `You have ${newStatus} the booking request.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-600";
      case "pending":
        return "bg-amber-500/10 text-amber-600";
      case "rejected":
        return "bg-red-500/10 text-red-600";
      case "completed":
        return "bg-blue-500/10 text-blue-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search employee or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select 
          value={statusFilter} 
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-10">
          <Car className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No bookings found</h3>
          <p className="mt-1 text-muted-foreground">
            There are no bookings matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => (
            <AnimatedCard 
              key={booking.id} 
              delay={index * 100}
              className="flex flex-col space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-medium">{booking.employeeName}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {booking.dropLocation}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className={`text-xs px-2 py-1 rounded-full uppercase font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  
                  <div className="flex items-center mt-2 text-xs text-muted-foreground space-x-2">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(booking.pickupDate, "PP")}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {booking.pickupTime}
                    </span>
                  </div>
                </div>
              </div>
              
              {booking.status === "pending" && (
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleStatusChange(booking.id, "rejected")}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="text-green-500 hover:text-green-700 hover:bg-green-50"
                    onClick={() => handleStatusChange(booking.id, "approved")}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </div>
              )}
            </AnimatedCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
