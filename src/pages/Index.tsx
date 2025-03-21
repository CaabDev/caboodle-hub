
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Building, Clock, UserCheck, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/App";
import Navbar from "@/components/Navbar";
import AnimatedCard from "@/components/AnimatedCard";
import CabAnimation from "@/components/CabAnimation";

const Index = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          {/* Background decorations */}
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 animate-pulse-light" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-blue-400/20 animate-pulse-light" style={{ animationDelay: "1s" }} />
          </div>
          
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in">
                <span className="gradient-text">Office Cab Allocation</span>
                <br />Made Simple
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Effortlessly book and manage transportation from office to home with our elegant and intuitive platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                {user ? (
                  <Button 
                    size="lg" 
                    className="button-effect"
                    onClick={() => handleNavigate(user.role === "admin" ? "/admin" : "/employee")}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      className="button-effect"
                      onClick={() => handleNavigate("/login")}
                    >
                      Login
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <CabAnimation />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-background to-accent/20">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
              Streamlined Cab Management
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedCard delay={100} className="md:h-full">
                <div className="flex flex-col h-full items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
                  <p className="text-muted-foreground flex-1">
                    Book your cab with just a few clicks. Specify your location, date, and time for a seamless experience.
                  </p>
                </div>
              </AnimatedCard>
              
              <AnimatedCard delay={200} className="md:h-full">
                <div className="flex flex-col h-full items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
                  <p className="text-muted-foreground flex-1">
                    Track the status of your booking in real-time. Know exactly when your cab will arrive.
                  </p>
                </div>
              </AnimatedCard>
              
              <AnimatedCard delay={300} className="md:h-full lg:col-span-1 md:col-span-2 lg:col-start-3">
                <div className="flex flex-col h-full items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Efficient Administration</h3>
                  <p className="text-muted-foreground flex-1">
                    Administrators can easily manage cab allocations, approve requests, and optimize transportation resources.
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>
        
        {/* User Types Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Choose Your <span className="gradient-text">Dashboard</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimatedCard delay={100} className="md:h-full">
                <div className="flex flex-col h-full items-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <UserCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Employee</h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    Book cabs, view your booking history, and manage your transportation needs with ease.
                  </p>
                  <Button 
                    onClick={() => navigate("/login")}
                    className="button-effect"
                  >
                    Employee Login
                  </Button>
                </div>
              </AnimatedCard>
              
              <AnimatedCard delay={200} className="md:h-full">
                <div className="flex flex-col h-full items-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <UserCog className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Administrator</h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    Manage all bookings, approve requests, assign vehicles, and oversee the entire transportation system.
                  </p>
                  <Button 
                    onClick={() => navigate("/login")}
                    className="button-effect"
                  >
                    Admin Login
                  </Button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Car className="text-primary h-5 w-5" />
              <span className="gradient-text font-semibold">CabConnect</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CabConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
