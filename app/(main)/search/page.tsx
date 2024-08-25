import FormInput from "@/components/form-input"
import SearchForm from "@/components/search-form";
import { getTweetIncludeKeyword } from "./actions";
import Tweet from "@/components/tweet";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const keyword = searchParams.keyword;

  const tweets = await getTweetIncludeKeyword(keyword);

  return (
    <div className="flex flex-col gap-3">
      <SearchForm keyword={keyword} />

      <h2 className="text-xl font-semibold">
        Search result of &apos;{keyword}&apos;
      </h2>

      <ul className="flex flex-col gap-2 mt-4">
        {
          tweets && tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))
        }
      </ul>
    </div>
  );
}