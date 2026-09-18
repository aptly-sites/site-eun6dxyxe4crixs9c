import { PageLayout } from "@/components/layout/PageLayout";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <SEO
        title="Privacy Policy - EquityTeam Property Management"
        description="Read the EquityTeam privacy policy governing how we collect, use, maintain and disclose information from users of our website."
        canonical="/privacy-policy"
      />

      {/* Hero */}
      <section className="relative z-10 px-5 xl:px-0 pt-28 pb-20 md:pt-45 md:pb-25 bg-no-repeat bg-cover bg-center bg-black bg-blend-multiply">
        <div className="max-w-screen-xl mx-auto text-center relative">
          <span className="block section-subheading mb-5 !text-white"></span>
          <h1 className="uppercase font-cowling font-bold leading-none text-white mb-5 text-[28px] md:text-[56px] md:max-w-[960px] mx-auto">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="md:mt-0 bg-white">
        <div className="max-w-screen-xl mx-auto px-5 xl:px-0 py-15 md:py-16 lg:py-24">
          <div className="w-full inner-pages-main-content">
            <div className="default-page relative text-gray-900">

              <p>This Privacy Policy governs the manner in which the Company collects, uses, maintains and discloses information collected from users (each, a "User") of the Company's website ("Site"). This privacy policy applies to the Site and all products and services offered by the Company.</p>

              <p><strong>Personal identification information:</strong> We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, phone number. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.</p>

              <p><strong>How long do we keep your data:</strong> We will retain any personally identifiable information that you provide to us for as long as necessary in the pursuit of our legitimate business activities or to service any agreement we have made with you or until you request to change your data or have it removed from our records. We may continue to contact you for legitimate business activities required to maintain your account or service any agreement or contract that we have with you.</p>

              <p><strong>Non-personal identification information:</strong> We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information. This information will be kept in accordance with the policies of any third party providers we use, but will usually be deleted within 540 days from your last visit to our site.</p>

              <p><strong>Web browser cookies:</strong> Our Site may use "cookies" to enhance User experience. User's web browsers place cookies on their hard drive for record-keeping purposes and sometimes to track information about them. Users may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>

              <p><strong>How we use collected information:</strong> We may collect and use Users personal information for the following purposes:</p>
              <ul>
                <li>To improve customer service – Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
                <li>To personalize user experience – We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
                <li>To Improve the Site – We may use feedback you provide to improve our products and services.</li>
                <li>To send periodic emails: We may use the email address to respond to their inquiries, questions, and/or other requests.</li>
                <li>To keep you Updated: We may use third-party ad networks and non-personal identification data we've collected to display educational and promotional messages to users who have visited our site in the past.</li>
              </ul>

              <p>You have the right to know what personal information we have about you and to make changes to that information at any time. To find out what data we've retained or to make changes to the information, please contact us via our <Link href="/contact-us">contact form</Link>.</p>

              <p><strong>How we protect your information:</strong> We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>

              <p><strong>Sharing your personal information:</strong> We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.</p>

              <p><strong>Changes to this privacy policy:</strong> The Company has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>

              <p><strong>Your acceptance of these terms:</strong> By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>

            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
