export type FollowerPackage = {
  id: "connections-50" | "connections-100" | "connections-500" | "connections-1000" | "connections-2500" | "connections-5000";
  name: string;
  amountInr: number;
  displayPrice: string;
  delivery: string;
  popular?: boolean;
};

export const followerPackages: FollowerPackage[] = [
  {
    id: "connections-50",
    name: "50 Connections",
    amountInr: 200,
    displayPrice: "$2",
    delivery: "24-48 hour",
  },
  {
    id: "connections-100",
    name: "100 Connections",
    amountInr: 300,
    displayPrice: "$3",
    delivery: "24-48 hour",
  },
  {
    id: "connections-500",
    name: "500 Connections",
    amountInr: 1000,
    displayPrice: "$10",
    delivery: "1-2 days",
  },
  {
    id: "connections-1000",
    name: "1000 Connections",
    amountInr: 1800,
    displayPrice: "$18",
    delivery: "10-20hr priority",
  },
  {
    id: "connections-2500",
    name: "2500 Connections",
    amountInr: 3500,
    displayPrice: "$35",
    delivery: "Same-day",
    popular: true,
  },
  {
    id: "connections-5000",
    name: "5000 Connections",
    amountInr: 5500,
    displayPrice: "$55",
    delivery: "Same-day priority",
  },
];

export function getFollowerPackageById(id: string) {
  return followerPackages.find((item) => item.id === id);
}
