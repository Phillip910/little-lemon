import React from 'react';
import { menu } from './menu';
import './MenuPage.css'; // Assuming you have some CSS for styling

function MenuPage() {
    return (
        <div>
            <h1>Restaurant Menu</h1>
            {Object.keys(menu).map((category) => (
                <div key={category}>
                    <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                    {menu[category].length > 0 ? (
                        <ul>
                            {menu[category].map((item, index) => (
                                <li key={index}>
                                    {item.name} - ${item.price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No items available.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default MenuPage;
