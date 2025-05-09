import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
              Privacy Policy
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, including but not limited to your name, email address, and any other information you choose to provide.
              </p>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.
              </p>

              <h2>3. Information Sharing</h2>
              <p>
                We do not share your personal information with third parties except as described in this privacy policy. We may share your information with service providers who perform services on our behalf.
              </p>

              <h2>4. Data Security</h2>
              <p>
                We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>

              <h2>5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your information.
              </p>

              <h2>6. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>

              <h2>7. Children's Privacy</h2>
              <p>
                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
              </p>

              <h2>8. Changes to This Policy</h2>
              <p>
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
              </p>

              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                <p>Last updated: March 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 