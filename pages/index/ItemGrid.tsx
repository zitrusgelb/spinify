import { Item } from "./types"

export default function ItemGrid({ items }: { items: Item[] }) {
  return (
    <div className="flex max-w-full overflow-x-scroll scrollbar-styled">
      {items.map((item) => (
        <a href={`/artist/${item.id}`} key={item.id}>
          <ItemElement thumbnail={item.thumbnail} title={item.name} />
        </a>
      ))}
    </div>
  )
}

function ItemElement({ thumbnail, title }: { thumbnail: string; title: string }) {
  return (
    <div className="flex content-center flex-col gap-5 p-5">
      <div className="text-xl font-bold text-center w-64 pl-4 pr-4 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title}
      </div>
      <img src={thumbnail ?? ""} alt={title} className="max-w-64 max-h-64 min-h-32 min-w-32 rounded-lg object-cover" />
    </div>
  )
}
