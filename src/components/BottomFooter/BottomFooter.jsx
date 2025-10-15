export default function BottomFooter() {
  const paymentLogos = [];

  return (
    <footer className="bg-[#071827] text-neutral-200">
      {/* Top disclaimer bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-neutral-200/90">
        <p className="max-w-4l mx-auto">
          **The Food and Drug Administration has not evaluated these statements.
          This product is not meant to diagnose, treat, cure, or prevent any
          illness.
        </p>
      </div>

      {/* Bottom footer area */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Left block: copyright + powered by + links */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-xl md:text-xl leading-tight font-bold">
                © 2025{' '}
                <span className="font-black">
                  Core<span className="text-red-500">X</span> Nutrition
                </span>
              </p>
              {/* Replace p with a link that uses the animated underline */}
              Powered by:{' '}
              <span className="font-semibold">
                <a
                  href="https://opencodechicago.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline-inverse mt-2 inline-block text-base md:text-lg text-neutral-300"
                >
                  Open Code Chicago
                </a>
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-base text-neutral-300">
              <a href="/return-policy" className="link-underline text-sm">
                Refund policy
              </a>
              <a href="/privacy-policy" className="link-underline text-sm">
                Privacy policy
              </a>
              <a href="/terms-of-service" className="link-underline text-sm">
                Terms of service
              </a>
              <a href="/shipping-policy" className="link-underline text-sm">
                Shipping policy
              </a>
            </div>
          </div>

          {/* Right block: payment icons */}
          <div className="flex items-center justify-end gap-4">
            {paymentLogos.length > 0 &&
              paymentLogos.map((logo) => (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-6 w-auto object-contain bg-white rounded-sm p-1"
                  loading="lazy"
                />
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
