export const PATHS = {
  root: "/",
  auth: "/auth",
  customer: "/customer",
  customerPost: "/customer/post/:postId",
  merchant: "/merchant",
  dashboard: "/dashboard",
} as const;

export type PathValue = (typeof PATHS)[keyof typeof PATHS];