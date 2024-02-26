import React from "react";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='px-14 py-4'>
      {children}
    </div>
  );
}
 
export default SearchLayout;