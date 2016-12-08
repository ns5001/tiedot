class MessagesController < ApplicationController
  def index
    @messages = current_user.messages
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @messages.to_json}
    end
  end

  def create
    binding.pry
  end

  def show
    @message = Message.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @message}
    end
  end

  def destroy
    @message = Message.find_by(id: JSON.parse(params[:data])[0]["value"])
    Message.all.destroy(@message)
    @message = ['deleted']
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
