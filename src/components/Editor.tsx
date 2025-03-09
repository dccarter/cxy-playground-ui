import { initializeCxyLang } from "../lib/lang";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

interface CodeEditorProps {
  code: string;
  setCode?: (code: string) => void;
  language?: string;
}

const CodeEditor = ({ code, setCode, language }: CodeEditorProps) => {
  const monaco = useMonaco();
  const { theme } = useTheme();
  useEffect(() => {
    if (monaco) {
      initializeCxyLang(monaco);
    }
  }, [monaco]);

  let monacoTheme = theme === "dark" ? "vs-dark" : "vs";
  if (theme === "system")
    monacoTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "vs-dark"
      : "vs";

  return (
    <Editor
      language={language ?? "cxyLang"}
      value={code}
      theme={monacoTheme}
      options={{ readOnly: setCode === undefined, mouseWheelZoom: true }}
      onChange={(value) => {
        if (setCode) setCode(value ?? "");
      }}
    />
  );
};

export default CodeEditor;
