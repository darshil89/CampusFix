import ClientUserPage from "./user";
import Search from "../../../components/SearchCoins";
export default function AllUsers() {
  return (
    <>
      <div className="flex justify-between mt-8 ml-4 mb-4 flex-row">
        <div className="text-4xl  text-gray-700 font-semibold">
          All User&apos;s <span className="text-blue-500">Page</span>
        </div>
        <Search />
      </div>
      <ClientUserPage />
    </>
  );
}
