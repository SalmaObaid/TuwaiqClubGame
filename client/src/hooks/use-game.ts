import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertGameResult } from "@shared/routes";

export function useGameResults() {
  return useQuery({
    queryKey: [api.results.list.path],
    queryFn: async () => {
      const res = await fetch(api.results.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch game results");
      return api.results.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateGameResult() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertGameResult) => {
      const res = await fetch(api.results.create.path, {
        method: api.results.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          // Handle validation error explicitly if needed
          const error = api.results.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to save score");
      }
      
      return api.results.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.results.list.path] });
    },
  });
}
