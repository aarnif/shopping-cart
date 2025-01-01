import Section from "./Section";

const Home = () => {
  return (
    <>
      <div className="w-full flex-grow max-w-[1800px] my-24 flex flex-col">
        <Section
          isEven={true}
          header="Explore Nature's Masterpieces: Landscape Art Prints for Every Space"
          content={[
            "Welcome to our exquisite collection of landscape art prints, where each piece opens a window to breathtaking vistas and serene beauty. Our selection captures the majesty of the natural world, from tranquil sunsets and lush forests to rugged mountains and serene lakesides.",
            "Crafted with attention to detail, our artists use various mediums to bring these scenes to life with vibrant colors and intricate textures. Whether you're decorating your home or seeking a meaningful gift, our prints offer unique options for any taste.",
            "Our prints are available in multiple sizes to fit any space and come in high-quality reproductions that preserve the original artwork's depth and detail. Browse our gallery to find your perfect landscape. Each purchase supports our talented artists and adds a touch of nature’s timeless beauty to your surroundings.",
          ]}
          tinyImageURL="images/product-image-1-tiny.png"
          imageURL="images/product-image-1.png"
        />
      </div>
    </>
  );
};

export default Home;
