
import { useState, useContext } from "react";
import { UserContext } from "@/App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, CarFront, CalendarClock, User as UserIcon, UsersRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import BookingList from "@/components/BookingList";
import AnimatedCard from "@/components/AnimatedCard";

// Sample dashboard stats
const stats = [
  { 
    id: "total-bookings", 
    label: "Total Bookings", 
    value: "267", 
    icon: CarFront, 
    change: "+12% from last month" 
  },
  { 
    id: "active-employees", 
    label: "Active Employees", 
    value: "42", 
    icon: UsersRound, 
    change: "+3 new this month" 
  },
  { 
    id: "pending-requests", 
    label: "Pending Requests", 
    value: "8", 
    icon: CalendarClock, 
    change: "Requires attention" 
  },
];

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <AnimatedCard className="md:col-span-1">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UserIcon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-muted-foreground">Administrator</p>
                
                <div className="w-full border-t border-border/50 my-6" />
                
                <div className="text-left w-full">
                  <h3 className="text-sm font-medium mb-2">Dashboard</h3>
                  <button 
                    onClick={() => setActiveTab("overview")}
                    className={`flex items-center space-x-2 text-sm transition-colors py-2 w-full text-left ${activeTab === "overview" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
                  >
                    <Compass className="h-4 w-4" />
                    <span>Overview</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab("bookings")}
                    className={`flex items-center space-x-2 text-sm transition-colors py-2 w-full text-left ${activeTab === "bookings" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
                  >
                    <CarFront className="h-4 w-4" />
                    <span>Manage Bookings</span>
                  </button>
                </div>
              </div>
            </AnimatedCard>
            
            {/* Main Content Area */}
            <div className="md:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="overview" className="mt-0">
                  <AnimatedCard>
                    <CardHeader>
                      <CardTitle>Dashboard Overview</CardTitle>
                      <CardDescription>
                        Monitor and manage all cab booking activities.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {stats.map((stat, index) => (
                          <AnimatedCard 
                            key={stat.id} 
                            delay={index * 100}
                            className="p-4"
                          >
                            <div className="flex flex-row sm:flex-col md:flex-row items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <stat.icon className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-sm font-medium">{stat.label}</span>
                              </div>
                              <div className="text-right sm:text-left md:text-right mt-0 sm:mt-2 md:mt-0">
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs text-muted-foreground">{stat.change}</div>
                              </div>
                            </div>
                          </AnimatedCard>
                        ))}
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Recent Bookings</h3>
                        <BookingList />
                      </div>
                    </CardContent>
                  </AnimatedCard>
                </TabsContent>
                
                <TabsContent value="bookings" className="mt-0">
                  <AnimatedCard>
                    <CardHeader>
                      <CardTitle>Manage Bookings</CardTitle>
                      <CardDescription>
                        Review, approve or reject cab booking requests.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BookingList />
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

export default AdminDashboard;
