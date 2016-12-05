class AddColumnsToMessage < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :type, :string
    add_column :messages, :accept, :boolean, default: false
  end
end
