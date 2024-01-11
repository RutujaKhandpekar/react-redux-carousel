export const LOAD_ITEMS = "LOAD_ITEMS";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const SELECT_ITEM = "SELECT_ITEM";
export const RESET_PAGE = "RESET_PAGE";
export const CHANGE_TRANSFORM = "CHANGE_TRANSFORM";

export const loadItems = (items) => ({
  type: LOAD_ITEMS,
  collection: items.collection,
  pagination: items.pagination,
});

export const nextPage = () => ({
  type: NEXT_PAGE,
});

export const previousPage = () => ({
  type: PREVIOUS_PAGE,
});

export const selectItem = (index) => ({
  type: SELECT_ITEM,
  index: index,
});

export const resetPage = (page) => ({
  type: RESET_PAGE,
  page: page,
});

export const changeTransform = (transform, direction) => ({
  type: CHANGE_TRANSFORM,
  transform: transform,
  direction: direction,
});
