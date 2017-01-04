class CsvParser < ApplicationRecord
  attr_accessor :x_coordinates, :y_coordinates, :final_array

 def format_data(file_name, graph_object, user)
   self.parse_lables(file_name)
   graph_object = user.graphs.build
   graph_object.labels = self.x_coordinates

   self.parse_data_points(file_name)
   self.remove_extra_column
   self.load_temp_array
   self.aggreate_array

   graph_object.data = self.final_array.to_s
   graph_object.save
 end

 def parse_lables(file_name)
   self.x_coordinates = CSV.open(file_name, 'r') { |csv| csv.first }
   self.x_coordinates.shift
   self.x_coordinates = self.x_coordinates.to_s
 end

 def parse_data_points(file_name)
   some_arry = []
     CSV.foreach(file_name, headers:false) do |row|
      some_arry.push(row)
   end
   self.y_coordinates = some_arry
 end

 def remove_extra_column
   self.y_coordinates.map do |row|
     row.shift
   end
   self.y_coordinates.shift
 end

 def load_temp_array
   another_array = []
   for i in 1.. self.y_coordinates.length
     another_array.push(0)
   end
   self.final_array = another_array
 end

 def aggreate_array
   self.y_coordinates.each_with_index do |line|
     line.each_with_index do |row,index|
       self.final_array[index] += row.to_i
     end
  end
 end

 def update_data(graph_object,updated_data)
   arr = []
   updated_data.each do |value|
     arr << value.values[1]
   end
   graph_object.data = arr.to_s
   graph_object.save
 end
end
