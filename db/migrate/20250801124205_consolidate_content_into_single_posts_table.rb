class ConsolidateContentIntoSinglePostsTable < ActiveRecord::Migration[7.2]
  def up
    # Add post_type column to posts table
    add_column :posts, :post_type, :string
    add_index :posts, :post_type
    add_index :posts, :published

    # Set existing posts to have post_type 'blog'
    Post.update_all(post_type: 'blog')

    # Copy articles to posts table
    execute <<-SQL
      INSERT INTO posts (title, body, slug, published, featured, created_at, updated_at, post_type)
      SELECT title, body, slug, published, featured, created_at, updated_at, 'article'
      FROM articles;
    SQL

    # Copy lessons to posts table
    execute <<-SQL
      INSERT INTO posts (title, body, slug, published, featured, created_at, updated_at, post_type)
      SELECT title, body, slug, published, featured, created_at, updated_at, 'lesson'
      FROM lessons;
    SQL

    # Make post_type column required
    change_column_null :posts, :post_type, false

    # Make published default to false for consistency
    change_column_default :posts, :published, false

    # Drop the old tables
    drop_table :articles
    drop_table :lessons
  end

  def down
    # Recreate articles table
    create_table "articles", force: :cascade do |t|
      t.string "title"
      t.text "body"
      t.string "slug"
      t.boolean "published"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.boolean "featured", default: false, null: false
    end
    add_index :articles, :slug, unique: true

    # Recreate lessons table
    create_table "lessons", force: :cascade do |t|
      t.string "title"
      t.text "body"
      t.string "slug"
      t.boolean "published"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.boolean "featured", default: false, null: false
    end
    add_index :lessons, :slug, unique: true

    # Move data back to separate tables
    execute <<-SQL
      INSERT INTO articles (title, body, slug, published, featured, created_at, updated_at)
      SELECT title, body, slug, published, featured, created_at, updated_at
      FROM posts WHERE post_type = 'article';
    SQL

    execute <<-SQL
      INSERT INTO lessons (title, body, slug, published, featured, created_at, updated_at)
      SELECT title, body, slug, published, featured, created_at, updated_at
      FROM posts WHERE post_type = 'lesson';
    SQL

    # Remove articles and lessons from posts table, keep only post_type = 'blog'
    Post.where.not(post_type: 'blog').delete_all

    # Remove post_type column
    remove_index :posts, :post_type
    remove_index :posts, :published
    remove_column :posts, :post_type
  end
end
