import { useContext } from "react";

export function useContextWithNullCheck<T>(context: React.Context<T | null>): T {
  const result = useContext(context);
  if (!!result) {
    return result;
  } else {
    throw Error(`Null context at runtime`);
  }
}

export default useContextWithNullCheck;
