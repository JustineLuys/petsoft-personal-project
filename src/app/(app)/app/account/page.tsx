import SignOutBtn from "@/components/dashboard/SignOutBtn";
import ContentBlock from "@/components/layout/ContentBlock";

import { auth } from "@/lib/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    return;
  }
  return (
    <ContentBlock className="text-black h-[600px] mt-[120px] flex flex-col gap-4 items-center justify-center">
      <p className="text-lg">Logged in as {session.user.email}</p>
      <SignOutBtn />
    </ContentBlock>
  );
}
