export function initializeCxyLang(monaco: typeof import("monaco-editor")) {
  // register our custom language
  monaco.languages.register({ id: "cxyLang" });
  let keywords = [
    "@cCode",
    "@copy",
    "This",
    "as",
    "asm",
    "async",
    "auto",
    "await",
    "bool",
    "break",
    "case",
    "catch",
    "char",
    "class",
    "const",
    "continue",
    "default",
    "defer",
    "delete",
    "discard",
    "else",
    "enum",
    "exception",
    "extern",
    "f32",
    "f64",
    "false",
    "for",
    "from",
    "func",
    "i16",
    "i32",
    "i64",
    "i8",
    "if",
    "import",
    "include",
    "interface",
    "is",
    "launch",
    "macro",
    "match",
    "module",
    "native",
    "new",
    "null",
    "ptrof",
    "pub",
    "raise",
    "return",
    "self",
    "string",
    "struct",
    "super",
    "switch",
    "this",
    "true",
    "type",
    "u16",
    "u32",
    "u64",
    "u8",
    "unreachable",
    "var",
    "virtual",
    "void",
    "wchar",
    "while",
    "yield",
  ];
  monaco.languages.setMonarchTokensProvider("cxyLang", {
    keywords,
    tokenizer: {
      root: [
        [/f"/, "string", "@fstring"],
        [/@?[a-z$][\w$]*/, { cases: { "@keywords": "keyword" } }],
        [/0[xX][0-9a-fA-F]+/, "number.hex"], // Hexadecimal
        [/0[bB][01]+/, "number.binary"], // Binary
        [/0[oO]?[0-7]+/, "number.octal"], // Octal
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/\d+([eE][\-+]?\d+)?/, "number"],
        [/"""/, "string", "@tripleString"], // Start of triple-quoted string
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string"],
        [/[{}()\[\]]/, "@brackets"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
        [
          /(\+\+|--|~|\?:|\?)|((\+|-|\*|\/|=|(<<?)|(>>?)|%|!|\^)=?)/,
          "operator",
        ], // Operators
        [/[ \t\r\n]+/],
      ],
      string: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],
      fstring: [
        [/\$\{/, { token: "delimiter.bracket", next: "@interpolatedString" }],
        [/[^\\"\$]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],
      tripleString: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"""/, "string", "@pop"], // End of triple-quoted string
        [/"/, "string"],
      ],
      interpolatedString: [
        [/\}/, { token: "delimiter.bracket", next: "@pop" }],
        { include: "root" },
      ],
      comment: [
        [/[^*/]+/, "comment"],
        [/\/\*/, "comment", "@push"],
        [/\*\//, "comment", "@pop"],
        [/[*/]/, "comment"],
      ],
    },
  });
  monaco.languages.registerCompletionItemProvider("cxyLang", {
    provideCompletionItems: (model: any, position: any) => {
      return {
        suggestions: keywords.map((keyword) => ({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
        })),
      };
    },
  });
}
