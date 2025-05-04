export const isItemFavorite = (favoritos, item, type) => {
    return favoritos?.some(fav => 
      fav.uid === item.uid && 
      fav.type === type
    );
  };