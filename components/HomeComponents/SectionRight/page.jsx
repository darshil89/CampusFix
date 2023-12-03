import Image from "next/image";

export default function SectionRight() {
  return (
    <section className="text-blueGray-700 bg-white mt-20">
      <div className="container flex flex-col items-center px-12 mx-auto  md:flex-row ">
        <div className="flex flex-col items-start w-full pt-0 mb-16 text-left  lg:flex-grow md:w-1/2 xl:mr-20 md:pr-24 md:mb-0">
          <h1 className="mb-20 text-2xl font-black tracking-tighter text-black  md:text-5xl title-font">
            {" "}
            Medium length display headline.{" "}
          </h1>
          <p className="mb-8 text-base leading-relaxed text-left text-blueGray-600">
            {" "}
            Deploy your mvp in minutes, not days. WT offers you a a wide
            selection swapable sections for your landing page.{" "}
          </p>
        </div>
        <div className="w-full lg:w-5/6 lg:max-w-lg md:w-1/2">
          <Image
            className="object-cover object-center rounded-lg"
            alt="hero"
            src="/images/plumber.png"
            width={720}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
