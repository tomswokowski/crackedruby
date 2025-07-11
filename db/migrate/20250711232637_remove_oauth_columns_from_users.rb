class RemoveOauthColumnsFromUsers < ActiveRecord::Migration[7.2]
  def change
    # 1) remove the old omniauth indexes
    remove_index :users, name: "index_users_on_provider_and_uid"
    remove_index :users, column: :uid

    # 2) drop the columns themselves
    remove_column :users, :provider, :string
    remove_column :users, :uid,      :string

    # 3) enable citext (for case-insensitive e-mails) and convert the column
    enable_extension "citext" unless extension_enabled?("citext")
    change_column :users, :email, :citext, default: "", null: false

    # 4) rebuild unique index on email (now case-insensitive)
    remove_index :users, name: "index_users_on_email"
    add_index    :users, :email, unique: true
  end
end
