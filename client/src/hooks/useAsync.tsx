import { useCallback, useEffect, useState } from "react";

type Func<T> = (...args: any[]) => Promise<T>;

interface AsyncState<T> {
  loading: boolean;
  error?: boolean;
  value?: T;
}

export function useAsync<T>(
  func: Func<T>,
  dependencies: any[] = []
): AsyncState<T> {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
}

export function useAsyncFn<T>(
  func: Func<T>,
  dependencies: any[] = []
): AsyncState<T> {
  return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal<T>(
  func: Func<T>,
  dependencies: any[],
  initialLoading: boolean = false
): {
  execute: (...args: any[]) => void;
} & AsyncState<T> {
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<boolean>();
  const [value, setValue] = useState<T>();

  const execute = useCallback((...params: any[]) => {
    setLoading(true);
    return func(...params)
      .then((data: T) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((error) => {
        setValue(undefined);
        setError(error);
        return Promise.reject(error);
      })
      .finally(() => setLoading(false));
  }, dependencies);

  return { loading, error, value, execute };
}
