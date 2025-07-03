import Item from "./Item";
import styles from "./itemList.module.css"; // Create this new CSS module

export default function ItemList({ food, isLoading }) {
  return (
    <div className={styles.itemListContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        food.extendedIngredients.map((item) => (
          <Item key={item.id} item={item} />
        ))
      )}
    </div>
  );
}
