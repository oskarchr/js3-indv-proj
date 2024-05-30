import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const EventCard = ({
  id,
  title,
  description,
  category,
  imageUrl,
  date,
  location,
  numberOfSeats,
  bookedUsers
}) => {
  return (
    <Link
    href={`/events/${id}`}
    className="flex flex-col overflow-hidden border rounded-md hover:bg-slate-50/5 transition-colors w-full"
    >
      <div className="h-48">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={192}
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="font-semibold text-lg text-white">{title}</h2>
          <p className="text-slate-400">{category}</p>
        </div>
        <div>
          <div className="flex gap-2 mt-4">
            <MapPin />
            <p>{location}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <Calendar />
            <p>{date.replace("T", " ")}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard