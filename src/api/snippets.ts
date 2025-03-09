import { apiServerHost, defaultCode } from "@/constants";

class SnippetsApi {
  constructor(private serverHost: string) {}

  async getSnippets() {
    const response = await fetch(`http://${this.serverHost}/snippets`);
    const data = await response.json();
    data["hello"] = "Hello World";
    return Object.keys(data).map((key) => ({ id: key, label: data[key] }));
  }

  async getSnippet(id: string) {
    if (id === "hello") {
      return defaultCode;
    }
    const response = await fetch(`http://${this.serverHost}/snippet/${id}`);
    return await response.text();
  }
}

export const snippetsApi = new SnippetsApi(apiServerHost);
