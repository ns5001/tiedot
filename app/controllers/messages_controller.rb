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

  def create
    # binding.pry
  end

  def show
    @message = Message.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message}
    end
  end

  private

  def message_params
    params.require(:message).permit(:receiver, :content, :message_type, :accept, :master_message_id, :connection_id, :user_id)
  end

end
