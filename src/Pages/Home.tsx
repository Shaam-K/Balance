import { Button } from "@/components/ui/button"
const Home = () => {
  return (
    <section className="xl:w-6/12 xl:mx-auto mx-5">
      <div className="h-[60vh] grid place-content-center">
        <span className="md:text-6xl text-5xl tracking-wide mb-10">Introducing <span className="tracker-tighter">Balance</span></span>
        <h1 className="md:text-6xl text-4xl tracking-wide">Now report issues without compromising <span className="border-b-4 dark:border-zinc-300 border-zinc-800 italic">privacy</span></h1>
      </div>
        <Button onClick={() => {
          window.location.href = "/enter"
        }} className="text-3xl h-16 tracking-tighter dark:border-zinc-300 border-zinc-700" variant="outline">Get Started</Button>
    </section>
  )
}

export default Home