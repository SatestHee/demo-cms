import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import FilterTab from "../components/FilterTab";

test("renders the expected content", () => {
  render(<FilterTab />);
  expect(screen.getByText(/search/i).closest("button")).toBeDisabled();
  const input = screen.getByLabelText("State");
  userEvent.type(input, "California");
  expect(input.value).toBe("California");
});
