import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

export function useThunk(thunk: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const runThunk = useCallback(
    (arg?: any) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .then((data: any) => {
          setError(null);
          return data;
        })
        .catch((err: any) => {
          setError(err);
          return err;
        })
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error] as const;
}
