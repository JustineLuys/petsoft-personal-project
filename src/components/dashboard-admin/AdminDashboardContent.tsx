import ContentBlock from "../layout/ContentBlock";
import UsersDataList from "../users/UsersDataList";

export default function AdminDashboardContent() {
  return (
    <section className="h-[44rem] w-[78%] text-black space-y-8">
      <div>User</div>
      <ContentBlock className="pt-4">
        <UsersDataList />
      </ContentBlock>
    </section>
  );
}
