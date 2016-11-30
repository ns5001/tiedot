class CreateUserContact < ActiveRecord::Migration[5.0]
  def change
    create_table :user_contacts do |t|
      t.integer :user_id
      t.integer :contact_id
    end
  end
end
