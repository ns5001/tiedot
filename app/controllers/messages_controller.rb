class MessagesController < ApplicationController
  def index
    if params[:inbox]
      @messages = Message.where(receiver: current_user.id)
    elsif params[:outbox]
      @messages = Message.where(user_id: current_user.id)
    else
      @messages = Message.all
    end
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @messages}
    end
  end
end
