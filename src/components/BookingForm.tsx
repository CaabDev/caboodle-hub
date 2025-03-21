
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Form schema for booking validation
const formSchema = z.object({
  pickupLocation: z.string().min(5, { message: "Pickup location is required" }),
  dropLocation: z.string().min(5, { message: "Drop location is required" }),
  pickupDate: z.date({ required_error: "Pickup date is required" }),
  pickupTime: z.string().min(1, { message: "Pickup time is required" }),
});

type BookingFormValues = z.infer<typeof formSchema>;

interface BookingFormProps {
  onBookingSuccess?: () => void;
}

const BookingForm = ({ onBookingSuccess }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropLocation: "",
      pickupTime: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    // In a real app, you would send this data to your backend
    console.log("Booking data:", data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Cab booked successfully!", {
        description: `Your cab has been booked for ${format(data.pickupDate, "PPP")} at ${data.pickupTime}.`,
      });
      
      form.reset();
      if (onBookingSuccess) {
        onBookingSuccess();
      }
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Pickup Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="Office location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dropLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Drop Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your home address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    Pickup Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Pickup Time
                  </FormLabel>
                  <FormControl>
                    <Input type="time" placeholder="Select time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full button-effect" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Book Cab"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
