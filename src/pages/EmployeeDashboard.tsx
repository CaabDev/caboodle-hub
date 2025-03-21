
import { useState, useContext } from "react";
import { UserContext } from "@/App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, History, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import BookingHistory from "@/components/BookingHistory";
import AnimatedCard from "@/components/AnimatedCard";
import CabAnimation from "@/components/CabAnimation";

const EmployeeDashboard = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("book");
  
  const refreshHistory = () => {
    if (activeTab !== "history") {
      setActiveTab("history");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <AnimatedCard 
              className="md:col-span-1"
              variant="gradient"
            >
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 shadow-inner animate-pulse-soft">
                  <UserIcon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                
                <div className="w-full border-t border-border/50 my-6" />
                
                <div className="text-left w-full">
                  <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
                  <button 
                    onClick={() => setActiveTab("book")}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 w-full text-left button-effect"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Book a New Cab</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab("history")}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2 w-full text-left button-effect"
                  >
                    <History className="h-4 w-4" />
                    <span>View Booking History</span>
                  </button>
                </div>
                
                <div className="mt-8 w-full">
                  <CabAnimation speed="slow" size={36} />
                </div>
              </div>
            </AnimatedCard>
            
            {/* Main Content Area */}
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-8">
                  <TabsTrigger value="book" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Book a Cab
                  </TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <History className="h-4 w-4 mr-2" />
                    Booking History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="book" className="mt-0">
                  <AnimatedCard variant="subtle">
                    <CardHeader>
                      <CardTitle>Book a Cab</CardTitle>
                      <CardDescription>
                        Fill out the form below to book a cab from office to your home.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BookingForm onBookingSuccess={refreshHistory} />
                    </CardContent>
                  </AnimatedCard>
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <AnimatedCard variant="subtle">
                    <CardHeader>
                      <CardTitle>Your Booking History</CardTitle>
                      <CardDescription>
                        View all your past and upcoming cab bookings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BookingHistory />
                    </CardContent>
                  </AnimatedCard>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
