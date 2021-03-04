import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Transactions header", () => {
  render(<App />);
  const transactionsHeader = screen.getByText(/Transactions/i);
  expect(transactionsHeader).toBeInTheDocument();
});

