import { FaMinus, FaPlus, FaArrowRightLong } from "react-icons/fa6";

const CartItem = ({ item, handleAddItemToCart, handleRemoveItemFromCart }) => {
  const { title, artist, image, quantity, size } = item;
  return (
    <div className="bg-white rounded-lg shadow-xl">
      <div className="p-4 flex flex-col gap-4">
        <div className="w-full flex justify-between gap-4">
          <div className="flex-grow">
            <img className="w-auto max-h-[150px] object-contain" src={image} />
          </div>
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex-col justify-start items-start flex">
              <div>
                <h2 className="text-slate-900 text-sm font-bold font-roboto-condensed">
                  {title}
                </h2>
              </div>
              <h3 className="text-slate-700 text-xs italic">by {artist}</h3>
            </div>
            <div>
              <div className="text-slate-700 text-xs">{size.dimensions}</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex bg-slate-100 rounded-full shadow-lg">
            <button
              className="w-6 h-6 flex justify-center items-center rounded-l-full
            hover:bg-slate-200 active:bg-slate-200 active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() => handleRemoveItemFromCart(item.id)}
            >
              <FaMinus className="w-3.5 h-3.5 fill-current text-slate-700" />
            </button>
            <div
              key={quantity}
              className="w-6 h-6 flex justify-center items-center text-sm text-slate-700 font-medium animate-zoom-in-and-out"
            >
              {quantity}
            </div>
            <button
              className="w-6 h-6 flex justify-center items-center rounded-r-full
            hover:bg-slate-200 active:bg-slate-200 active:inset-shadow-sm transition-all duration-300 ease-in-out"
              onClick={() => handleAddItemToCart(item, size)}
            >
              <FaPlus className="w-3.5 h-3.5 fill-current text-slate-700" />
            </button>
          </div>
          <div className="text-center text-slate-700 text-sm font-bold">
            {quantity * size.price} €
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderSummary = ({ shoppingCart }) => {
  const totalItemsCost = shoppingCart.reduce(
    (acc, item) => acc + item.quantity * item.size.price,
    0
  );
  const shippingCost = 9.99;

  return (
    <div className="w-full p-4 flex flex-col items-center gap-4 bg-white rounded-lg shadow-xl">
      <h2 className="text-center text-slate-800 font-bold">Order Summary</h2>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <p className="text-center text-slate-700 text-sm">Items</p>
          <p className="text-center text-slate-700 text-sm">
            {totalItemsCost} €
          </p>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-center text-slate-700 text-sm">Shipping</p>
          <p className="text-center text-slate-700 text-sm">{shippingCost} €</p>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-center text-slate-800 text-base font-semibold">
            Total
          </p>
          <p className="text-center text-slate-800 text-base font-semibold">
            {totalItemsCost + shippingCost} €
          </p>
        </div>
      </div>
      <button className="w-full p-2 flex justify-center items-center gap-2 bg-green-500 rounded-lg shadow-xl">
        <p className="text-white text-sm font-bold">Checkout</p>
        <FaArrowRightLong className="w-4 h-4 text-white fill-current" />
      </button>
    </div>
  );
};

const Cart = ({
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemFromCart,
}) => {
  return (
    <div className="py-16 w-full flex-grow flex flex-col items-center justify-start bg-slate-100">
      <div className="w-full flex flex-col gap-4 p-4">
        <h1 className="text-xl text-slate-900 font-bold">Cart</h1>
        {shoppingCart.length > 0 ? (
          shoppingCart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
            />
          ))
        ) : (
          <p className="text-slate-700 text-base">Your cart is empty</p>
        )}
        <OrderSummary shoppingCart={shoppingCart} />
      </div>
    </div>
  );
};

export default Cart;
