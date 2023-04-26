import { useState } from "react";
import axios from "axios";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: false }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch((error) => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  //   function mutation(data: any) {
  //     setState((prev) => ({ ...prev, loading: false }));
  //     axios
  //       .post(url, { data })
  //       .then((res) => res)
  //       .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
  //       .catch((error) => setState((prev) => ({ ...prev, error })));
  //   }

  return [mutation, { ...state }];
}
