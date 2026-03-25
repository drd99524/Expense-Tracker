import type { Metadata } from "next";
import {
  ContentSection,
  PageIntro,
  SiteFrame,
} from "@/components/public/site-frame";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About | ${siteConfig.productName}`,
  description:
    "Learn what Expense Tracker does, who it is for, how accounts work, and how budgeting data is stored and protected.",
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="About"
        title="A focused budgeting product for day-to-day money decisions"
        description={`${siteConfig.productName} is a personal budgeting and expense tracking application for people who want a clean, account-based place to record spending, set targets, and revisit financial history without maintaining a spreadsheet manually.`}
      />

      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 pb-16">
        <ContentSection title="What the service is for">
          <p>
            {siteConfig.productName} allows signed-in users to maintain a
            private record of personal budgets and expense entries. The product
            presents an overview dashboard, rolling budget summaries, category
            breakdowns, and transaction history in a single interface.
          </p>
          <p>
            The service is intended for personal organization and visibility
            into everyday spending. It is not intended to replace accounting,
            tax, payroll, banking, brokerage, or regulated financial services.
          </p>
        </ContentSection>

        <ContentSection title="Who the product is for">
          <p>
            The application is built for individuals, households, students,
            freelancers, and professionals who want a lightweight budgeting tool
            without a complex enterprise setup. Users typically rely on the
            service to log expenses, monitor short-term and monthly spending,
            and maintain an organized history of transactions.
          </p>
        </ContentSection>

        <ContentSection title="Core workflow">
          <p>
            The main workflow is intentionally narrow. Users create an account,
            sign in with email and password, define budget targets, record
            expenses, and then return to the dashboard and history screens to
            review what changed over time.
          </p>
          <p>
            The service is designed to reduce friction around those repeat
            actions rather than broaden into full accounting, reimbursement,
            payroll, or bank-connectivity software.
          </p>
        </ContentSection>

        <ContentSection title="Accounts and authentication">
          <p>
            Users access the application through an email-and-password account.
            Account identity is anchored to the email address registered by the
            user, which allows each account to remain isolated from others.
          </p>
          <p>
            Authentication is handled through Supabase. The application uses the
            authenticated user identity to scope data access so each person can
            read and modify only their own budgeting records.
          </p>
        </ContentSection>

        <ContentSection title="What information is stored">
          <p>
            After authentication, the service stores account-linked budgeting
            data such as target budgets, expense titles, categories, amounts,
            dates, and optional notes entered by the user. This information is
            stored to provide the core budgeting and history features of the
            application.
          </p>
          <p>
            Basic account identity details, such as email address and account
            identifier, are also used for sign-in, session management, support,
            fraud prevention, and product operations.
          </p>
        </ContentSection>

        <ContentSection title="Security and architecture">
          <p>
            The application uses Supabase for authentication and data storage.
            User records are protected with account-scoped database rules so
            that users can only access their own budgeting data. Data is
            transmitted over encrypted HTTPS connections, and the product is
            deployed on Vercel with server-rendered routes for authenticated
            application areas.
          </p>
          <p>
            Password handling is managed by the authentication provider rather
            than stored directly in application tables. The service aims to
            limit data collection to what is reasonably necessary for sign-in,
            account operation, budgeting features, diagnostics, abuse
            prevention, and legal compliance.
          </p>
        </ContentSection>

        <ContentSection title="What the product does not do">
          <p>
            {siteConfig.productName} is not a bank, card issuer, lender,
            brokerage, insurer, tax preparer, or regulated financial adviser.
            It does not automatically import bank statements, issue payments, or
            replace independent bookkeeping and tax records.
          </p>
          <p>
            Users remain responsible for the completeness and accuracy of the
            data they enter and for the financial decisions they make based on
            that information.
          </p>
        </ContentSection>

        <ContentSection title="Third-party services">
          <p>
            The application currently relies on third-party infrastructure
            providers to operate. These currently include Supabase for
            authentication and database hosting, and Vercel for web hosting and
            delivery. These providers operate under their own terms and privacy
            commitments.
          </p>
        </ContentSection>

        <ContentSection title="Operator and contact information">
          <p>
            Operator name:{" "}
            <span className="text-white">{siteConfig.operatorName}</span>
          </p>
          <p>
            Support email:{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="text-cyan-300"
            >
              {siteConfig.supportEmail}
            </a>
          </p>
          <p>Mailing address: {siteConfig.legalAddress}</p>
        </ContentSection>
      </div>
    </SiteFrame>
  );
}
