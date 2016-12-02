class GraphsController < ApplicationController
  require 'csv'

  def upload
    @csv_file = params[:file].path
    @graph = current_user.graphs.build
    csv_parser = CsvParser.new
    csv_parser.format_data(@csv_file, @graph, current_user)

    redirect_to user_path(current_user)
  end

  def new
  end

  def create

  end

  def show
    @graph = Graph.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @graph}
    end
  end

  def update
  end

  def index
    @graphs = current_user.graphs
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @graphs}
    end
  end



end








# def upload
#   x_coordinates = CSV.open(params[:file].path, 'r') { |csv| csv.first }
#   x_coordinates.shift
#   @graph = current_user.graphs.build
#   @graph.labels = x_coordinates.to_s
#   y_coordinates = []
#     CSV.foreach(params[:file].path, headers:false) do |row|
#      y_coordinates << row
#   end
#   y_coordinates.map do |row|
#     row.shift
#   end
#   y_coordinates.shift
#   arr = []
#   for i in 1..y_coordinates.length
#     arr.push(0)
#   end
#   i = 0
#   y_coordinates.each do |row|
#     row.each do |v|
#       arr[i] += v.to_i
#       if i == y_coordinates.length - 1
#         i = 0
#       else
#         i+=1
#       end
#     end
#   end
#
#   @graph.data = arr.to_s
#   @graph.save
#   redirect_to user_path(current_user)
# end


# def upload
#   csv_file = params[:file].path
#   csv_parser = CsvParser.new
#   csv_parser.parse_lables(csv_file)
#   @graph = current_user.graphs.build
#   @graph.labels = csv_parser.x_coordinates
#
#   csv_parser.parse_data_points(csv_file)
#   csv_parser.remove_extra_column
#
#   csv_parser.load_temp_array
#
#   csv_parser.aggreate_array
#
#   @graph.data = csv_parser.temp_arry.to_s
#   @graph.save
#   redirect_to user_path(current_user)
# end
