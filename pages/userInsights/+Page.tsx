export default function Page() {
  return (
    <div className="flex flex-col gap-11 p-5  w-fit">
      <MainElement title="Top Tracks" />
      <MainElement title="Top Artits" />
      <MainElement title="Followed Artists" buttons={false} />
    </div>
  )
}

function MainElement({ title, buttons = true }: { title: string; buttons?: boolean }) {
  return (
    <div className=" flex felx-row p-5 gap-5">
      <div className=" font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5"> {title} </div>
      <div>{buttons && <Buttons />}</div>
    </div>
  )
}

function Buttons() {
  const buttons = [{ label: "Last 30 Days" }, { label: "Last 6 Months" }, { label: "Last Year" }]

  return (
    <div className="flex flex-row gap-5 w-fit h-fit p-4">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="
          bg-accent
           rounded-3xl w-fit h-fit
           text-background p-3 align-middle
           active:bg-secondary active:border-accent active:border-2 hover: "
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
