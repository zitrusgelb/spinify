export default function Page() {
  return (
    <div className="flex flex-col gap-11 p-5  w-fit">
      <MainElement title="Top Tracks" />
      <MainElement title="Top Artits" />
      <MainElement title="Followed Artists" />
    </div>
  )
}

function MainElement({ title }: { title: string }) {
  return (
    <div className=" font-bold text-3xl text-secondary bg-primary rounded-3xl p-5 w-fit">
      <h2> {title}</h2>
    </div>
  )
}
