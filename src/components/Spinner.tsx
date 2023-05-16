export default function Spinner() {
  return (
    // <div className="">
    //   <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
    //     <circle className="path" cx="12" cy="12" r="10" fill="none" strokeWidth="5"></circle>
    //   </svg>
    //   Processing...
    // </div>
    <button className="bg-[#bfbfc0] rounded-md p-3 w-full">
      <div className="">Processing...</div>
    </button>
  );
}
