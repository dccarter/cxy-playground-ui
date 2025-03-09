import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { use, useEffect, useRef, useState } from "react";
import Editor from "@/components/Editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import OutputView from "./components/OutputView";
import { ActionId } from "./types";
import { cxyCompiler } from "./api/cxy";
import { defaultCode } from "./constants";
import { ThemeProvider } from "./components/ThemeProvider";
import { CodeSnippet } from "./components/Snippets";
import { snippetsApi } from "./api/snippets";
import React from "react";

function App() {
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [generatedCode, setGeneratedCode] = useState();
  const [snippets, setSnippets] = useState<CodeSnippet[]>();

  React.useEffect(() => {
    snippetsApi
      .getSnippets()
      .then((data) => {
        setSnippets(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onActionClicked = (action: ActionId) => {
    setBusy(true);
    cxyCompiler
      .executeAction(action, code, "")
      .then((data: any) => {
        if (action == "genc") {
          if (data.ok) {
            setGeneratedCode(data.data);
            setOutput("");
          } else {
            setOutput(data.data);
            setGeneratedCode(undefined);
          }
        } else {
          setOutput(data);
          setGeneratedCode(undefined);
        }
      })
      .finally(() => {
        setBusy(false);
      });
  };

  const onSnippetChange = (snippet: CodeSnippet) => {
    snippetsApi
      .getSnippet(snippet.id)
      .then((data) => {
        setCode(data);
        if (generatedCode) setGeneratedCode("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="flex flex-col h-screen">
        <NavBar
          playgroundBusy={busy}
          snippets={snippets}
          onActionClicked={onActionClicked}
          onSnippetChange={onSnippetChange}
        />
        <div className="flex-grow h-full mt-2">
          <ResizablePanelGroup
            direction="vertical"
            className="h-[calc(100vh-18px)]"
          >
            <ResizablePanel>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                  <Editor code={code} setCode={setCode} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel hidden={generatedCode === undefined}>
                  {generatedCode && (
                    <Editor code={generatedCode} language="c" />
                  )}
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              hidden={generatedCode !== undefined}
              minSize={40}
              maxSize={60}
            >
              <OutputView output={output} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        {/* <div className="fixed bottom-4 right-4">
        <Button
          variant={"outline"}
          className="text-neutral-500 font-bold py-2 px-4 rounded-none"
        >
          Report Bug
        </Button>
      </div> */}
      </main>
    </ThemeProvider>
  );
}

export default App;
