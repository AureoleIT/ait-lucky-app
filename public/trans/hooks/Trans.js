import { useRouter } from "next/router";
import vi from "../lang/vi";
import en from "../lang/en";

const Trans = () => {
  const { locale } = useRouter();

  const trans = locale === "en" ? en : vi;

  return trans;
};

export default Trans;
