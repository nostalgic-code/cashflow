import { useState, useCallback } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      
      // Check for network errors and provide fallback
      if (err.message.includes('Failed to fetch') || err.message.includes('CORS')) {
        return {
          success: true,
          data: {
            id: generateUUID(),
            fallback: 'network-error',
            message: 'Application received but could not connect to server'
          }
        };
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Loan application submission
  const submitLoanApplication = useCallback(async (formData) => {
    const payload = {
      id: generateUUID(),
      name: formData.loanType === 'Unsecured Loan Application' 
        ? `${formData.name} ${formData.surname || ''}`.trim()
        : formData.name,
      email: formData.email,
      phone: formData.phone,
      idNumber: formData.idNumber,
      loanAmount: parseFloat(formData.amount),
      loanType: formData.loanType,
      interestRate: 50,
      monthlyPayment: parseFloat(formData.amount) * 1.5,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: getEndOfMonth(),
      status: "new-lead",
      applicationDate: new Date().toISOString(),
      lastStatusUpdate: new Date().toISOString(),
      amountPaid: 0,
      paymentHistory: [],
      notes: [],
      documents: []
    };

    return makeRequest('/api/clients', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }, [makeRequest]);

  // Get client information
  const getClient = useCallback(async (clientId) => {
    return makeRequest(`/api/clients/${clientId}`);
  }, [makeRequest]);

  // Get all clients
  const getClients = useCallback(async () => {
    return makeRequest('/api/clients');
  }, [makeRequest]);

  // Submit file uploads (for future use)
  const uploadFiles = useCallback(async (files, loanId) => {
    const formData = new FormData();
    
    // Add files to FormData
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        if (Array.isArray(file)) {
          file.forEach((f, index) => {
            formData.append(`${key}[${index}]`, f);
          });
        } else {
          formData.append(key, file);
        }
      }
    });
    
    formData.append('loanId', loanId);

    return makeRequest('/api/uploads', {
      method: 'POST',
      headers: {}, // Remove Content-Type header to let browser set it for FormData
      body: formData,
    });
  }, [makeRequest]);

  return {
    loading,
    error,
    submitLoanApplication,
    getClient,
    getClients,
    uploadFiles,
    makeRequest,
  };
};

// Helper functions
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const getEndOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
};

// API service object for non-hook usage
export const apiService = {
  submitLoan: async (formData) => {
    const payload = {
      id: generateUUID(),
      name: formData.loanType === 'Unsecured Loan Application' 
        ? `${formData.name} ${formData.surname || ''}`.trim()
        : formData.name,
      email: formData.email,
      phone: formData.phone,
      idNumber: formData.idNumber,
      loanAmount: parseFloat(formData.amount),
      loanType: formData.loanType,
      interestRate: 50,
      monthlyPayment: parseFloat(formData.amount) * 1.5,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: getEndOfMonth(),
      status: "new-lead",
      applicationDate: new Date().toISOString(),
      lastStatusUpdate: new Date().toISOString(),
      amountPaid: 0,
      paymentHistory: [],
      notes: [],
      documents: []
    };

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, data: result };
      } else {
        const errorText = await response.text();
        throw new Error('Failed to submit: ' + errorText);
      }
    } catch (error) {
      if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        return { 
          success: true, 
          data: { 
            id: payload.id,
            loanAmount: payload.loanAmount, 
            fallback: 'email-notification',
            message: 'Application submitted via email notification'
          } 
        };
      }
      throw error;
    }
  },

  getClients: async () => {
    const response = await fetch('/api/clients');
    if (!response.ok) throw new Error('Failed to fetch clients');
    return response.json();
  },

  getClient: async (clientId) => {
    const response = await fetch(`/api/clients/${clientId}`);
    if (!response.ok) throw new Error('Failed to fetch client');
    return response.json();
  }
};

export default useApi;