class RemoveCategorySubcategoryIndexFromPosts < ActiveRecord::Migration[7.2]
  def change
    remove_index :posts, [ :category, :subcategory ]
  end
end
