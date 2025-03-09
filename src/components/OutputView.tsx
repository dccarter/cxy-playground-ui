import { ScrollArea } from "@radix-ui/react-scroll-area";
import Terminal from "./Terminal";

interface OutputViewProps {
  output: string;
}

const OutputView = ({ output }: OutputViewProps) => {
  return (
    <div className="h-full bg-background font-mono">
      <div className="sticky text-xl font-bold p-2 mb-1">Output</div>
      <ScrollArea className="h-full w-full overflow-scroll">
        <Terminal text={output} />
      </ScrollArea>
    </div>
  );
};

export default OutputView;
