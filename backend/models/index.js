import Artwork from "./artwork.js";
import Image from "./image.js";
import Size from "./size.js";
import Review from "./review.js";

Artwork.hasOne(Image);
Image.belongsTo(Artwork);

Artwork.hasMany(Size);
Size.belongsTo(Artwork);

Artwork.hasMany(Review);
Review.belongsTo(Artwork);

export { Artwork, Image, Size, Review };
