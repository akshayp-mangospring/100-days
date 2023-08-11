class AddUserIdToTodos < ActiveRecord::Migration[7.0]
  def change
    add_column :todos, :user_id, :bigint
    add_foreign_key(:todos, :users)
  end
end
