class CommentsController < ApplicationController
  def new
  end

  def create

  end

  def show
    @comment = Comment.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @comment}
    end
  end

  def update
  end

  def index
    @comments = Comment.all
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @comments}
    end
  end

end
