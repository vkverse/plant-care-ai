export type AppUser = {
  id: string;
  name: string;
  email: string;
  demo: boolean;
};
export type StorageMode = "postgres" | "demo-local";

export const demoUsers: readonly AppUser[] = [
  { id: "demo-alex", name: "Alex", email: "alex@example.test", demo: true },
  { id: "demo-sam", name: "Sam", email: "sam@example.test", demo: true },
];
