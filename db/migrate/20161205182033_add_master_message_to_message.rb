class AddMasterMessageToMessage < ActiveRecord::Migration[5.0]
  def change
    remove_column :messages, :reply
    add_column :messages, :master_message_id, :integer
  end
end
