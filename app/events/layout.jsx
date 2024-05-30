import Header from "./_components/header"

function EventsLayout({ children }) {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        { children }
      </main>
    </>
  )
}
export default EventsLayout