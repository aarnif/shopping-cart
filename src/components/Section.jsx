import BlurredImage from "./BlurredImage";

const Section = ({ isEven, header, content, tinyImageURL, imageURL }) => {
  const paragraphs = content.map((paragraph, index) => (
    <div key={index} className="my-4">
      {paragraph}
    </div>
  ));

  const sectionTextElement = (
    <div className="flex-grow basis-1/2 h-full max-w-[900px] px-12 pt-12 flex flex-col justify-start items-center">
      <h2 className="text-2xl font-bold mb-8">{header}</h2>
      <div className="text-lg">{paragraphs}</div>
    </div>
  );

  const sectionImageElement = (
    <div className="flex-grow basis-1/2 h-full max-w-[900px] flex justify-center items-center bg-slate-500">
      <BlurredImage lowQualitySrc={tinyImageURL} highQualitySrc={imageURL} />
    </div>
  );

  if (isEven) {
    return (
      <section className="h-[600px] flex-grow flex justify-center items-center">
        {sectionTextElement}
        {sectionImageElement}
      </section>
    );
  }

  return (
    <section className="h-[600px] flex-grow flex justify-center items-center">
      {sectionImageElement}
      {sectionTextElement}
    </section>
  );
};

export default Section;
