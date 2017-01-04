class AddReceiverToMessage < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :receiver, :integer
  end
end
