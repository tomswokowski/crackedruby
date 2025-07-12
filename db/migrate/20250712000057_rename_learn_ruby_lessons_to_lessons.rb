class RenameLearnRubyLessonsToLessons < ActiveRecord::Migration[7.2]
  def change
    rename_table :learn_ruby_lessons, :lessons
  end
end
