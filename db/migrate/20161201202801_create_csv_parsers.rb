class CreateCsvParsers < ActiveRecord::Migration[5.0]
  def change
    create_table :csv_parsers do |t|

      t.timestamps
    end
  end
end
