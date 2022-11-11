import { useMutation, useSubscription } from "@apollo/client";

export const SubscriptionDatas = (query) => {
  const { data, loading, error } = useSubscription(query);
  return { data, loading, error };
};
export const MutationDatas = (query) => {
  const [actions, { loading }] = useMutation(query);
  return { actions, loading };
};
