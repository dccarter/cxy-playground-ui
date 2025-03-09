import { apiServerUri } from "@/constants";
import { ActionId } from "@/types";

class Cxy {
  constructor(private serverUri: string) {}

  buildOutput(data: { stdout?: string; stderr?: string; status: number }) {
    const output = data.stdout ? atob(data.stdout) : "";
    if (data.status !== 0 && data.stderr)
      return output + "\n" + atob(data.stderr);
    return output;
  }

  async checkResponse(response: Response) {
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${await response.text()}`
      );
    }
    return response;
  }

  async build(code: string, args?: string) {
    const response = await fetch(`${this.serverUri}/build`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: btoa(code), args }),
    });
    await this.checkResponse(response);
    const data = await response.json();
    return this.buildOutput(data);
  }

  async run(code: string, args: string) {
    const response = await fetch(`${this.serverUri}/run`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: btoa(code), args }),
    });
    await this.checkResponse(response);
    const data = await response.json();
    if (data.build && data.build.status !== 0) {
      return this.buildOutput(data.build);
    }

    return this.buildOutput({
      status: data.status,
      stdout: data.stdout,
      stderr: data.stderr,
    });
  }

  async test(code: string, args: string) {
    const response = await fetch(`${this.serverUri}/test`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: btoa(code), args }),
    });

    await this.checkResponse(response);
    const data = await response.json();
    return this.buildOutput(data);
  }

  async getGeneratedCode(code: string, args: string) {
    const response = await fetch(`${this.serverUri}/source`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: btoa(code), args }),
    });

    await this.checkResponse(response);
    if (response.headers.get("Content-Type") === "text/plain") {
      return { ok: true, data: await response.text() };
    }
    const data = await response.json();
    return { ok: false, data: this.buildOutput(data) };
  }

  executeAction(action: ActionId, code: string, args: string) {
    switch (action) {
      case "run":
        return this.run(code, args);
      case "build":
        return this.build(code, args);
      case "genc":
        return this.getGeneratedCode(code, args);
      case "test":
        return this.test(code, args);
      default:
        return Promise.resolve("");
    }
  }
}

export const cxyCompiler = new Cxy(apiServerUri);
