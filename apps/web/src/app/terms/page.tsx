import type { Metadata } from "next";
import {
  ContentSection,
  PageIntro,
  SiteFrame,
} from "@/components/public/site-frame";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.productName}`,
  description:
    "Read the terms that govern use of Expense Tracker, including account rules, service limitations, acceptable use, and legal terms.",
};

export default function TermsPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Terms of Service"
        title="Rules for using the Expense Tracker service"
        description={`These Terms of Service govern access to and use of ${siteConfig.productName}. By accessing the public website or authenticated application, users agree to these terms to the extent permitted by applicable law.`}
      />

      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 pb-16">
        <ContentSection title="1. Acceptance of the terms">
          <p>
            By accessing, browsing, or using {siteConfig.productName}, users
            agree to be bound by these Terms of Service and any applicable laws
            or policies referenced by them. If a user does not agree, that user
            should not use the service.
          </p>
        </ContentSection>

        <ContentSection title="2. Eligibility and account access">
          <p>
            Users must be legally capable of entering into a binding agreement
            to use the service. Users are responsible for providing a valid
            email address, maintaining control of their account credentials, and
            securing any device used to access the application.
          </p>
          <p>
            The operator may suspend or refuse access if there is reason to
            believe an account is being used fraudulently, unlawfully, or in a
            way that creates security, operational, or legal risk.
          </p>
        </ContentSection>

        <ContentSection title="3. Service description">
          <p>
            {siteConfig.productName} provides a personal budgeting and expense
            logging interface. Features may include account sign-in, budget
            targets, transaction history, dashboards, visual summaries, and
            related product functionality as made available by the operator.
          </p>
          <p>
            The operator may change, improve, suspend, or discontinue any
            feature, screen, workflow, or integration at any time, with or
            without notice, subject to applicable law.
          </p>
        </ContentSection>

        <ContentSection title="4. User responsibilities">
          <p>Users agree that they will:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              provide accurate and lawful information when using the service
            </li>
            <li>
              use the product only for legitimate personal or business purposes
            </li>
            <li>keep account credentials and devices reasonably secure</li>
            <li>avoid uploading malicious code, spam, or harmful content</li>
            <li>avoid attempting to access data belonging to another user</li>
            <li>
              avoid reverse engineering, disrupting, or abusing the service
            </li>
          </ul>
        </ContentSection>

        <ContentSection title="5. Financial information disclaimer">
          <p>
            The service is a budgeting and recordkeeping tool. It does not
            provide banking, tax, accounting, investment, insurance, lending, or
            regulated financial advisory services. Information displayed in the
            application is based on data entered by users and may be incomplete,
            outdated, or inaccurate.
          </p>
          <p>
            Users are solely responsible for financial decisions and for
            verifying their own records before relying on them for tax,
            accounting, legal, or investment purposes.
          </p>
        </ContentSection>

        <ContentSection title="6. User content and data ownership">
          <p>
            Users retain responsibility for the content and financial data they
            submit to the service. By using the product, users grant the
            operator a limited right to host, store, reproduce, process, and
            display that information only as necessary to operate, secure, and
            improve the service and fulfill user requests.
          </p>
        </ContentSection>

        <ContentSection title="7. Acceptable use restrictions">
          <p>
            Users may not use the service to violate law, infringe rights,
            transmit malware, interfere with platform security, scrape other
            users’ information, perform unauthorized automated access, or
            overload the service with abusive traffic or harmful behavior.
          </p>
        </ContentSection>

        <ContentSection title="8. Third-party services">
          <p>
            The application relies on third-party providers, including Supabase
            and Vercel. The operator is not responsible for outages, policies,
            or acts of third-party services outside the operator’s reasonable
            control. Use of those services may also be subject to their own
            terms and privacy notices.
          </p>
        </ContentSection>

        <ContentSection title="9. Availability, maintenance, and beta risk">
          <p>
            The service may experience downtime, maintenance windows, bugs,
            delays, degraded performance, or interruptions. The operator does
            not guarantee uninterrupted availability, permanent feature support,
            or error-free performance.
          </p>
          <p>
            Users should keep independent copies of important financial records
            and should not rely on the service as their sole or official system
            of record.
          </p>
        </ContentSection>

        <ContentSection title="10. Suspension and termination">
          <p>
            The operator may suspend, restrict, or terminate access to the
            service at any time if a user violates these terms, creates risk,
            acts unlawfully, or uses the service in a way that threatens
            security, infrastructure, or other users.
          </p>
        </ContentSection>

        <ContentSection title="11. Intellectual property">
          <p>
            The software, branding, text, design, interface, code, and other
            non-user content associated with the service are owned by or
            licensed to the operator and are protected by applicable
            intellectual-property laws. Except as expressly allowed, users may
            not copy, repackage, distribute, or create derivative works from the
            service.
          </p>
        </ContentSection>

        <ContentSection title="12. Disclaimers and limitation of liability">
          <p>
            The service is provided on an “as is” and “as available” basis to
            the maximum extent permitted by law. The operator disclaims
            warranties of merchantability, fitness for a particular purpose,
            title, non-infringement, uninterrupted availability, and accuracy of
            output or stored data.
          </p>
          <p>
            To the maximum extent permitted by law, the operator will not be
            liable for indirect, incidental, special, consequential, exemplary,
            or punitive damages, or for loss of profits, goodwill, data,
            business opportunity, or financial records arising from or related
            to use of the service.
          </p>
        </ContentSection>

        <ContentSection title="13. Indemnification">
          <p>
            Users agree to defend, indemnify, and hold harmless the operator and
            its service providers from claims, losses, liabilities, damages, and
            expenses arising from misuse of the service, violation of these
            terms, unlawful conduct, or infringement of another party’s rights.
          </p>
        </ContentSection>

        <ContentSection title="14. Governing law and disputes">
          <p>
            These terms are governed by the laws of {siteConfig.jurisdiction},
            excluding conflict-of-law principles, unless applicable consumer law
            requires otherwise. Users should replace this jurisdiction entry
            with the actual governing law before relying on these terms in
            production.
          </p>
        </ContentSection>

        <ContentSection title="15. Changes to these terms">
          <p>
            The operator may revise these terms from time to time. Continued use
            of the service after updated terms are published may constitute
            acceptance of the revised terms, subject to applicable law.
          </p>
        </ContentSection>

        <ContentSection title="16. Contact information">
          <p>
            Questions about these terms may be directed to{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-cyan-300"
            >
              {siteConfig.supportEmail}
            </a>
            .
          </p>
          <p>
            Operator: {siteConfig.operatorName}
            <br />
            Mailing address: {siteConfig.legalAddress}
          </p>
        </ContentSection>
      </div>
    </SiteFrame>
  );
}
