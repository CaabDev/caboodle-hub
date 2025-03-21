
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { User, Lock, UserCheck, UserCog } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserContext } from "@/App";
import Navbar from "@/components/Navbar";
import AnimatedCard from "@/components/AnimatedCard";

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<"employee" | "admin">("employee");

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful login
      const mockUser = {
        id: "user-1",
        name: activeRole === "admin" ? "Admin User" : "Employee User",
        email: data.email,
        role: activeRole,
      };
      
      setUser(mockUser);
      
      toast.success("Login successful", {
        description: `Welcome back, ${mockUser.name}!`,
      });
      
      // Navigate to the appropriate dashboard
      navigate(activeRole === "admin" ? "/admin" : "/employee");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-md mx-auto">
            <AnimatedCard className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 gradient-text">Welcome Back</h1>
                <p className="text-muted-foreground">
                  Sign in to your account to continue
                </p>
              </div>
              
              <Tabs 
                defaultValue="employee" 
                className="w-full"
                onValueChange={(value) => setActiveRole(value as "employee" | "admin")}
              >
                <TabsList className="grid grid-cols-2 w-full mb-8">
                  <TabsTrigger value="employee" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Employee
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <UserCog className="h-4 w-4 mr-2" />
                    Administrator
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="employee" className="mt-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-primary" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Lock className="h-4 w-4 mr-2 text-primary" />
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full button-effect" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In as Employee"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="admin" className="mt-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-primary" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter admin email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Lock className="h-4 w-4 mr-2 text-primary" />
                              Password
                            </FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter admin password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full button-effect" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In as Admin"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </AnimatedCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
