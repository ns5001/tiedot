class GraphsController < ApplicationController
  before_action :authenticate_user!
  # before_action :validate_current_user_graphs
  require 'csv'

  def upload
    @csv_file = params[:file].path
    @graph = current_user.graphs.build
    @graph.title = params[:title]
    @graph.description = params[:description]
    @graph.data_label = params[:data_label]
    csv_parser = CsvParser.new
    csv_parser.format_data(@csv_file, @graph, current_user)
    redirect_to user_path(current_user)
  end

  def send_mail

    graph = params[:chart]
    email = params[:recipient]
    message = params[:message]

    @email = Emailer.new
    @email.open_file(current_user.name,email,graph)
    @email.send_email(message)
    
    render :json => {"message": "success"}
  end

  def new
  end

  def create

  end

  def show
    @graph = current_user.graphs.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @graph}

    end
  end

  def edit
    @graph = Graph.find(params[:id])
    respond_to do |format|
      format.html {render :edit}
    end
  end

  def update
    arr = []
    @graph = current_user.graphs.find(params[:id])
    params["graphData"].values.first.values[1]
    updated_data = params["graphData"].values
    updated_data.each do |value|
      arr << value.values[1]
    end
    @graph.data = arr.to_s
    @graph.save
    respond_to do |format|
      format.json {render json: @graph}
    end
  end


  def index
    validate_current_user
    @graphs = current_user.graphs
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @graphs}
    end
  end

end
