import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";

import App from "../ui";

describe("Testing React Button Functionality", () => {
  test("Next Day Button Exists", () => {
    const component = (<App />);

    const { findByText} = render(component);

    const nextDayButton = await findByText("NEXT DAY");

    expect(nextDayButton).toBeTruthy();
  });
  test("Day state without button press works.", async () => {
    const component = <App />;

    const { findByText} = render(component);

    const dayText = await findByText("Day: 1/5");
    expect(dayText).toBeTruthy();
  });

  test("Next Day Press Works", async () => {
    const component = <App />;

    const { findByText } = render(component);

    const nextDayButton = await findByText("NEXT DAY");

    fireEvent(nextDayButton, "press")
    const newDayText = await findByText("Day: 2/5");
    expect(newDayText).toBeTruthy();
  });
});
