import { apiServerUri, defaultCode } from "@/constants";

class SnippetsApi {
  constructor(private serverUri: string) {}

  async getSnippets() {
    const response = await fetch(`${this.serverUri}/snippets`);
    const data = await response.json();
    data["hello"] = "Hello World";
    return Object.keys(data).map((key) => ({ id: key, label: data[key] }));
  }

  async getSnippet(id: string) {
    if (id === "hello") {
      return defaultCode;
    }
    const response = await fetch(`${this.serverUri}/snippet/${id}`);
    return await response.text();
  }
}

export const snippetsApi = new SnippetsApi(apiServerUri);
