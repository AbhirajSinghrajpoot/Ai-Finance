import { checkuser } from "@/lib/checkUser";

export default async function InitializeUser() {
  await checkuser();
  return null;
}
