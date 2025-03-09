import Convert from "ansi-to-html";

const ansiToHtml = new Convert({ newline: true });

interface TerminalProps {
  text: string;
}

const Terminal = ({ text }: TerminalProps) => {
  const lines = text?.split("\n").map((line) => {
    let idx = 0,
      numSpaces = 0,
      numTabs = 0;
    while (" \t".indexOf(line[idx]) > -1) {
      if (line[idx] === " ") {
        numSpaces++;
      }
      if (line[idx] === "\t") {
        numTabs++;
      }
      idx++;
    }
    return (
      "&#xa0;".repeat(numSpaces) +
      "&#x9;".repeat(numTabs) +
      line
        .trimStart()
        .replace("â\x9C\x92", "&#x2718;")
        .replace("â\x9C\x93", "&#x2714;")
    );
  });

  return (
    <div className="font-mono w-full h-full">
      <div className="pl-2 pr-2">
        {lines && (
          <div
            dangerouslySetInnerHTML={{
              __html: ansiToHtml.toHtml(lines.join("\n")),
            }}
          />
        )}
        {lines && <div className="h-16 w-full" />}
      </div>
    </div>
  );
};

export default Terminal;
