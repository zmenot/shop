export const categoryActionsTypes = {
  SET_CATEGORIES: 'CATEGORY.SET_CATEGORIES',
  SET_NAME_CATEGORY: 'CATEGORY.SET_NAME_CATEGORY',
  DELETE_CATEGORY: 'CATEGORY.DELETE_CATEGORY',
  ADD_CATEGORY: 'CATEGORY.ADD_CATEGORY',
};

const createCategory = (fields) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/category/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
        // files : 
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }

      dispatch(categoryActions.addCategory(data.category));
    } catch (e) {
      console.log(e);
    }
  };
};
const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/category/getAll', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }

      dispatch(categoryActions.setCategories(data.categories));
    } catch (e) {
      console.log(e);
    }
  };
};

const updateCategory = (fields) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/category/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }

      dispatch(categoryActions.setNameCategory(fields));
    } catch (e) {
      console.log(e);
    }
  };
};

const deleteOneCategory = (fields) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/category/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(fields),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        return;
      }

      dispatch(categoryActions.deleteCategory(fields));
    } catch (e) {
      console.log(e);
    }
  };
};

export const categoryActions = {
  setCategories: (payload) => ({ type: categoryActionsTypes.SET_CATEGORIES, payload }),
  setNameCategory: (payload) => ({ type: categoryActionsTypes.SET_NAME_CATEGORY, payload }),
  deleteCategory: (payload) => ({ type: categoryActionsTypes.DELETE_CATEGORY, payload }),
  addCategory: (payload) => ({ type: categoryActionsTypes.ADD_CATEGORY, payload }),
  getAllCategories,
  updateCategory,
  deleteOneCategory,
  createCategory,
};
