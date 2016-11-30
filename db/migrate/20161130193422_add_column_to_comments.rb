class AddColumnToComments < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :graph_id, :integer
  end
end
