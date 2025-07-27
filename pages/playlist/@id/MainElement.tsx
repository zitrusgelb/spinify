export default function MainElement({ title }: { title: string }) {
  return (
    <div className="flex flex-row p-5 gap-5">
      <div className="font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5">{title}</div>
    </div>
  )
}
