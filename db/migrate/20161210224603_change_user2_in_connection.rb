class ChangeUser2InConnection < ActiveRecord::Migration[5.0]
  def change
    rename_column :connections, :user2_id, :receiver_id
  end
end
