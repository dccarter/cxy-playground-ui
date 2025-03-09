import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuArrow, Separator } from "@radix-ui/react-dropdown-menu";

export type ActionId = "build" | "run" | "genc" | "test";

export interface ActionItem {
  id: ActionId;
  value: string;
  icon?: React.ReactNode;
  iconColor?: string;
}

interface ActionButtonProps {
  items?: ActionItem[];
  disabled?: boolean;
  onActionClicked?: (action: ActionId) => void;
}

interface ActionComponentProps {
  item: ActionItem;
  loading?: boolean;
}

const ActionComponent = ({ item, loading }: ActionComponentProps) => {
  const { value, icon, iconColor } = item;
  return (
    <>
      {loading ? (
        <Loader2 className="mr-2 animate-spin" size={24} />
      ) : (
        icon && <span className={`mr-2 ${iconColor}`}>{icon}</span>
      )}
      {value}
    </>
  );
};

const ActionButton = ({
  items,
  disabled,
  onActionClicked,
}: ActionButtonProps) => {
  const [selected, setSelected] = React.useState(0);
  const [position, setPosition] = React.useState(items?.[0].id);

  const handleActionChange = (value: string) => {
    const index = items!.findIndex((item) => item.id === value);
    setSelected(index);
    setPosition(items?.[index].id);
  };

  const handleActionClicked = () => {
    if (items && onActionClicked) {
      onActionClicked(items[selected].id);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        className={cn("py-2 h-full w-full rounded-r-none", {
          "cursor-not-allowed": disabled,
        })}
        onClick={handleActionClicked}
      >
        {items && <ActionComponent item={items[selected]} loading={disabled} />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <Button className="rounded-l-none">
            <ChevronRight className="transform transition-transform duration-300 hover:rotate-90" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>Select action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={handleActionChange}
          >
            {items?.map((item, index) => (
              <DropdownMenuRadioItem key={index} value={item.id}>
                <ActionComponent item={item} />
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionButton;
