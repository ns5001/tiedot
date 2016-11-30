class CreateCommentGraph < ActiveRecord::Migration[5.0]
  def change
    create_table :comment_graphs do |t|
      t.integer :comment_id
      t.integer :graph_id
    end
  end
end
