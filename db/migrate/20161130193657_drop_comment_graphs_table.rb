class DropCommentGraphsTable < ActiveRecord::Migration[5.0]
  def up
     drop_table :comment_graphs
   end

   def down
     raise ActiveRecord::IrreversibleMigration
   end
end
