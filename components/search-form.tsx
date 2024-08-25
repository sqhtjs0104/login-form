"use client";

import { useFormState } from "react-dom";
import FormInput from "./form-input";
import { redirect } from "next/navigation";

export default function SearchForm({
  keyword,
}: {
  keyword?: string;
}) {
  const onSearch = (prevState: any, formData: FormData) => {
    const keyword = formData.get("keyword");
    redirect(`/search?keyword=${keyword}`);
  }
  const [state, action] = useFormState(onSearch, null);

  return (
    <form action={action}>
      <FormInput defaultValue={keyword} name="keyword" placeholder="Search tweet" />
    </form>
  );
}