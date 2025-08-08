class AddAiGeneratedToPosts < ActiveRecord::Migration[7.2]
  def change
    add_column :posts, :ai_generated, :boolean, default: false, null: false
  end
end
