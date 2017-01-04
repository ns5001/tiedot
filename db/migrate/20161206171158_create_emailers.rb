class CreateEmailers < ActiveRecord::Migration[5.0]
  def change
    create_table :emailers do |t|

      t.timestamps
    end
  end
end
