import React,{useState} from "react";
import cn from "classnames";

type TimeRange = "Last 30 Days" | "Last 6 Months" | "Last Year";

interface MainElementProps {
  title: string;
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  buttons?: boolean;
}

export default function Page() {

  const [selectedRanges, setSelectedRanges] = useState<Record<string, TimeRange>>({
    "Top Tracks": "Last 30 Days",
    "Top Artists": "Last 30 Days",
    "Followed Artists": "Last 30 Days",
  });

  const handleRangeChange = (title: string, range: TimeRange) => {
    setSelectedRanges((prev: any) => ({
      ...prev,
      [title]: range,
    }));
  };

  return (
    <div className="flex flex-col gap-11 p-5  w-fit">
      {Object.keys(selectedRanges).map((section) => (
        <MainElement
          key={section}
          title={section}
          selectedRange={selectedRanges[section]}
          onRangeChange={(range) => handleRangeChange(section, range)}
          buttons={section !== "Followed Artists"}
        />
      ))}
    </div>
  )
}

function MainElement({ title,selectedRange, onRangeChange, buttons = true }: MainElementProps) {
  return (
    <div className=" flex felx-row p-5 gap-5">
      <div className=" font-bold text-3xl text-secondary bg-primary rounded-3xl w-fit h-fit p-5">
        {title}
      </div>
      <div>
        {buttons && (
          <Buttons
            selected={selectedRange}
            onSelect={onRangeChange}
          />
        )}
      </div>
    </div>
  )
}

interface ButtonsProps {
  selected: TimeRange;
  onSelect: (range: TimeRange) => void;
}

function Buttons({ selected, onSelect }: ButtonsProps) {
  const buttons: TimeRange[] = ["Last 30 Days", "Last 6 Months", "Last Year"];

  return (
    <div className="flex flex-row gap-5 w-fit h-fit p-4">
      {buttons.map((label) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          className={cn(
            "rounded-3xl w-fit h-fit text-background p-3 transition duration-200 transform border-2",
            {
              "bg-secondary border-accent": label === selected,
              "bg-accent border-transparent": label !== selected,
            },
            "hover:scale-105 hover:shadow-lg",
            "active:scale-95 active:shadow-md active:bg-accent/80"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
