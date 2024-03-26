import { useCallback, useEffect, useState } from "react";

type Func<T> = (...args: any[]) => Promise<T>;

type AsyncState<T> = {
  loading: boolean;
  error?: string | undefined;
  value?: T;
  execute: (...args: any[]) => Promise<T>;
};

type UseAsyncState<T> = Omit<AsyncState<T>, "execute">;

export function useAsync<T>(
  func: Func<T>,
  dependencies: any[] = []
): UseAsyncState<T> {
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
): AsyncState<T> {
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<T>();

  const execute = useCallback(async (...params: any[]) => {
    setLoading(true);
    try {
      const data = await func(...params);
      setValue(data);
      setError(undefined);
      return data;
    } catch (error) {
      setValue(undefined);
      if (typeof error === "string") setError(error);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  return { loading, error, value, execute };
}
