# React Loan Application Forms

This React application provides reusable form components for the Cashflow Loans website. The components are designed to integrate seamlessly with your existing API endpoints.

## Components

### 1. LoanApplicationForm
A comprehensive form component for loan applications that supports both secured and unsecured loans.

**Props:**
- `loanType`: 'secured' or 'unsecured' (default: 'unsecured')
- `initialAmount`: Pre-populate loan amount
- `apiEndpoint`: API endpoint for form submission (default: '/api/clients')
- `onSuccess`: Callback function when submission succeeds
- `onError`: Callback function when submission fails

**Usage:**
```jsx
import LoanApplicationForm from './components/LoanApplicationForm';

function MyPage() {
  const handleSuccess = (result) => {
    console.log('Application submitted:', result);
  };

  return (
    <LoanApplicationForm 
      loanType="unsecured"
      initialAmount="10000"
      onSuccess={handleSuccess}
    />
  );
}
```

### 2. LoanCalculator
An interactive loan calculator with slider controls and instant calculations.

**Props:**
- `onCalculate`: Callback when calculation updates
- `onApplyNow`: Callback when user clicks apply button

**Usage:**
```jsx
import LoanCalculator from './components/LoanCalculator';

function CalculatorPage() {
  const handleApplyNow = (data) => {
    console.log('Apply for loan:', data);
    // Navigate to application form
  };

  return (
    <LoanCalculator onApplyNow={handleApplyNow} />
  );
}
```

### 3. API Integration Hook
A custom hook for easy API integration.

**Usage:**
```jsx
import { useApi } from './hooks/useApi';

function MyComponent() {
  const { loading, error, submitLoanApplication } = useApi();

  const handleSubmit = async (formData) => {
    const result = await submitLoanApplication(formData);
    if (result.success) {
      console.log('Success:', result.data);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Your form here */}
    </div>
  );
}
```

## Features

### Form Features
- ✅ Responsive design
- ✅ Form validation
- ✅ File upload support
- ✅ Terms and conditions with scroll-to-accept
- ✅ API integration with fallback handling
- ✅ Loading states and error messages
- ✅ Success notifications

### Calculator Features
- ✅ Interactive amount slider
- ✅ Real-time calculations
- ✅ Loan type selection
- ✅ Formatted currency display
- ✅ Loan terms breakdown
- ✅ Direct application integration

### API Integration
- ✅ RESTful API calls
- ✅ Error handling with fallbacks
- ✅ CORS error handling
- ✅ Network error recovery
- ✅ Loading states
- ✅ TypeScript-ready structure

## Installation & Setup

1. **Install Dependencies** (already done):
```bash
npm install
```

2. **Start Development Server**:
```bash
npm run dev
```

3. **Build for Production**:
```bash
npm run build
```

## Integration with Existing Website

### Option 1: Embed in Existing HTML
Build the React app and embed the components in your existing HTML pages.

### Option 2: API Endpoints
The components work with your existing Flask API endpoints:

- `POST /api/clients` - Submit loan application
- `GET /api/clients` - Get all applications
- `GET /api/clients/:id` - Get specific application

### Option 3: URL Parameters
The components support URL parameters for seamless integration.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

The components are now ready to use and can be easily integrated into your existing Cashflow Loans website!

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
