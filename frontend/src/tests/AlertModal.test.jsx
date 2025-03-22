import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import AlertModal from "../components/AlertModal.jsx";

const renderAlertModal = () => {
  render(
    <AlertModal
      title="Alert!"
      message="The proceed from checkout is not implemented!"
      handleClose={() => {}}
    />
  );
};

describe("<AlertModal />", () => {
  test("render modal", () => {
    renderAlertModal();
    expect(screen.getByTestId("alert-modal")).toBeInTheDocument();
  });

  test("render title", () => {
    renderAlertModal();
    expect(screen.getByText("Alert!")).toBeInTheDocument();
  });

  test("render message", () => {
    renderAlertModal();
    expect(
      screen.getByText("The proceed from checkout is not implemented!")
    ).toBeInTheDocument();
  });
});
