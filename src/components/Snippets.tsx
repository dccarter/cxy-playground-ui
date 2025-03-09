import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export interface CodeSnippet {
  id: string;
  label: string;
}

interface SnippetsProps {
  snippets?: CodeSnippet[];
  disabled?: boolean;
  onSnippetChange?: (snippet: CodeSnippet) => void;
}

const Snippets = ({ snippets, disabled, onSnippetChange }: SnippetsProps) => {
  const [position, setPosition] = React.useState("hello");
  const onPositionChange = (value: string) => {
    setPosition(value);
    const snippet = snippets?.find((snippet) => snippet.id === value);
    if (snippet && onSnippetChange) onSnippetChange(snippet);
  };

  const activeSnippet = snippets?.find((snippet) => snippet.id === position);

  return (
    <div className="flex items-center space-x-2 mt-2 ml-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled || !snippets}>
          <Button variant="link">{activeSnippet?.label}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Examples</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={onPositionChange}
          >
            {snippets?.map(({ id, label }, index) => (
              <DropdownMenuRadioItem key={index} value={id}>
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Snippets;
