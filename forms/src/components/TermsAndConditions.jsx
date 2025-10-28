import React, { useState } from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = ({ onAccept, onDecline }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="terms-and-conditions">
      <div className="terms-header">
        <h4>Terms and Conditions for Cashflow Loans</h4>
        <p className="effective-date"><em>Effective Date: August 11, 2025</em></p>
        <button 
          type="button"
          className="expand-terms-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse Terms' : 'Read Full Terms & Conditions'}
        </button>
      </div>

      {isExpanded && (
        <div className="terms-content">
          <div className="terms-introduction">
            <p>By applying for or obtaining a loan from Cashflow Loans ("we," "us," or "our"), you ("the Borrower" or "you") agree to be bound by the following Terms and Conditions ("Terms"). Please read these Terms carefully before entering into any loan agreement with us. If you do not agree with these Terms, you should not apply for or accept a loan from Cashflow Loans.</p>
          </div>

          <div className="terms-section">
            <h4>1. Loan Terms</h4>
            <div className="subsection">
              <h5>1.1 Loan Duration:</h5>
              <p>All loans provided by Cashflow Loans are for a fixed term of one (1) month from the date of disbursement, unless otherwise specified in the loan agreement.</p>
            </div>
            
            <div className="subsection">
              <h5>1.2 Repayment Obligation:</h5>
              <p>The Borrower is required to repay the full loan amount, including any applicable interest and fees, by the due date specified in the loan agreement.</p>
            </div>
          </div>

          <div className="terms-section">
            <h4>2. Consequences of Non-Payment</h4>
            <div className="subsection">
              <h5>2.1 Unsecured Loans:</h5>
              <p>In the event of non-payment by the due date, Cashflow Loans reserves the right to take any and all actions to recover the outstanding amount, including but not limited to:</p>
              <ul>
                <li>Blacklisting the Borrower with credit bureaus or other relevant authorities.</li>
                <li>Repossessing assets owned by the Borrower with a value equivalent to the outstanding loan amount, in accordance with applicable laws.</li>
              </ul>
            </div>
            
            <div className="subsection">
              <h5>2.2 Secured Loans:</h5>
              <p>For loans secured by collateral, failure to repay the loan by the due date will result in Cashflow Loans taking possession of and selling the collateral to recover the outstanding loan amount, including any associated costs, fees, or interest. The Borrower will be responsible for any shortfall if the sale of the collateral does not fully cover the outstanding amount.</p>
            </div>
            
            <div className="subsection">
              <h5>2.3 Additional Recovery Measures:</h5>
              <p>Cashflow Loans reserves the right to pursue all legal remedies available to recover the owed amount, including but not limited to legal action, debt collection services, and reporting to credit bureaus.</p>
            </div>
          </div>

          <div className="terms-section">
            <h4>3. Borrower Responsibilities</h4>
            <div className="subsection">
              <h5>3.1 Accuracy of Information:</h5>
              <p>The Borrower is responsible for providing accurate and complete information, including banking details, at the time of loan application. Cashflow Loans will not be liable for any loss of income, funds, or other financial consequences resulting from incorrect or incomplete banking details provided by the Borrower.</p>
            </div>
            
            <div className="subsection">
              <h5>3.2 Timely Repayment:</h5>
              <p>The Borrower agrees to ensure that sufficient funds are available in the designated repayment account to cover the loan repayment on the due date.</p>
            </div>
          </div>

          <div className="terms-section">
            <h4>4. Liability</h4>
            <div className="subsection">
              <h5>4.1 Non-Liability for Incorrect Banking Details:</h5>
              <p>Cashflow Loans shall not be responsible or liable for any loss, delay, or financial harm caused by the Borrower providing incorrect or incomplete banking details.</p>
            </div>
            
            <div className="subsection">
              <h5>4.2 Collateral Sale:</h5>
              <p>For secured loans, the Borrower acknowledges that Cashflow Loans is not liable for any loss in value or other consequences arising from the sale of collateral to recover the outstanding loan amount.</p>
            </div>
          </div>

          <div className="terms-section">
            <h4>5. General Provisions</h4>
            <div className="general-provisions">
              <p><strong>5.1 Compliance with Laws:</strong> All actions taken by Cashflow Loans to recover outstanding amounts will be conducted in accordance with applicable local, state, and federal laws.</p>
              <p><strong>5.2 Amendments:</strong> Cashflow Loans reserves the right to amend these Terms at any time. Any changes will be communicated to Borrowers in writing or through our website and will take effect upon the specified date.</p>
              <p><strong>5.3 Governing Law:</strong> These Terms and any loan agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which Cashflow Loans operates.</p>
              <p><strong>5.4 Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>
              <p><strong>5.5 Entire Agreement:</strong> These Terms, together with the loan agreement, constitute the entire agreement between the Borrower and Cashflow Loans and supersede any prior agreements or understandings.</p>
            </div>
          </div>

          <div className="terms-section">
            <h4>6. Contact Information</h4>
            <p>For any questions or concerns regarding these Terms or your loan, please contact Cashflow Loans at:</p>
            <div className="contact-info">
              <p>📞 <strong>Phone:</strong> 0614011426</p>
              <p>📧 <strong>Email:</strong> info@cashflowloans.co.za</p>
              <p>🌐 <strong>Website:</strong> www.cashflowloans.co.za</p>
            </div>
          </div>

          <div className="terms-footer">
            <div className="acknowledgment">
              <p><strong>By applying for or accepting a loan from Cashflow Loans, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong></p>
            </div>
            
            <div className="company-signature">
              <p><strong>Cashflow Loans</strong><br />
              Effective as of August 11, 2025.</p>
            </div>
          </div>

          {(onAccept || onDecline) && (
            <div className="terms-actions">
              {onDecline && (
                <button 
                  type="button" 
                  className="terms-decline-btn"
                  onClick={onDecline}
                >
                  I Do Not Agree
                </button>
              )}
              {onAccept && (
                <button 
                  type="button" 
                  className="terms-accept-btn"
                  onClick={onAccept}
                >
                  I Accept These Terms
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TermsAndConditions;