import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import { Category } from "../../../interfaces";
import { selectLoggedInUser } from "../../user/userSlice";
import { deleteCategory } from "../categoriesSlice";
import "./CategoryLinks.scss";

interface CategoryLinksProps {
  categories: Category[];
  activeCategory?: Category;
}

const CategoryLinks: React.FC<CategoryLinksProps> = ({
  activeCategory,
  categories,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectLoggedInUser);
  return (
    <div className="category__links">
      {currentUser && (
        <div className="category__link">
          <Link to={`/projects/category/new`}>
            <i className="fas fa-plus"></i>
            <br />
            Dodaj kategorię
          </Link>
        </div>
      )}
      {categories.map((category) => (
        <div className="category__link">
          <Link
            to={`/projects/category/${category.link}`}
            style={{ color: `${category.color}` }}
            className={(activeCategory?.title === category.title && 'active') as string }
          >
            <i className={category.icon}></i>
            <br />
            {category.title}
          </Link>
        </div>
      ))}
      {currentUser && activeCategory && (
        <>
          <div className="category__link">
            <Link to={`/projects/category/${activeCategory._id}/edit`}>
              <i className="fas fa-pen"></i>
              <br />
              Edytuj kategorię
            </Link>
          </div>
          <div className="category__link">
            <Link
              to={`/projects`}
              onClick={() => dispatch(deleteCategory(activeCategory._id))}
            >
              <i className="fas fa-times"></i>
              <br />
              Usuń kategorię
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryLinks;
