import router, { useRouter } from "next/router";
import messEn from "../message/messEn" ;
import messVi from "../message/messVi";

const TransMess = () => {
  const { locale } = router;
  console.log(locale);
  const TransMess = locale === "en" ? messEn : messVi;
  return TransMess;
};

export default TransMess;
