class AddFeaturedToLessons < ActiveRecord::Migration[7.2]
  def change
    add_column :lessons,  :featured, :boolean, default: false, null: false
  end
end
