import {
  LOAD_ITEMS,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  SELECT_ITEM,
  RESET_PAGE,
  CHANGE_TRANSFORM,
} from "./actions";

const initialState = {
  items: [],
  currentPage: 1,
  pagination: {},
  selectedItem: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS:
      return {
        ...state,
        items: [...state.items, ...action.collection],
        pagination: action.pagination,
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.lastPage,
      };
    case SELECT_ITEM:
      return { ...state, selectedItem: action.index };
    case RESET_PAGE:
      return {
        ...state,
        currentPage: action.page,
        items: [],
        lastPage: state.currentPage,
      };
    case CHANGE_TRANSFORM:
      return {
        ...state,
        isTransforming: action.transform,
        changeTransformToRight: action.direction === "right",
      };
    default:
      return state;
  }
};

export default rootReducer;
