class CreateConnection < ActiveRecord::Migration[5.0]
  def change
    create_table :connections do |t|
      t.integer :user1_id
      t.integer :user2_id
      t.boolean :status, default: false
    end
  end
end
