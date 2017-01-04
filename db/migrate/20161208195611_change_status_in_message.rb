class ChangeStatusInMessage < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages, :accept, :reply
  end
end
