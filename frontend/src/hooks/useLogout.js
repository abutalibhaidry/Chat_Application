import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const useLogout = (options = {}) => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] }); // ✅ authUser query invalidate karo
      if (options.onSuccess) options.onSuccess(); // ✅ redirect call karo
    },
  });

  return { logoutMutation, isPending, error };
};

export default useLogout;
