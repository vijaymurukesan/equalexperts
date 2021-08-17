import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Equal Expert Calculator", () => {
  test("Should display correctly", () => {
    render(<App />);
    fireEvent.click(screen.getByText(/6/i));
    fireEvent.click(screen.getByText(/1/i));
    expect(screen.getByText(/61/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/AC/i));
    fireEvent.click(screen.getByText(/9/i));
    fireEvent.click(screen.getByText(/8/i));
    fireEvent.click(screen.getByText(/6/i));
    fireEvent.click(screen.getByText(/←/i));
    expect(screen.getByText(/98/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/AC/i));
    fireEvent.click(screen.getByText(/6/i));
    fireEvent.click(screen.getByText(/\*/i));
    fireEvent.click(screen.getByText(/2/i));
    fireEvent.click(screen.getByText(/=/i));
    expect(screen.getByText(/12/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/AC/i));
    fireEvent.click(screen.getByText(/6/i));
    fireEvent.click(screen.getByText(/4/i));
    fireEvent.click(screen.getByText(/\+\/\-/i));
    expect(screen.getByText(/-64/i)).toBeInTheDocument();
  });
});
