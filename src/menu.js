const menu = {
    appetizers: [],
    mainCourses: [],
    desserts: [],
    beverages: []
};

// Function to add a menu item
function addMenuItem(category, item) {
    if (menu[category]) {
        menu[category].push(item);
    } else {
        console.error(`Category "${category}" does not exist.`);
    }
}

// Function to display the menu
function displayMenu() {
    console.log("Restaurant Menu:");
    for (const category in menu) {
        console.log(`\n${category.charAt(0).toUpperCase() + category.slice(1)}:`);
        if (menu[category].length > 0) {
            menu[category].forEach((item, index) => {
                console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`);
            });
        } else {
            console.log("No items available.");
        }
    }
}

// Adding new menu items
addMenuItem("appetizers", { name: "Hummus Platter", price: 6.99 });
addMenuItem("appetizers", { name: "Dolmas", price: 5.49 });
addMenuItem("appetizers", { name: "Falafel", price: 4.99 });
addMenuItem("appetizers", { name: "Bruschetta", price: 7.49 });

addMenuItem("mainCourses", { name: "Lamb Gyro", price: 12.99 });
addMenuItem("mainCourses", { name: "Chicken Shawarma", price: 11.99 });
addMenuItem("mainCourses", { name: "Vegetarian Moussaka", price: 10.99 });

addMenuItem("desserts", { name: "Baklava", price: 5.99 });
addMenuItem("desserts", { name: "Rice Pudding", price: 4.49 });
addMenuItem("desserts", { name: "Lemon Cake", price: 6.49 });

addMenuItem("beverages", { name: "Mint Tea", price: 2.99 });
addMenuItem("beverages", { name: "Pomegranate Juice", price: 3.99 });

// Display the menu
displayMenu()

export { menu, addMenuItem, displayMenu };