import { useState, useEffect } from 'react';

/**
 * Um hook customizado que adia a atualização de um valor (debounce).
 * Útil para campos de busca, para evitar chamadas de API a cada tecla.
 * @param value O valor que você quer "atrasar" (ex: o termo da busca).
 * @param delay O tempo em milissegundos para esperar antes de atualizar.
 * @returns O valor "atrasado".
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
