export const defaultCode = `
// - The entry point of a Cxy program is the main function.
// - The main function is where the program starts its execution
//   and it is the only required function in a Cxy program.
// - The return type of the main function is either void or an integer
//   type, which represents the exit status of the program.
// - The main function can take zero or more arguments, which are
//   passed to the program from the command line.
func main() {
  println("Hello, World!")
}
`;

const apiServerHost = import.meta.env.VITE_CXY_API_SERVER ?? "localhost:8080";
const apiServerProtocol = import.meta.env.VITE_API_PROTOCOL ?? "http";
export const apiServerUri = `${apiServerProtocol}://${apiServerHost}`;
