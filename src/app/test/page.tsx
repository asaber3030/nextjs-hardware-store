"use client";

const TestPage = () => {

  return (
    <div className="container grid grid-cols-12 gap-1 my-4">
      <div className="bg-blue-200 rounded-md h-12" />
      <div className="bg-blue-200 rounded-md h-12" />
      <div className="bg-blue-200 rounded-md h-12 col-span-8 col-start-4" />
      <div className="bg-blue-200 rounded-md h-12" />
    </div>
  );
}
 
export default TestPage;