import React from 'react'

import './main.css'
function Main () {
  return (
    <div>
      <h1>Little Lemon</h1>
      <p>Little Lemon is a family-owned Mediterranean restaurant that combines traditional recipes with a modern twist. Their menu is inspired by the rich culinary heritage of the Mediterranean region, offering dishes made with the freshest ingredients for a healthy and delicious dining experience</p>
      <div className="specials">
      <h2>Specials</h2>
      <img src="/greek-salad-1.jpg" alt="greek salad" />
      <p>Greek Salad</p>
      <img src="/bruschetta.jpg" alt="bruschetta" />
      <p>Bruschetta</p>
      <img src="/lemon dessert.jpg" alt="lemon dessert" />
      <p>Lemon Dessert</p>
      </div>
    </div>
  )
}
export default Main;