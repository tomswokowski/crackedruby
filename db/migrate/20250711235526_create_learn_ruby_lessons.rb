class CreateLearnRubyLessons < ActiveRecord::Migration[7.2]
  def change
    create_table :learn_ruby_lessons do |t|
      t.string :title
      t.text :body
      t.string :slug
      t.boolean :published

      t.timestamps
    end
    add_index :learn_ruby_lessons, :slug, unique: true
  end
end
