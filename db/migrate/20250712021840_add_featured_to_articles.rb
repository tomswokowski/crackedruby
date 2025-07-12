class AddFeaturedToArticles < ActiveRecord::Migration[7.2]
  def change
    add_column :articles, :featured, :boolean, default: false, null: false
  end
end
