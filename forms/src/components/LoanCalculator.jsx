import React, { useState, useEffect } from 'react';
import './LoanCalculator.css';

const LoanCalculator = ({ onCalculate, onApplyNow }) => {
  const [amount, setAmount] = useState(10000);
  const [loanType, setLoanType] = useState('unsecured');
  const [calculatedData, setCalculatedData] = useState(null);

  const interestRate = 50; // 50% interest rate
  
  useEffect(() => {
    calculateLoan();
  }, [amount, loanType]);

  const calculateLoan = () => {
    const principal = parseFloat(amount) || 0;
    const interest = principal * (interestRate / 100);
    const totalAmount = principal + interest;
    
    const result = {
      principal,
      interestRate,
      interest,
      totalAmount,
      monthlyPayment: totalAmount, // Since it's a 1-month loan
      loanType
    };
    
    setCalculatedData(result);
    
    if (onCalculate) {
      onCalculate(result);
    }
  };

  const handleApplyNow = () => {
    if (onApplyNow) {
      onApplyNow({
        amount: calculatedData.principal,
        loanType: calculatedData.loanType,
        calculatedData
      });
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="loan-calculator">
      <div className="calculator-header">
        <h2>Loan Calculator</h2>
        <p>Calculate your loan payments and apply instantly</p>
      </div>

      <div className="calculator-form">
        <div className="input-group">
          <label htmlFor="loanAmount">Loan Amount</label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">R</span>
            <input
              type="number"
              id="loanAmount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1000"
              max="100000"
              step="1000"
              className="amount-input"
            />
          </div>
          <div className="amount-slider">
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="slider"
            />
            <div className="slider-labels">
              <span>R1,000</span>
              <span>R100,000</span>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label>Loan Type</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="loanType"
                value="unsecured"
                checked={loanType === 'unsecured'}
                onChange={(e) => setLoanType(e.target.value)}
              />
              <span className="radio-label">Unsecured Loan</span>
              <span className="radio-description">No collateral required</span>
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="loanType"
                value="secured"
                checked={loanType === 'secured'}
                onChange={(e) => setLoanType(e.target.value)}
              />
              <span className="radio-label">Secured Loan</span>
              <span className="radio-description">Collateral required (e.g., phone)</span>
            </label>
          </div>
        </div>
      </div>

      {calculatedData && (
        <div className="calculation-results">
          <h3>Loan Breakdown</h3>
          
          <div className="results-grid">
            <div className="result-item">
              <span className="result-label">Loan Amount</span>
              <span className="result-value">{formatCurrency(calculatedData.principal)}</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Interest Rate</span>
              <span className="result-value">{calculatedData.interestRate}%</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Interest Amount</span>
              <span className="result-value">{formatCurrency(calculatedData.interest)}</span>
            </div>
            
            <div className="result-item highlight">
              <span className="result-label">Total Repayment</span>
              <span className="result-value">{formatCurrency(calculatedData.totalAmount)}</span>
            </div>
            
            <div className="result-item">
              <span className="result-label">Loan Term</span>
              <span className="result-value">1 Month</span>
            </div>
            
            <div className="result-item highlight">
              <span className="result-label">Monthly Payment</span>
              <span className="result-value">{formatCurrency(calculatedData.monthlyPayment)}</span>
            </div>
          </div>

          <div className="loan-terms">
            <h4>Loan Terms Summary</h4>
            <ul>
              <li>Fixed term: 1 month from disbursement</li>
              <li>Interest rate: {calculatedData.interestRate}% flat rate</li>
              <li>Repayment: Full amount due at end of term</li>
              <li>Early payment: Allowed without penalty</li>
              {loanType === 'secured' && (
                <li>Collateral: Required (e.g., mobile phone, electronics)</li>
              )}
              {loanType === 'unsecured' && (
                <li>Documents: Payslip, ID, bank statements required</li>
              )}
            </ul>
          </div>

          <div className="calculator-actions">
            <button 
              className="apply-now-btn"
              onClick={handleApplyNow}
            >
              Apply for {formatCurrency(calculatedData.principal)} Loan
            </button>
            
            <div className="contact-info">
              <p>Questions? Call us at <strong>+27 614 011 426</strong></p>
              <p>Or email: <strong>info@cashflowloans.co.za</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;