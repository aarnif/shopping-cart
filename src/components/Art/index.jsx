import LoadingIcon from "../../LoadingIcon";
import ArtGrid from "./ArtGrid";

const Art = ({
  art,
  shoppingCart,
  setShoppingCart,
  setLatestShoppingCartItem,
}) => {
  return (
    <>
      <div className="w-full flex-grow max-w-[1600px] my-24 px-12 flex flex-col justify-center items-center">
        {!art.length ? (
          <LoadingIcon />
        ) : (
          <ArtGrid
            art={art}
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
            setLatestShoppingCartItem={setLatestShoppingCartItem}
          />
        )}
      </div>
    </>
  );
};

export default Art;
