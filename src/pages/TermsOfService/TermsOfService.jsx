import SEO from '../../components/SEO';

export default function TermsOfService() {
  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 p-2 bg-blue-600 text-white z-50"
      >
        Skip to main content
      </a>

      <SEO
        title="Terms of Service | CoreX Nutrition"
        description="Read CoreX Nutrition's Terms of Service for this open-source demo project. Learn about user responsibilities, contributions, and project guidelines."
        keywords="Terms of Service, CoreX Nutrition, Open Source, User Agreement, Legal"
      />

      <main
        id="main-content"
        className="min-h-screen bg-[#F7FAFF] font-inter py-12 px-4 sm:px-6 lg:px-8"
        role="main"
        aria-labelledby="tos-title"
      >
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <header className="mb-8">
            <h1 id="tos-title" className="text-5xl text-gray-900 mb-4">
              Terms of Service
            </h1>
          </header>

          {/* Main Content */}
          <article className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section aria-labelledby="introduction-section">
              <p className="mb-4 mt-8">
                Welcome to CoreX Nutrition. These Terms of Service ("Terms")
                govern your use of our website and participation in this
                open-source project. By accessing or using this site, you agree
                to be bound by these Terms.
              </p>
            </section>
            <hr />

            {/* Project Nature */}
            <section aria-labelledby="project-nature-section">
              <h2
                id="project-nature-section"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                1. PROJECT NATURE
              </h2>
              <p className="mb-4">
                CoreX Nutrition is an open-source demo project created by Open
                Code Chicago. It is designed for educational purposes,
                Hacktoberfest contributions, and open-source collaboration.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>This is not a commercial store.</li>
                <li>No actual purchases, payments, or shipments take place.</li>
                <li>
                  All content and features are for demonstration purposes only.
                </li>
              </ul>
            </section>
            <hr />

            {/* User Responsibilities */}
            <section aria-labelledby="user-responsibilities-section">
              <h2
                id="user-responsibilities-section"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                2. USER RESPONSIBILITIES
              </h2>
              <p className="mb-3">By using this site, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Use the site for lawful, educational, and collaborative
                  purposes only.
                </li>
                <li>
                  Respect accessibility, inclusivity, and coding best practices
                  when contributing.
                </li>
                <li>
                  Avoid submitting harmful, malicious, or inappropriate content.
                </li>
              </ul>
            </section>
            <hr />

            {/* Contributions */}
            <section aria-labelledby="contributions-section">
              <h2
                id="contributions-section"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                3. CONTRIBUTIONS
              </h2>
              <p className="mb-3">
                Contributors to the CoreX Nutrition project agree to follow:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Open Code Chicago's contribution guidelines.</li>
                <li>
                  Standard open-source licensing practices (MIT License unless
                  otherwise stated).
                </li>
                <li>Proper attribution and respect for the work of others.</li>
              </ul>
            </section>
            <hr />

            {/* Intellectual Property */}
            <section aria-labelledby="intellectual-property-section">
              <h2
                id="intellectual-property-section"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                4. INTELLECTUAL PROPERTY
              </h2>
              <p className="">
                All branding, design, and content for CoreX Nutrition are part
                of this demo project.
              </p>
              <p>Code is shared under open-source licensing terms.</p>
              <p>
                Content may be reused for educational and open-source purposes,
                but not for misleading commercial activity.
              </p>
            </section>
            <hr />

            {/* Disclaimers */}
            <section aria-labelledby="disclaimers-section">
              <h2
                id="disclaimers-section"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                5. DISCLAIMERS
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  CoreX Nutrition does not sell, process payments, or ship
                  products.
                </li>
                <li>
                  All supplements, reviews, and product descriptions are
                  fictional or sample content.
                </li>
                <li>
                  The Food and Drug Administration (FDA) has not evaluated any
                  product statements made on this site.
                </li>
              </ul>
            </section>
            <hr />

            {/* Limitation of Liability */}
            <section aria-labelledby="liability-section">
              <h2
                id="liability-section"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                6. LIMITATION OF LIABILITY
              </h2>
              <p>
                To the maximum extent permitted by law, Open Code Chicago and
                its contributors shall not be held liable for any damages
                resulting from the use of this demo project, including but not
                limited to data loss, inaccuracies, or accessibility issues.
              </p>
            </section>
            <hr />

            {/* Modifications to Terms */}
            <section aria-labelledby="modifications-section">
              <h2
                id="modifications-section"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                7. MODIFICATIONS TO TERMS
              </h2>
              <p>
                We reserve the right to update or modify these Terms of Service
                at any time to reflect changes in the project. Updates will be
                posted on this page with a revised "last updated" date.
              </p>
            </section>
            <hr />

            {/* Contact & Community */}
            <section aria-labelledby="contact-section">
              <h2
                id="contact-section"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                8. CONTACT & COMMUNITY
              </h2>
              <p>
                For questions, contributions, or accessibility concerns, please
                contact us via our GitHub repository discussions.
              </p>
            </section>
            <hr />

            {/* Last Updated */}
            <section aria-labelledby="last-updated">
              <h2
                id="last-updated"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                LAST UPDATED
              </h2>
              <p>October 2025</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
