import SearchForm from "../forms/SearchForm";
import PetList from "../pet/PetList";
import PetDetails from "../pet/PetDetails";
import ContentBlock from "../layout/ContentBlock";

export default function DashboardContent() {
  return (
    <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] transition gap-10 mb-[70px] border border-black md:mb-10 lg:gap-4 h-[1410px] md:h-[800px] mt-8">
      <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
        <SearchForm />
      </div>
      <div className="md:row-start-2 relative md:row-span-full h-[500px] transition md:h-[84%] md:col-start-1 md:col-span-1">
        <ContentBlock className="overflow-scroll shadow-xl hidden-scrollbar">
          <PetList />
        </ContentBlock>
      </div>
      <div className="md:row-start-1 md:row-span-full md:col-start-2 transition md:col-span-full md:h-[85%] mt-[220px] md:mt-0 ">
        <ContentBlock className="h-[48rem] md:h-full shadow-xl">
          <PetDetails />
        </ContentBlock>
      </div>
    </div>
  );
}
