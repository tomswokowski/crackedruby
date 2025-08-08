# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_08_08_222128) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "plpgsql"

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.string "slug"
    t.boolean "published", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "featured", default: false, null: false
    t.string "post_type", null: false
    t.text "description"
    t.string "category"
    t.string "subcategory"
    t.string "section_number"
    t.index ["category", "subcategory"], name: "index_posts_on_category_and_subcategory"
    t.index ["post_type", "category"], name: "index_posts_on_post_type_and_category"
    t.index ["post_type"], name: "index_posts_on_post_type"
    t.index ["published"], name: "index_posts_on_published"
    t.index ["slug"], name: "index_posts_on_slug", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.citext "email", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "remember_created_at"
    t.string "remember_token"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["remember_token"], name: "index_users_on_remember_token", unique: true
  end
end
