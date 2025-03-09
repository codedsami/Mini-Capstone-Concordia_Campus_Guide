import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PointsOfInterestButton from "../components/map-screen-ui/elements/PointsOfInterestButton";
import { getCategoryIcon } from "../utils/categoryIcons";

jest.mock("../utils/categoryIcons", () => ({
  getCategoryIcon: jest.fn(() => "test-file-stub"),
}));

describe("PointsOfInterestButton", () => {
  it("renders correctly with given props", () => {
    const { getByText, toJSON } = render(
      <PointsOfInterestButton type="cafe" name="Coffee" isSelected={false} onPress={() => {}} />
    );

    expect(getByText("Coffee")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("applies selected styles when `isSelected` is true", () => {
    const { getByTestId } = render(
      <PointsOfInterestButton type="cafe" name="Coffee" isSelected={true} onPress={() => {}} />
    );

    const buttonElement = getByTestId("points-of-interest-button");
    expect(buttonElement.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: "#8B1D3B", // Burgundy background when selected
      })
    );
  });

  it("calls `onPress` when pressed", () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <PointsOfInterestButton type="cafe" name="Coffee" isSelected={false} onPress={mockOnPress} />
    );

    fireEvent.press(getByText("Coffee"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("displays the correct icon based on `type`", () => {
    render(<PointsOfInterestButton type="cafe" name="Coffee" isSelected={false} onPress={() => {}} />);
    expect(getCategoryIcon).toHaveBeenCalledWith("cafe");
  });

  it("renders with default props", () => {
    const { getByText } = render(<PointsOfInterestButton type="cafe" name="Coffee" onPress={() => {}} />);

    expect(getByText("Coffee")).toBeTruthy();
  });

  it("renders without crashing when `onPress` is not provided", () => {
    const { getByText } = render(<PointsOfInterestButton type="cafe" name="Coffee" isSelected={false} />);

    expect(getByText("Coffee")).toBeTruthy();
  });
});
