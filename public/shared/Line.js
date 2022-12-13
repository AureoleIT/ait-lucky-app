export default function Line({
  content, // nội dung được hiển thị trên Line
  primaryColor = "#003B93", // màu bên trái
  secondaryColor = "#00F0FF", // màu bên phải
  lineWeight = true, // mặc đinh line dày 2px, nếu false thì dày 1px
}) {
  const gradientCSS = `bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}]`;

  return (
    <div
      className={`w-full ${
        lineWeight ? "h-[2px]" : "h-[1px]"
      } z-10 my-4 ${gradientCSS} relative flex justify-center`}
    >
      <p
        className={`absolute top-[-50%] transform translate-y-[-50%] font-extrabol bg-white ${
          !content && "hidden"
        }`}
      >
        <span
          className={`mx-2 text-transparent text-xl bg-clip-text font-semibold ${gradientCSS}`}
        >
          {content}
        </span>
      </p>
    </div>
  );
}
