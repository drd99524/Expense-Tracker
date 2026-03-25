import type { Metadata } from "next";
import {
  ContentSection,
  PageIntro,
  SiteFrame,
} from "@/components/public/site-frame";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.productName}`,
  description:
    "Read how Expense Tracker collects, uses, stores, protects, and deletes account, budgeting, and usage data.",
};

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Privacy Policy"
        title="How account and budgeting data are collected, used, and protected"
        description={`This Privacy Policy explains how ${siteConfig.productName} collects, uses, stores, protects, and discloses personal information in connection with the service. It applies to the public website, authenticated product areas, and related support interactions.`}
      />

      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 pb-16">
        <ContentSection title="1. Scope and operator">
          <p>
            This Privacy Policy applies to {siteConfig.productName} and is
            published by {siteConfig.operatorName}. The service operator may be
            contacted at{" "}
            <a
              href={`mailto:${siteConfig.privacyEmail}`}
              className="text-cyan-300"
            >
              {siteConfig.privacyEmail}
            </a>{" "}
            or by mail at {siteConfig.legalAddress}.
          </p>
          <p>Last updated: {siteConfig.lastUpdated}</p>
        </ContentSection>

        <ContentSection title="2. Information collected from users">
          <p>
            The service collects information that users provide directly or that
            is generated as part of normal account and product usage. This may
            include account identity details, budgets, transaction data, notes,
            device and browser information, server logs, and support messages.
          </p>
          <p>
            The exact categories of information collected depend on how a user
            interacts with the service, what data they enter, and whether they
            contact support or access the application from different devices.
          </p>
        </ContentSection>

        <ContentSection title="3. Account registration and authentication">
          <p>
            When a user creates an account, the service processes identity and
            authentication information such as email address, account
            identifier, session state, and credential-related metadata needed to
            sign the user in and protect the account.
          </p>
          <p>
            Password-based authentication is managed through Supabase
            Authentication. The application does not store plaintext passwords
            in public application tables. If email confirmation or password
            recovery features are enabled, related transactional emails may be
            sent through the authentication system used by the operator.
          </p>
          <p>
            Authentication data is used only to create and secure accounts,
            maintain sessions, prevent unauthorized access, and associate
            budgeting records with the correct user.
          </p>
        </ContentSection>

        <ContentSection title="4. Budget and expense information">
          <p>
            Users may submit and store budgeting information such as target
            budget amounts, expense titles, categories, amounts, transaction
            dates, and optional notes. This information is used to generate the
            dashboard, graphs, budget summaries, and transaction history that
            make up the core experience of the service.
          </p>
          <p>
            Users are responsible for the accuracy of the financial data they
            submit. The service stores that content on a per-account basis so it
            can be displayed back to the relevant user on future visits.
          </p>
        </ContentSection>

        <ContentSection title="5. Technical, device, and usage information">
          <p>
            Like most web services, {siteConfig.productName} may process
            technical data such as IP addresses, browser type, device
            information, operating system, request timestamps, error logs,
            authentication events, and general usage metadata required to secure
            and operate the service.
          </p>
          <p>
            This information may be used for diagnostics, fraud prevention,
            abuse detection, reliability monitoring, capacity planning, and
            service improvement.
          </p>
        </ContentSection>

        <ContentSection title="6. Purposes of processing">
          <p>The service processes information for purposes that include:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>creating and maintaining user accounts</li>
            <li>authenticating users and managing secure sessions</li>
            <li>storing and displaying budgets and expense records</li>
            <li>
              delivering product features and account-related functionality
            </li>
            <li>preventing fraud, abuse, and unauthorized access</li>
            <li>responding to support or privacy requests</li>
            <li>enforcing contractual terms and complying with law</li>
            <li>maintaining backups, logs, and operational integrity</li>
          </ul>
        </ContentSection>

        <ContentSection title="7. How information may be shared">
          <p>
            The service does not sell personal information. Personal
            information may be disclosed only in limited circumstances,
            including to service providers that host or secure the product, to
            comply with legal obligations, to investigate abuse or security
            incidents, or in connection with a business transfer involving the
            service.
          </p>
          <p>
            Third-party providers may process information on behalf of the
            operator only as reasonably necessary to host, authenticate, secure,
            and deliver the service.
          </p>
        </ContentSection>

        <ContentSection title="8. Storage, security, and retention">
          <p>
            Account data and budgeting records are stored using Supabase-backed
            infrastructure, and the application is delivered through Vercel.
            Reasonable technical and organizational safeguards are used to
            protect information against unauthorized access, alteration,
            disclosure, or destruction.
          </p>
          <p>
            No system can be guaranteed to be perfectly secure. Users should
            avoid storing information in free-form notes that they do not want
            retained in connection with budgeting records.
          </p>
          <p>
            Information is retained for as long as reasonably necessary to
            operate the service, resolve disputes, comply with legal
            obligations, enforce agreements, and maintain legitimate business
            records.
          </p>
        </ContentSection>

        <ContentSection title="9. User rights and choices">
          <p>
            Subject to applicable law, users may have rights to request access
            to personal information, request correction, request deletion,
            object to certain processing, or ask questions about how information
            is handled.
          </p>
          <p>
            Users can request privacy assistance by contacting{" "}
            <a
              href={`mailto:${siteConfig.privacyEmail}`}
              className="text-cyan-300"
            >
              {siteConfig.privacyEmail}
            </a>
            . Requests may require identity verification before the service can
            take action on an account.
          </p>
        </ContentSection>

        <ContentSection title="10. Children’s privacy">
          <p>
            {siteConfig.productName} is not directed to children under 13 and is
            not knowingly designed to collect personal information from young
            children. If the operator becomes aware that a child has submitted
            personal information in violation of applicable rules, reasonable
            steps may be taken to remove that information.
          </p>
        </ContentSection>

        <ContentSection title="11. International transfers and third-party infrastructure">
          <p>
            The service may rely on infrastructure providers and support tools
            operating in multiple regions. As a result, personal information may
            be processed or stored outside the user’s immediate jurisdiction,
            subject to applicable contractual, technical, and legal safeguards.
          </p>
        </ContentSection>

        <ContentSection title="12. Policy changes">
          <p>
            This Privacy Policy may be updated from time to time to reflect
            changes in the service, law, security practices, or third-party
            providers. Material changes may be posted on this page with an
            updated effective date.
          </p>
        </ContentSection>

        <ContentSection title="13. Contact information">
          <p>
            Privacy questions, access requests, and deletion inquiries may be
            directed to{" "}
            <a
              href={`mailto:${siteConfig.privacyEmail}`}
              className="text-cyan-300"
            >
              {siteConfig.privacyEmail}
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
