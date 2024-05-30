"use client";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EventDetails = ({ params }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [error, setError] = useState(null);
  const id = params.id;
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const fetchEventDetails = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/event/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching event details: ${response.statusText}`);
      }
      const data = await response.json();
      setEventDetails(data);
      if (user && user.id) {
        setIsBooked(data.bookedUsers.includes(user.id));
        console.log(user.id);
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      setError("Event not found. Please check the event ID.");
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id, isLoaded]);

  const handleSignUpEventButton = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:8080/api/event/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: id }),
      });
      const data = await response.json();
      console.log("Event booked successfully:", data);

      setEventDetails((prevEventDetails) => ({
        ...prevEventDetails,
        bookedUsers: [...prevEventDetails.bookedUsers, user.id],
      }));

      setIsBooked(true);
      toast.success("Event booked!");
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  const handleCancelEventButton = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:8080/api/event/removeBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: id }),
      });
      const data = await response.json();
      console.log("Event cancelled successfully:", data);

      setEventDetails((prevEventDetails) => ({
        ...prevEventDetails,
        bookedUsers: prevEventDetails.bookedUsers.filter((userId) => userId !== user.id),
      }));

      setIsBooked(false);
      toast.success("Event cancelled!");
    } catch (error) {
      console.error("Error canceling event:", error);
    }
  };

  const numberOfBookedUsers = eventDetails?.bookedUsers?.length || 0;

  return (
    <div className="mt-8">
      <Toaster />
      {error ? (
        <div>
          <Button asChild variant="outline" size="icon" className="rounded my-2">
            <Link href="/events">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-red-500 mt-4">{error}</p>
        </div>   
      ) : eventDetails ? (
        <div className="flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/12">
            <Button asChild variant="outline" size="icon" className="rounded my-2">
              <Link href="/events">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {/* Event details */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="p-4 lg:p-0">
              <h2 className="text-xl font-semibold">{eventDetails.title}</h2>
              <div>
                <p className="text-muted-foreground">{eventDetails.category}</p>
              </div>
              <div className="mt-8">
                <p>{eventDetails.description}</p>
              </div>
              <div className="flex gap-2 mt-8">
                <MapPin />
                <p>{eventDetails.location}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <Calendar />
                <p>{eventDetails.date.replace("T", " ")}</p>
              </div>
            </div>
            {/* Action button */}
            <div className="flex mt-8 gap-8 items-center">
              <div className="">
                <p className="font-semibold">Seats:</p>
                <p>{numberOfBookedUsers} / {eventDetails.numberOfSeats}</p>
              </div>
              {isBooked ? (
                <Button className="flex-1" onClick={handleCancelEventButton}>
                  Cancel Booking
                </Button>
              ) : numberOfBookedUsers >= eventDetails.numberOfSeats ? (
                <Button className="flex-1 opacity-50 cursor-not-allowed" disabled>
                  Fully Booked
                </Button>
              ) : (
                <Button className="flex-1" onClick={handleSignUpEventButton}>
                  Book Event
                </Button>
              )}
            </div>
          </div>
          {/* Event image */}
          <div className="sm:w-10/12 sm:justify-center sm:m-auto sm:mt-8 lg:flex lg:w-1/2">
            <Image
              src={eventDetails.imageUrl}
              alt={eventDetails.title}
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg ml-8"
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EventDetails;
