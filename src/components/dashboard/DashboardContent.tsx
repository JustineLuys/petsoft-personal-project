import SearchForm from "../forms/SearchForm";
import PetList from "../pet/PetList";
import PetDetails from "../pet/PetDetails";
import ContentBlock from "../layout/ContentBlock";

export default function DashboardContent() {
  return (
    <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[720px] mt-10">
      <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
        <SearchForm />
      </div>
      <div className="md:row-start-2 relative md:row-span-full md:col-start-1 md:col-span-1">
        <ContentBlock>
          <PetList />
        </ContentBlock>
      </div>
      <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
        <ContentBlock>
          <PetDetails />
        </ContentBlock>
      </div>
    </div>
  );
}