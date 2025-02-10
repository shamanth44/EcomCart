import React from 'react'

function Products() {
  return (
    <div className='mt-10 px-20'>
       <div className="max-w-xs bg-white border rounded-2xl p-4">
      <img
        src=""
        alt=""
        className="w-full h-40 object-cover rounded-xl"
      />
      <div className="mt-3">
        <h3 className="text-lg font-semibold">Shoe</h3>
        <p className="text-gray-500">$500</p>
      </div>
      <button
        className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-500 transition"
      >
        Add to Cart
      </button>
    </div>

    </div>
  )
}

export default Products
