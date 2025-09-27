// pages/test.tsx
export default function Test() {
  return (
    <div className="p-8">
      <div className="bg-red-500 text-white p-4 text-xl font-bold rounded-lg mb-4">
        Red Box - Should have red background
      </div>
      <div className="bg-blue-500 text-white p-4 text-xl font-bold rounded-lg mb-4">
        Blue Box - Should have blue background  
      </div>
      <div className="bg-green-500 text-white p-4 text-xl font-bold rounded-lg">
        Green Box - Should have green background
      </div>
    </div>
  );
}