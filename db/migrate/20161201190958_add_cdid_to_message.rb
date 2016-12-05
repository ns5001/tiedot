class AddCdidToMessage < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :connection_id, :integer
  end
end
