import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  // Utilisez useState pour gérer la valeur dans le composant
  const [value, setValue] = useState(() => {
    // Vérifiez si la clé existe dans le Local Storage
    const storedValue = localStorage.getItem(key);
    // Si la clé existe, retournez sa valeur
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    // Sinon, retournez l'initialValue
    return initialValue;
  });

  // Utilisez useEffect pour sauvegarder la valeur dans le Local Storage à chaque changement
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Retournez la valeur et une fonction pour mettre à jour la valeur
  return [value, setValue];
};

export {
  useLocalStorage
}