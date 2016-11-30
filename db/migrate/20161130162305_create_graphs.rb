class CreateGraphs < ActiveRecord::Migration[5.0]
  def change
    create_table :graphs do |t|
      t.integer :user_id
      t.string :labels
      t.string :label
      t.string :data
      t.string :data_label
      t.string :color
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
