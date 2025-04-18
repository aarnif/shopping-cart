import { useNavigate } from "react-router";
import { FaMinus, FaPlus, FaArrowRightLong } from "react-icons/fa6";

const CartItem = ({ item, handleAddItemToCart, handleRemoveItemFromCart }) => {
  const { id, title, artist, image, quantity, size } = item;
  return (
    <div
      key={id}
      data-testid={`cart-item-${id}`}
      className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl"
    >
      <div className="p-4 flex flex-col gap-4">
        <div className="w-full flex justify-between gap-4">
          <div className="flex-grow">
            <img
              className="w-auto max-h-[150px] md:max-h-[190px] xl:max-h-[230px] object-contain"
              src={image.uri}
              alt={title}
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex flex-col justify-start items-start">
              <div>
                <h2 className="text-slate-900 dark:text-slate-100 text-sm md:text-base xl:text-lg font-bold font-roboto-condensed">
                  {title}
                </h2>
              </div>
              <h3 className="text-slate-700 dark:text-slate-300 text-xs md:text-sm xl:text-base italic">
                by {artist}
              </h3>
            </div>
            <div>
              <div className="text-slate-700 dark:text-slate-300 text-xs md:text-sm xl:text-base">
                {size.dimensions}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-full shadow-lg">
            <button
              data-testid={`cart-item-${id}-remove`}
              className="w-6 h-6 flex justify-center items-center rounded-l-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-200 dark:active:bg-slate-600 active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() => handleRemoveItemFromCart(item.id)}
            >
              <FaMinus className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current text-slate-700 dark:text-slate-200" />
            </button>
            <div
              key={quantity}
              data-testid={`cart-item-${id}-quantity`}
              className="w-5 h-6 md:w-6 flex justify-center items-center text-sm md:text-base text-slate-700 dark:text-slate-200 font-medium animate-zoom-in-and-out"
            >
              {quantity}
            </div>
            <button
              data-testid={`cart-item-${id}-add`}
              className="w-6 h-6 flex justify-center items-center rounded-r-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 active:bg-slate-200 dark:active:bg-slate-600 active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() => handleAddItemToCart(item, size)}
            >
              <FaPlus className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current text-slate-700 dark:text-slate-200" />
            </button>
          </div>
          <div className="text-center text-slate-700 dark:text-slate-200 text-sm md:text-base xl:text-lg font-bold">
            {quantity * size.price} €
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = ({ shoppingCart, handleShowAlertModal }) => {
  const totalItemsCost = shoppingCart.reduce(
    (acc, item) => acc + item.quantity * item.size.price,
    0
  );
  const shippingCost = 9.99;

  return (
    <div className="p-4 flex flex-col items-center gap-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-center text-slate-800 dark:text-slate-100 font-bold">
        Order Summary
      </h2>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <p className="text-center text-slate-700 dark:text-slate-300 text-sm md:text-base">
            Items
          </p>
          <p
            data-testid="total-cost"
            className="text-center text-slate-700 dark:text-slate-300 text-sm md:text-base"
          >
            {totalItemsCost} €
          </p>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-center text-slate-700 dark:text-slate-300 text-sm md:text-base">
            Shipping
          </p>
          <p className="text-center text-slate-700 dark:text-slate-300 text-sm md:text-base">
            {shippingCost} €
          </p>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-center text-slate-800 dark:text-slate-100 text-base md:text-lg font-semibold">
            Total
          </p>
          <p className="text-center text-slate-800 dark:text-slate-100 text-base md:text-lg font-semibold">
            {totalItemsCost + shippingCost} €
          </p>
        </div>
      </div>
      <button
        className="w-full p-2 flex justify-center items-center gap-2 bg-green-500 border-green-500 rounded-lg shadow-xl cursor-pointer 
        hover:bg-green-600 hover:border-green-600 active:bg-green-600 active:border-green-700 active:inset-shadow-sm transition-all duration-300 ease-in-out"
        onClick={handleShowAlertModal}
      >
        <p className="text-white text-sm md:text-base xl:text-lg font-bold">
          Checkout
        </p>
        <FaArrowRightLong className="w-4 h-4 md:w-4.5 md:h-4.5 xl:w-5 xl:h-5 text-white fill-current" />
      </button>
    </div>
  );
};

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div
      data-testid="empty-cart"
      className="pt-8 md:pt-12 xl:pt-16 px-4 flex flex-col items-center gap-4"
    >
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-slate-700 dark:text-slate-300 text-base xl:text-lg font-medium">
          Looks like your cart is still empty.
        </h2>
      </div>
      <button
        data-testid="start-shopping-button"
        className="py-2 px-4 max-w-[200px] flex justify-center items-center gap-2 text-base xl:text-lg text-white font-bold bg-rose-700 
        border-2 border-rose-700 rounded-lg cursor-pointer hover:bg-rose-800
        hover:border-rose-800 active:border-rose-900 active:inset-shadow-sm transition-all duration-300 ease-in-out"
        onClick={() => navigate("/art")}
      >
        <p>Start Shopping</p>
        <FaArrowRightLong className="w-5 h-5 xl:w-6 xl:h-6 text-white fill-current" />
      </button>
    </div>
  );
};

const Cart = ({
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  handleShowAlertModal,
}) => {
  return (
    <div
      data-testid="cart-page"
      className="py-24 md:py-28 xl:py-32 w-full flex-grow flex flex-col items-center justify-start bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-4 p-4">
        {shoppingCart.length > 0 ? (
          <>
            <h1 className="w-full text-center md:text-left text-lg xl:text-xl text-slate-900 dark:text-slate-100 font-bold">
              Cart
            </h1>
            <div className="w-full flex flex-col md:flex-row md:justify-center gap-4">
              <div className="w-full flex flex-col gap-4">
                {shoppingCart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    handleAddItemToCart={handleAddItemToCart}
                    handleRemoveItemFromCart={handleRemoveItemFromCart}
                  />
                ))}
              </div>
              <div className="w-full md:max-w-[300px]">
                <OrderSummary
                  shoppingCart={shoppingCart}
                  handleShowAlertModal={handleShowAlertModal}
                />
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
