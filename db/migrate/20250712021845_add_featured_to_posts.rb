class AddFeaturedToPosts < ActiveRecord::Migration[7.2]
  def change
    add_column :posts,    :featured, :boolean, default: false, null: false
  end
end
