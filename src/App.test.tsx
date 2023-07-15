import { render, screen } from "@testing-library/react";
import { App } from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("Jest Snapshot testing suite", () => {
  beforeAll(() => {
    return render(<App />);
  });

  it("button to open modal is visible", () => {
    expect(screen.getByText("Open modal")).toBeInTheDocument()
  });
});
