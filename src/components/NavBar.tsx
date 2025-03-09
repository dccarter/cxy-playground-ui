import ActionButton, { ActionId, ActionItem } from "./ActionButton";
import { Code, FlaskConical, Hammer, Play } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Snippets, { CodeSnippet } from "./Snippets";
import Logo from "@/assets/cxy.svg?react";

const actionItems: ActionItem[] = [
  {
    id: "build",
    value: "Build",
    icon: <Hammer />,
    iconColor: "text-green-500",
  },
  { id: "run", value: "Run", icon: <Play />, iconColor: "text-green-500" },
  {
    id: "genc",
    value: "Generate C",
    icon: <Code />,
    iconColor: "text-blue-100",
  },
  {
    id: "test",
    value: "Test",
    icon: <FlaskConical />,
    iconColor: "text-yellow-300",
  },
];

interface NavBarProps {
  onActionClicked?: (action: ActionId) => void;
  onSnippetChange?: (snippet: CodeSnippet) => void;
  playgroundBusy?: boolean;
  snippets?: CodeSnippet[];
}

const NavBar = ({
  onActionClicked,
  onSnippetChange,
  playgroundBusy,
  snippets,
}: NavBarProps) => {
  return (
    <div className="flex flex-row justify-between p-4 w-full shadow-md bg-background">
      <a href="/" className="flex items-center">
        <Logo className="w-12 h-12 fill-accent-foreground  hover:fill-gray-400" />
      </a>
      <Snippets
        snippets={snippets}
        onSnippetChange={onSnippetChange}
        disabled={playgroundBusy}
      />
      <div className="flex flex-grow justify-end space-x-6 text-xl items-center">
        <div className="mr-12">
          <ActionButton
            items={actionItems}
            onActionClicked={onActionClicked}
            disabled={playgroundBusy}
          />
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavBar;
