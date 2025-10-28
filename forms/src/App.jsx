import { useState } from 'react'
import Navbar from './components/Navbar'
import LoanApplicationForm from './components/LoanApplicationForm'
import LoanCalculator from './components/LoanCalculator'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('application')
  const [loanData, setLoanData] = useState({
    amount: '',
    loanType: 'unsecured'
  })

  const handleCalculatorResult = (calculatedData) => {
    setLoanData({
      amount: calculatedData.principal,
      loanType: calculatedData.loanType
    })
  }

  const handleApplyNow = (data) => {
    setLoanData({
      amount: data.amount,
      loanType: data.loanType
    })
    setCurrentView('application')
  }

  const handleApplicationSuccess = (result) => {
    console.log('Application submitted successfully:', result)
    // You can add success handling here (redirect, show success page, etc.)
  }

  const handleApplicationError = (error) => {
    console.error('Application submission failed:', error)
    // You can add error handling here
  }

  return (
    <div className="app">
      <Navbar />
      
      <div className="page-content">
        <div className="container" style={{ padding: '40px 20px' }}>
          <div className="view-selector" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px', color: '#1b4d3e' }}>Choose Your Service</h2>
            <nav className="app-nav">
              <button 
                className={`nav-btn ${currentView === 'calculator' ? 'active' : ''}`}
                onClick={() => setCurrentView('calculator')}
              >
                Loan Calculator
              </button>
              <button 
                className={`nav-btn ${currentView === 'application' ? 'active' : ''}`}
                onClick={() => setCurrentView('application')}
              >
                Apply for Loan
              </button>
            </nav>
          </div>
        </div>
      </div>

      <main className="app-main">
        <div className="container">
          {currentView === 'calculator' && (
            <LoanCalculator 
              onCalculate={handleCalculatorResult}
              onApplyNow={handleApplyNow}
            />
          )}
          
          {currentView === 'application' && (
            <div className="application-section">
              <div className="loan-type-selector">
                <h3>Choose Loan Type</h3>
                <div className="loan-type-buttons">
                  <button 
                    className={`loan-type-btn ${loanData.loanType === 'unsecured' ? 'active' : ''}`}
                    onClick={() => setLoanData(prev => ({ ...prev, loanType: 'unsecured' }))}
                  >
                    Unsecured Loan
                  </button>
                  <button 
                    className={`loan-type-btn ${loanData.loanType === 'secured' ? 'active' : ''}`}
                    onClick={() => setLoanData(prev => ({ ...prev, loanType: 'secured' }))}
                  >
                    Secured Loan
                  </button>
                </div>
              </div>
              
              <LoanApplicationForm 
                key={`${loanData.loanType}-${loanData.amount}`}
                loanType={loanData.loanType}
                initialAmount={loanData.amount}
                apiEndpoint="https://cashflow-crm.onrender.com/api/clients"
                onSuccess={handleApplicationSuccess}
                onError={handleApplicationError}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
