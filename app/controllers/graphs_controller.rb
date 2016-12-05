class GraphsController < ApplicationController
  require 'csv'

  def upload
    x_coordinates = CSV.open(params[:file].path, 'r') { |csv| csv.first }
    x_coordinates.shift
    @graph = Graph.new
    @graph.labels = x_coordinates.to_s
    y_coordinates = []
      CSV.foreach(params[:file].path, headers:false) do |row|
       y_coordinates << row
    end
    y_coordinates.map do |row|
      row.shift
    end
    arr = []
    for i in 1..y_coordinates.length
      arr.push(0)
    end
    i = 0
    y_coordinates.each do |row|
      row.each do |v|
        arr[i] += v.to_i
        if i == y_coordinates.length - 1
          i = 0
        else
          i+=1
        end
      end
    end
    binding.pry
    @graph.data = arr.to_s
    @graph.save
    redirect_to songs_path
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
    if params[:user_id]
      @graphs = Graph.find(params[:user_id])
    elsif params[:request]
      @graphs = Graph.where(user_id: current_user.id)
    else
      @graphs = Graph.all
    end
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @graphs}
    end
  end



end
