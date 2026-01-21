import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useEBucks = () => {
  const { user, isAuthenticated } = useAuth();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setBalance(0);
      setIsLoading(false);
      return;
    }

    fetchBalance();
  }, [isAuthenticated, user]);

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/ebucks?email=${encodeURIComponent(user.email)}`);
      const data = await response.json();
      
      if (data.success) {
        setBalance(data.balance || 0);
      }
    } catch (error) {
      console.error('Failed to fetch E-BUCKS balance:', error);
      setBalance(0);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  return { balance, isLoading, updateBalance, refreshBalance: fetchBalance }; 
};