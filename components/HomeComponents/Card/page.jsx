const Card = () => {
  return (
    <>
      {/* Problem and Solution Section */}
      <section className="bg-primary py-16 px-8">
        <div className="container mx-auto text-center">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Side: Problem Statement with Image */}
            <div
              id="problem"
              className="flex flex-col justify-center items-start"
            >
              <h1 className="text-4xl font-bold mb-8 text-white">
                The Problem?
              </h1>
              <p className="text-lg text-left text-white">{problemStatement}</p>
            </div>
            <div className="md:flex md:justify-end md:items-center">
              <img
                src={Problem}
                alt="Solution"
                className="max-w-base md:w-3/4"
              />
            </div>

            {/* Right Side: Proposed Solution with Image */}

            <div id="solution" className="md:flex md:items-center">
              <img
                src={Solution}
                alt="Solution"
                className="max-w-base md:w-3/4"
              />
            </div>

            <div className="flex flex-col justify-center items-end">
              <h2 className="text-4xl font-bold mb-8 text-right text-white">
                The Solution!
              </h2>
              <p className="text-lg text-right text-white">
                {proposedSolution}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
