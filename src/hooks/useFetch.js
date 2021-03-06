import { useEffect, useRef, useReducer, useCallback } from 'react';

const IDLE = 'IDLE';
const FETCHING = 'FETCHING';
const FETCHED = 'FETCHED';
const FETCH_ERROR = 'FETCH_ERROR';

const initialState = {
  status: IDLE,
  error: null,
  data: [],
};

export const networkStatus = { FETCHING, FETCHED, FETCH_ERROR, IDLE };

const fetchReducer = (state, { type, payload }) => {
  switch (type) {
    case FETCHING:
      return { ...initialState, status: FETCHING };
    case FETCHED:
      return { ...initialState, status: FETCHED, data: payload };
    case FETCH_ERROR:
      return { ...initialState, status: FETCH_ERROR, error: payload };
    default:
      return state;
  }
};

export const useFetch = (url, manual = false) => {
  const cache = useRef({});

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = useCallback(
    async (currentUrl = url, cancelRequest) => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[currentUrl]) {
        const data = cache.current[currentUrl];
        dispatch({ type: FETCHED, payload: data });
      } else {
        try {
          const response = await fetch(currentUrl);
          const data = await response.json();
          cache.current[currentUrl] = data;
          if (cancelRequest) {
            return;
          }
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          if (cancelRequest) {
            return;
          }
          dispatch({ type: FETCH_ERROR, payload: error.message });
        }
      }
    },
    [url],
  );

  useEffect(() => {
    let cancelRequest = false;
    if (!url) {
      return;
    }

    if (!manual) {
      fetchData(url, cancelRequest);
    }

    return () => {
      cancelRequest = true;
    };
  }, [url, fetchData, manual]);

  return { ...state, fetch: fetchData };
};
