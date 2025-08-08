class AddOrganizationToPosts < ActiveRecord::Migration[7.2]
  def change
    add_column :posts, :category, :string
    add_column :posts, :subcategory, :string
    add_column :posts, :section_number, :string

    add_index :posts, [ :post_type, :category ]
    add_index :posts, [ :category, :subcategory ]
  end
end
