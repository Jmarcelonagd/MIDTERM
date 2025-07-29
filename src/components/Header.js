/*export default function Header() {
    return (
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        Country Info Explorer
      </header>
    );
  }*/

    import React from "react";

    function Header() {
      return (
        <header className="p-4 bg-blue-600 text-white text-center">
          <h1 className="text-2xl font-bold">🌍 Country Finder</h1>
        </header>
      );
    }
    
    export default Header; // ✅ Make sure this is here
    