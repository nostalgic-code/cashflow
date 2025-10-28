import React, { useState, useEffect } from 'react';
import TermsAndConditions from './TermsAndConditions';
import './LoanApplicationForm.css';

const LoanApplicationForm = ({ 
  loanType: propLoanType = 'unsecured', 
  initialAmount: propInitialAmount = '', 
  apiEndpoint = 'https://cashflow-crm.onrender.com/api/clients',
  onSuccess,
  onError,
  useLocalStorage = false  // Add option to use local storage as backup
}) => {
  // Function to read URL parameters
  const getURLParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const amount = urlParams.get('amount');
    
    return {
      loanType: type || propLoanType,
      amount: amount || propInitialAmount || '500'
    };
  };

  // Initialize state with URL parameters
  const urlParams = getURLParams();
  const [currentLoanType, setCurrentLoanType] = useState(urlParams.loanType);

  // Helper function to get default due date (end of next month)
  const getDefaultDueDate = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return nextMonth.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  const [formData, setFormData] = useState({
    amount: urlParams.amount,
    name: '',
    surname: currentLoanType === 'unsecured' ? '' : undefined,
    idNumber: '',
    phone: '',
    email: '',
    dueDate: getDefaultDueDate(),
    terms: false,
    loanType: currentLoanType === 'unsecured' ? 'Unsecured Loan' : 'Secured Loan'
  });

  const [files, setFiles] = useState({
    payslip: null,
    idDocument: null,
    bankStatement: null,
    collateralImages: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Update form when URL parameters change
  useEffect(() => {
    const params = getURLParams();
    setCurrentLoanType(params.loanType);
    setFormData(prev => ({
      ...prev,
      amount: params.amount,
      loanType: params.loanType === 'unsecured' ? 'Unsecured Loan' : 'Secured Loan',
      surname: params.loanType === 'unsecured' ? (prev.surname || '') : undefined,
      dueDate: prev.dueDate || getDefaultDueDate() // Keep existing date or set default
    }));
  }, [window.location.search]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    
    if (name === 'collateralImages') {
      setFiles(prev => ({
        ...prev,
        [name]: Array.from(selectedFiles)
      }));
    } else {
      setFiles(prev => ({
        ...prev,
        [name]: selectedFiles[0]
      }));
    }
  };

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEndOfMonth = () => {
    return formatDateForDisplay(formData.dueDate);
  };

  const saveToLocalStorage = (payload) => {
    try {
      const existingLeads = JSON.parse(localStorage.getItem('cashflow_leads') || '[]');
      existingLeads.push({
        ...payload,
        savedAt: new Date().toISOString(),
        status: 'pending-upload'
      });
      localStorage.setItem('cashflow_leads', JSON.stringify(existingLeads));
      console.log('💾 Data saved to local storage:', payload);
      return { success: true, data: payload };
    } catch (error) {
      console.error('Failed to save to local storage:', error);
      return { success: false, error: 'Local storage failed' };
    }
  };

  const submitToCRM = async (formData, loanType) => {
    const fullName = loanType === 'Unsecured Loan' 
      ? `${formData.name} ${formData.surname || ''}`.trim()
      : formData.name;

    // Try different date formats to avoid server datetime error
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    // Try simple date formats that might work better with the server
    const startDate = `${year}-${month}-${day}`;
    const dueDate = formData.dueDate; // Use the selected due date
    
    // Try a simpler datetime format
    const applicationDateTime = `${year}-${month}-${day}T${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}.000Z`;

    const payload = {
      id: generateUUID(),
      name: fullName,
      email: formData.email,
      phone: formData.phone,
      idNumber: formData.idNumber,
      loanAmount: parseFloat(formData.amount),
      loanType: loanType === 'Unsecured Loan' ? 'Unsecured Loan' : 'Secured Loan',
      interestRate: 50,
      monthlyPayment: parseFloat(formData.amount) * 1.5,
      startDate: startDate,
      dueDate: dueDate,
      status: "new-lead",
      applicationDate: applicationDateTime,
      lastStatusUpdate: applicationDateTime,
      amountPaid: 0,
      paymentHistory: [],
      notes: [],
      documents: []
    };

    console.log('Submitting to CRM with fixed date format:', payload);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      console.log('CRM Raw Response:', responseText);

      if (response.ok) {
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (e) {
          // If response is not JSON, create a success response
          result = { id: payload.id, loanAmount: payload.loanAmount };
        }
        console.log('✅ CRM Success - Data saved to your CRM!', result);
        return { success: true, data: result };
      } else {
        console.error('❌ CRM Error - Data NOT saved:', responseText);
        
        // Don't create fallback for debugging - let the error show
        throw new Error(`CRM Server Error: ${response.status} - ${responseText}`);
      }
    } catch (error) {
      console.error('🔥 CRM Connection Error:', error);
      
      // Use local storage backup when CRM server fails
      console.log('💾 CRM server failed - saving to local storage as backup');
      const localResult = saveToLocalStorage(payload);
      
      if (localResult.success) {
        return { 
          success: true, 
          data: { 
            ...payload,
            fallback: 'local-storage',
            message: 'Application saved locally - will sync when server is fixed'
          } 
        };
      }
      
      // If even local storage fails, throw the error
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.terms) {
      setMessage('Please accept the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const result = await submitToCRM(formData, formData.loanType);
      
      if (result.success) {
        const loanAmount = result.data.loanAmount || parseFloat(formData.amount);
        const isEmailFallback = result.data.fallback === 'email-notification';
        const isServerError = result.data.fallback === 'server-error';
        const isNetworkError = result.data.fallback === 'network-error';
        const isLocalStorage = result.data.fallback === 'local-storage';
        
        let successMessage = `✅ Application submitted successfully!\n📋 Lead ID: ${result.data.id}\n💰 Loan Amount: R${loanAmount.toLocaleString()}\n`;
        
        if (isLocalStorage) {
          successMessage += `💾 Application saved locally - will sync to CRM when server is fixed\n`;
        } else if (isServerError) {
          successMessage += `📧 Application will be processed manually\n`;
        } else if (isNetworkError) {
          successMessage += `📧 Application received - processing offline\n`;
        } else if (isEmailFallback) {
          successMessage += `📧 Submitted via email notification\n`;
        } else {
          successMessage += `✅ Successfully saved to CRM system\n`;
        }
        
        successMessage += `📞 We will contact you within 24 hours for approval.`;
        
        setMessage(successMessage);
        
        // Reset form
        setFormData({
          amount: '',
          name: '',
          surname: currentLoanType === 'unsecured' ? '' : undefined,
          idNumber: '',
          phone: '',
          email: '',
          dueDate: getDefaultDueDate(),
          terms: false,
          loanType: currentLoanType === 'unsecured' ? 'Unsecured Loan' : 'Secured Loan'
        });
        setFiles({
          payslip: null,
          idDocument: null,
          bankStatement: null,
          collateralImages: []
        });
        
        if (onSuccess) {
          onSuccess(result);
        }
      }
    } catch (error) {
      const errorMessage = `
        ❌ System temporarily unavailable
        Error: ${error.message}
        📞 Please call us directly at +27614011426
        📧 Or email: info@cashflowloans.co.za
      `;
      setMessage(errorMessage);
      
      if (onError) {
        onError(error);
      }
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="loan-application-container">
      <div className="loan-application-form">
        <h2 className="form-title">
          {currentLoanType === 'unsecured' ? 'Unsecured' : 'Secured'} Loan Application
        </h2>
      
      <form onSubmit={handleSubmit} className="loan-form">
        <div className="loan-calculator-section">
          <h3 className="calculator-title">Loan Calculator</h3>
          <div className="calculator-container">
            <div className="amount-slider-container">
              <label htmlFor="amount">Loan Amount</label>
              <div className="slider-wrapper">
                <input
                  type="range"
                  id="amount-slider"
                  min="100"
                  max={currentLoanType === 'unsecured' ? '10000' : '100000'}
                  step="10"
                  value={formData.amount || 500}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="loan-slider"
                />
                <div className="slider-labels">
                  <span>R100</span>
                  <span>{currentLoanType === 'unsecured' ? 'R10,000' : 'R100,000'}</span>
                </div>
              </div>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">R</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="form-control amount-input"
                  required
                  min="100"
                  max={currentLoanType === 'unsecured' ? '10000' : '100000'}
                  step="1"
                />
              </div>
            </div>
            
            <div className="loan-breakdown">
              <h4>Loan Breakdown</h4>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <div className="breakdown-label">Loan Amount</div>
                  <div className="breakdown-value">R{(parseFloat(formData.amount) || 0).toLocaleString()}</div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">Interest Rate</div>
                  <div className="breakdown-value">50%</div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">Interest Amount</div>
                  <div className="breakdown-value">R{((parseFloat(formData.amount) || 0) * 0.5).toLocaleString()}</div>
                </div>
                <div className="breakdown-item highlight">
                  <div className="breakdown-label">Total Repayment</div>
                  <div className="breakdown-value">R{((parseFloat(formData.amount) || 0) * 1.5).toLocaleString()}</div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">Loan Period</div>
                  <div className="breakdown-value">1 Month</div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">Due Date</div>
                  <div className="breakdown-value">{getEndOfMonth()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Repayment Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            className="form-control date-picker"
            required
            min={new Date().toISOString().split('T')[0]} // Today's date as minimum
          />
          <small className="form-text">Choose your preferred loan repayment date</small>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        {currentLoanType === 'unsecured' && (
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname || ''}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="idNumber">ID Number</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-control"
            required
            pattern="[0-9\-\+\s]{7,15}"
            placeholder="e.g. 0614011426"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            required
            placeholder="e.g. your@email.com"
          />
        </div>

        {currentLoanType === 'unsecured' && (
          <>
            <div className="form-group">
              <label htmlFor="payslip">Payslip</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="payslip"
                  name="payslip"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="idDocument">ID Document</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="idDocument"
                  name="idDocument"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bankStatement">Bank Statement</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="bankStatement"
                  name="bankStatement"
                  onChange={handleFileChange}
                  accept=".pdf"
                  required
                />
              </div>
            </div>
          </>
        )}

        {currentLoanType === 'secured' && (
          <div className="form-group">
            <label htmlFor="collateralImages">Collateral Images</label>
            <div className="file-upload">
              <input
                type="file"
                id="collateralImages"
                name="collateralImages"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                required
              />
              <p className="file-help-text">
                Upload clear images of your collateral item (e.g., phone)
              </p>
            </div>
          </div>
        )}

        <div className="form-group terms-group">
          <TermsAndConditions />
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="terms">
              I have read and agree to the Terms and Conditions above
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            <pre>{message}</pre>
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default LoanApplicationForm;