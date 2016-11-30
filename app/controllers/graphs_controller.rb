class GraphsController < ApplicationController
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
    @graphs = Graph.all
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @graphs}
    end
  end

end
