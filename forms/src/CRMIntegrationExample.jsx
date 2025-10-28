import React from 'react';
import LoanApplicationForm from './components/LoanApplicationForm';
import './CRMIntegrationExample.css';

const CRMIntegrationExample = () => {
  const handleSuccess = (result) => {
    console.log('✅ CRM Integration Success:', result);
    alert(`Application submitted successfully!\nLead ID: ${result.data.id}\nLoan Amount: R${result.data.loanAmount?.toLocaleString()}`);
  };

  const handleError = (error) => {
    console.error('❌ CRM Integration Error:', error);
    alert(`Submission failed: ${error.message}`);
  };

  return (
    <div className="crm-integration-example">
      <div className="example-header">
        <h1>Cashflow Loans - CRM Integration Demo</h1>
        <p>This form connects directly to the Cashflow CRM system</p>
        <div className="crm-info">
          <h3>🔗 CRM Connection Details:</h3>
          <p><strong>Endpoint:</strong> https://cashflow-crm.onrender.com/api/clients</p>
          <p><strong>Method:</strong> POST</p>
          <p><strong>Content-Type:</strong> application/json</p>
        </div>
      </div>

      <div className="form-section">
        <h2>Unsecured Loan Application</h2>
        <LoanApplicationForm 
          loanType="unsecured"
          initialAmount="5000"
          apiEndpoint="https://cashflow-crm.onrender.com/api/clients"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>

      <div className="form-section">
        <h2>Secured Loan Application</h2>
        <LoanApplicationForm 
          loanType="secured"
          initialAmount="10000"
          apiEndpoint="https://cashflow-crm.onrender.com/api/clients"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>

      <div className="payload-example">
        <h3>📋 Expected CRM Payload Format:</h3>
        <pre>{`{
  "id": "unique-uuid-here",
  "name": "John Doe",
  "email": "john@example.com", 
  "phone": "+27123456789",
  "idNumber": "1234567890123",
  "loanAmount": 5000,
  "loanType": "Secured Loan", // or "Unsecured Loan"
  "interestRate": 50,
  "monthlyPayment": 7500,
  "startDate": "2025-10-27",
  "dueDate": "2025-11-30",
  "status": "new-lead",
  "applicationDate": "2025-10-27T10:30:00.000Z",
  "lastStatusUpdate": "2025-10-27T10:30:00.000Z",
  "amountPaid": 0,
  "paymentHistory": [],
  "notes": [],
  "documents": []
}`}</pre>
      </div>
    </div>
  );
};

export default CRMIntegrationExample;