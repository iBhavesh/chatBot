import React from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { useAppDispatch } from "../redux/hooks";
import { deleteCategory } from "../redux/categoriesSlice";

type Props = {
  name: string;
  id: string;
};

function CategoryItem({ name, id }: Props) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="CategoryItem mb-4 flex w-4/5 cursor-pointer items-center justify-between rounded-lg py-4 px-2 text-xl shadow-md transition-all hover:scale-[1.01] ">
      {name}
      <TrashIcon
        onClick={handleDelete}
        className="TrashIcon tranistion-all invisible h-9 w-9 stroke-red-500 p-2 duration-200 hover:h-10 hover:w-10 hover:rounded-full active:bg-red-300"
      />
    </div>
  );
}

export default CategoryItem;
