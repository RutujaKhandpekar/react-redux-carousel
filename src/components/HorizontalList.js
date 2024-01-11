import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadItems,
  nextPage,
  previousPage,
  selectItem,
  resetPage,
  changeTransform,
} from "../redux/actions";

const ITEMS_PER_PAGE = 4; // Number of items to fetch per page

const HorizontalList = () => {
  const dispatch = useDispatch();

  const {
    items,
    pagination,
    currentPage,
    selectedItem,
    isTransforming,
    changeTransformToRight,
  } = useSelector((state) => state);

  const fetchItems = useCallback(
    async (page) => {
      try {
        const response = await fetch(
          `https://acc01.titanos.tv/v1/genres/14/contents?market=es&device=tv&locale=es&page=${page}&per_page=${ITEMS_PER_PAGE}`
        );
        const data = await response.json();
        dispatch(loadItems(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // Fetch initial items
    fetchItems(currentPage);
  }, [fetchItems, currentPage]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      dispatch(selectItem((selectedItem - 1 + items.length) % items.length));
      let currentItemIndex = ITEMS_PER_PAGE * currentPage - ITEMS_PER_PAGE;
      if (selectedItem === currentItemIndex) {
        dispatch(changeTransform(true, "left"));
      }
      if (selectedItem === 0) {
        dispatch(previousPage());
        dispatch(changeTransform(false));
        currentItemIndex = ITEMS_PER_PAGE * currentPage - ITEMS_PER_PAGE;
        dispatch(selectItem(currentItemIndex + 1));
      }
    } else if (e.key === "ArrowRight") {
      dispatch(selectItem((selectedItem + 1 + items.length) % items.length));
      if (
        selectedItem === items.length - 1 &&
        currentPage < Math.ceil(pagination.total_count / ITEMS_PER_PAGE)
      ) {
        dispatch(nextPage());
        dispatch(selectItem(selectedItem + 1));
        dispatch(changeTransform(true, "right"));
      } else if (selectedItem === pagination.total_count - 1) {
        dispatch(resetPage(1));
        dispatch(changeTransform(false));
      }
    }
  };

  return (
    // transform is adjusted based on the image count fetched. This can be calculated seperately.
    <div
      tabIndex="0"
      onKeyDown={handleKeyDown}
      className="list"
      style={{
        transform: isTransforming
          ? changeTransformToRight
            ? `translateX(-630px)`
            : `translateX(630px)`
          : "unset",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`list-item ${index === selectedItem ? "selected" : ""}`}
          onClick={() => dispatch(selectItem(index))}
        >
          <img src={item.images.artwork_portrait} alt={`Item ${item.id}`} />
          <div className="image-title">{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalList;
