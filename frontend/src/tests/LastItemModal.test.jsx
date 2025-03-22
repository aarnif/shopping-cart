import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";
import LatestItemModal from "../components/LatestItemModal";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const latestItem = {
  id: "49c12b35-8947-48b7-a23f-d0dfb33e28d0",
  title: "A Vision in Color",
  artist: "Liora Senn",
  image: {
    __typename: "Image",
    type: "portrait",
    width: 1024,
    height: 1792,
    uri: "/images/a_vision_in_color.webp",
  },
  size: {
    __typename: "Size",
    width: 40,
    height: 55,
    price: 350,
  },
  quantity: 1,
};

const renderLatestItemModal = (setShowLatestItemModal = () => {}) => {
  render(
    <LatestItemModal
      latestItem={latestItem}
      setShowLatestItemModal={setShowLatestItemModal}
    />
  );
};

describe("<LatestItemModal />", () => {
  test("render modal", () => {
    renderLatestItemModal();
    expect(screen.getByTestId("latest-item-modal")).toBeInTheDocument();
  });

  test("user can click continue shopping", async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
    const setShowLatestItemModalMock = vi.fn();

    renderLatestItemModal(setShowLatestItemModalMock);
    await user.click(screen.getByTestId("continue-shopping-button"));
    expect(setShowLatestItemModalMock).toHaveBeenCalledTimes(1);
    expect(setShowLatestItemModalMock).toHaveBeenCalledWith(false);
  });

  test("user can click proceed to checkout", async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
    const setShowLatestItemModalMock = vi.fn();

    renderLatestItemModal(setShowLatestItemModalMock);
    await user.click(screen.getByTestId("checkout-button"));
    expect(navigate).toHaveBeenCalledWith("/cart");
    expect(setShowLatestItemModalMock).toHaveBeenCalledTimes(1);
    expect(setShowLatestItemModalMock).toHaveBeenCalledWith(false);
  });
});
