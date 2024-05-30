import EventCard from "./event-card"

async function getData() {
    const res = await fetch('http://localhost:8080/api/event', { cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function EventList() {

  const event = await getData()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {
        event.map(event => (
          <EventCard
          key={event.id}
          {...event}
        />
        ))
      }
    </div>
  )
}