export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div id="hero" className="relative isolate overflow-hidden pt-14 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Find Your Perfect VA Home
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                Discover homes financed with VA loans and assume their low interest rates. Save thousands on your mortgage.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#features"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#features" className="text-sm/6 font-semibold text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div id="features" className="mt-32 sm:mt-56">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Everything you need</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance">
              Find VA-backed homes with assumable loans
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
              Our platform connects you with homeowners looking to transfer their VA loans. Lock in yesterday&apos;s rates today.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div id="pricing" className="relative isolate mt-32 px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Choose the right plan for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg/8 text-pretty text-gray-600">
          Access our comprehensive database of VA loan properties and connect with sellers ready to transfer their low rates.
        </p>
      </div>

      {/* FAQ section */}
      <div id="faq" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            Have questions about VA loan assumptions? We&apos;re here to help.
          </p>
        </div>
      </div>
    </div>
  );
}
