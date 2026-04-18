export type FollowerPackage = {
  id: "followers-1k" | "followers-5k" | "followers-10k";
  name: string;
  amountInr: number;
  displayPrice: string;
  delivery: string;
  popular?: boolean;
};

export const followerPackages: FollowerPackage[] = [
  {
    id: "followers-1k",
    name: "1k Followers",
    amountInr: 1999,
    displayPrice: "INR 1,999",
    delivery: "3-5 days",
  },
  {
    id: "followers-5k",
    name: "5k Followers",
    amountInr: 8499,
    displayPrice: "INR 8,499",
    delivery: "7-10 days",
    popular: true,
  },
  {
    id: "followers-10k",
    name: "10k Followers",
    amountInr: 14999,
    displayPrice: "INR 14,999",
    delivery: "12-15 days",
  },
];

export function getFollowerPackageById(id: string) {
  return followerPackages.find((item) => item.id === id);
}
